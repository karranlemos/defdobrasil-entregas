const express = require('express');
const path = require('path');
const helpers = require('./helpers');

const entregas = require('../model/Entregas').getInstance();


const router = express.Router();



router.post(
    '/api/entrega',
    helpers.checaCamposEntrega,
    (req, res) => {
        entregas.addEntrega(
            req.body.nomeCliente, req.body.dataEntrega,
            req.body.enderecoPartida, req.body.enderecoChegada
        ).then(() => {
            res.status(201).send();
        }).catch((err) => {
            res.status(500).json({
                status: 500,
                errorMessage: 'Internal Server Error'
            });
        });
    }
);

router.get(
    '/api/entregas',
    helpers.checaPaginacaoNumeros,
    (req, res) => {
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);

        const offset = (page-1) * limit;

        entregas.getEntregas(limit, offset)
            .then(data => {
                const totalEntries = data.total;
                const totalPages = Math.ceil(totalEntries/limit);

                if (page > totalPages && data.rows.length === 0)
                    return res.status(404).json({
                        status: 404,
                        errorMessage: `Desired page ${page} greater than the number of pages ${totalPages}...`
                    });
                
                const linhasFinais = data.rows.map((linhaEntrega => {
                    return {
                        nomeCliente: linhaEntrega.nome_cliente,
                        dataEntrega: helpers.criaStringData(linhaEntrega.data_entrega),
                        enderecoPartida: linhaEntrega.endereco_partida,
                        enderecoChegada: linhaEntrega.endereco_chegada
                    };
                }));

                return res.status(200).json({
                    currentPage: page,
                    totalEntries: totalEntries,
                    totalPages: totalPages,
                    lines: linhasFinais
                });
            })
            .catch(err => {
                return res.status(500).json({
                    status: 500,
                    errorMessage: 'Could not fetch from database...'
                })
            })
        ;
    }
);



const buildPath = path.join(__dirname, '..', 'client', 'build').replace(/\\/g, '/');

router.use(express.static(buildPath));
router.use('*', (req, res) => {
    return res.sendFile(path.join(buildPath, 'index.html'));
});



module.exports = router;