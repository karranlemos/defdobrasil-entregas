const express = require('express');
const router = express.Router();



const helpers = {
    checaCamposEntrega(req, res, next) {
        console.log(req.body);
        for (const campo of ['nomeCliente', 'dataEntrega', 'enderecoPartida', 'enderecoChegada']) {
            if (!req.body[campo])
                return res.status(400).json({
                    status: 400,
                    errorMessage: 'Todos os campos devem ser enviados...'
                });
        }

        console.log(req.body.pontoDeChegada);
        next();
    }
};



router.post(
    '/api/entrega',
    helpers.checaCamposEntrega,
    (req, res) => {
        // Cadastra a entrega
        res.status(201).send();
    }
);

router.get('/api/entregas', (req, res) => {
    res.status(200).json([
        {
            nomeCliente: 'João da Silva',
            dataEntrega: '01/01/2020',
            enderecoPartida: '312131231312',
            enderecoChegada: '312131231312'
        },
        {
            nomeCliente: 'Mário da Silva',
            dataEntrega: '01/10/2020',
            enderecoPartida: '5112515231312',
            enderecoChegada: '5112515231312'
        },
        {
            nomeCliente: 'Dom Pedro II',
            dataEntrega: '01/09/2020',
            enderecoPartida: '123213231312',
            enderecoChegada: '121111231312'
        }
    ]);
});



router.use(express.static('./client/build'));
router.use('*', (req, res) => {
    return res.sendFile(__dirname+'/client/build/index.html');
});



module.exports = router;