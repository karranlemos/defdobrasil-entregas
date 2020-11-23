const express = require('express');
const path = require('path');
const helpers = require('./helpers');

const entregas = require('../model/Entregas').getInstance();


const router = express.Router();



router.post(
    '/api/entrega',
    helpers.checaCamposEntrega,
    (req, res) => {
        // Cadastra a entrega
        res.status(201).send();
    }
);

router.get(
    '/api/entregas',
    helpers.checaPaginacaoNumeros,
    (req, res) => {
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);

        const linhas = [
            {
                nomeCliente: 'João da Silva',
                dataEntrega: '2020-01-01',
                enderecoPartida: '312131231312',
                enderecoChegada: '312131231312'
            },
            {
                nomeCliente: 'Mário da Silva',
                dataEntrega: '2020-01-10',
                enderecoPartida: '5112515231312',
                enderecoChegada: '5112515231312'
            },
            {
                nomeCliente: 'Dom Pedro II',
                dataEntrega: '2020-01-09',
                enderecoPartida: '123213231312',
                enderecoChegada: '121111231312'
            },
            {
                nomeCliente: 'João da Silva',
                dataEntrega: '2020-01-01',
                enderecoPartida: '312131231312',
                enderecoChegada: '312131231312'
            },
            {
                nomeCliente: 'Mário da Silva',
                dataEntrega: '2020-01-10',
                enderecoPartida: '5112515231312',
                enderecoChegada: '5112515231312'
            },
            {
                nomeCliente: 'Dom Pedro II',
                dataEntrega: '2020-01-09',
                enderecoPartida: '123213231312',
                enderecoChegada: '121111231312'
            },
            {
                nomeCliente: 'João da Silva',
                dataEntrega: '2020-01-01',
                enderecoPartida: '312131231312',
                enderecoChegada: '312131231312'
            },
            {
                nomeCliente: 'Mário da Silva',
                dataEntrega: '2020-01-10',
                enderecoPartida: '5112515231312',
                enderecoChegada: '5112515231312'
            },
            {
                nomeCliente: 'Dom Pedro II',
                dataEntrega: '2020-01-09',
                enderecoPartida: '123213231312',
                enderecoChegada: '121111231312'
            },
            {
                nomeCliente: 'João da Silva',
                dataEntrega: '2020-01-01',
                enderecoPartida: '312131231312',
                enderecoChegada: '312131231312'
            },
            {
                nomeCliente: 'Mário da Silva',
                dataEntrega: '2020-01-10',
                enderecoPartida: '5112515231312',
                enderecoChegada: '5112515231312'
            },
            {
                nomeCliente: 'Dom Pedro II',
                dataEntrega: '2020-01-09',
                enderecoPartida: '123213231312',
                enderecoChegada: '121111231312'
            },
            {
                nomeCliente: 'João da Silva',
                dataEntrega: '2020-01-01',
                enderecoPartida: '312131231312',
                enderecoChegada: '312131231312'
            },
            {
                nomeCliente: 'Mário da Silva',
                dataEntrega: '2020-01-10',
                enderecoPartida: '5112515231312',
                enderecoChegada: '5112515231312'
            },
            {
                nomeCliente: 'Dom Pedro II',
                dataEntrega: '2020-01-09',
                enderecoPartida: '123213231312',
                enderecoChegada: '121111231312'
            },
            {
                nomeCliente: 'João da Silva',
                dataEntrega: '2020-01-01',
                enderecoPartida: '312131231312',
                enderecoChegada: '312131231312'
            },
            {
                nomeCliente: 'Mário da Silva',
                dataEntrega: '2020-01-10',
                enderecoPartida: '5112515231312',
                enderecoChegada: '5112515231312'
            },
            {
                nomeCliente: 'Dom Pedro II',
                dataEntrega: '2020-01-09',
                enderecoPartida: '123213231312',
                enderecoChegada: '121111231312'
            },
            {
                nomeCliente: 'João da Silva',
                dataEntrega: '2020-01-01',
                enderecoPartida: '312131231312',
                enderecoChegada: '312131231312'
            },
            {
                nomeCliente: 'Mário da Silva',
                dataEntrega: '2020-01-10',
                enderecoPartida: '5112515231312',
                enderecoChegada: '5112515231312'
            },
            {
                nomeCliente: 'Dom Pedro II',
                dataEntrega: '2020-01-09',
                enderecoPartida: '123213231312',
                enderecoChegada: '121111231312'
            },
            {
                nomeCliente: 'João da Silva',
                dataEntrega: '2020-01-01',
                enderecoPartida: '312131231312',
                enderecoChegada: '312131231312'
            },
            {
                nomeCliente: 'Mário da Silva',
                dataEntrega: '2020-01-10',
                enderecoPartida: '5112515231312',
                enderecoChegada: '5112515231312'
            },
            {
                nomeCliente: 'Dom Pedro II',
                dataEntrega: '2020-01-09',
                enderecoPartida: '123213231312',
                enderecoChegada: '121111231312'
            },
            {
                nomeCliente: 'João da Silva',
                dataEntrega: '2020-01-01',
                enderecoPartida: '312131231312',
                enderecoChegada: '312131231312'
            },
            {
                nomeCliente: 'Mário da Silva',
                dataEntrega: '2020-01-10',
                enderecoPartida: '5112515231312',
                enderecoChegada: '5112515231312'
            },
            {
                nomeCliente: 'Dom Pedro II',
                dataEntrega: '2020-01-09',
                enderecoPartida: '123213231312',
                enderecoChegada: '121111231312'
            },
            {
                nomeCliente: 'João da Silva',
                dataEntrega: '2020-01-01',
                enderecoPartida: '312131231312',
                enderecoChegada: '312131231312'
            },
        ];


        const totalEntries = linhas.length;
        const totalPages = Math.ceil(totalEntries/limit);

        if (page > totalPages)
            return res.status(404).json({
                status: 404,
                errorMessage: `Desired page ${page} greater than the number of pages ${totalPages}...`
            });

        const linhasEnviadas = linhas.slice((page-1) * limit, page*limit);


        return res.status(200).json({
            currentPage: page,
            totalEntries: totalEntries,
            totalPages: totalPages,
            lines: linhasEnviadas
        });
    }
);



const buildPath = path.join(__dirname, '..', 'client', 'build').replace(/\\/g, '/');

router.use(express.static(buildPath));
router.use('*', (req, res) => {
    return res.sendFile(path.join(buildPath, 'index.html'));
});



module.exports = router;