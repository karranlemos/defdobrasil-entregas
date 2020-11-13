const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.post('/api/entrega', (req, res) => {
    // Cadastra a entrega
    res.status(201).send();
});

app.get('/api/entregas', (req, res) => {
    res.status(200).json([
        {
            nomeCliente: 'João da Silva',
            dataEntrega: '01/01/2020',
            pontoDePartida: '312131231312',
            pontoDeChegada: '312131231312'
        },
        {
            nomeCliente: 'Mário da Silva',
            dataEntrega: '01/10/2020',
            pontoDePartida: '5112515231312',
            pontoDeChegada: '5112515231312'
        },
        {
            nomeCliente: 'Dom Pedro II',
            dataEntrega: '01/09/2020',
            pontoDePartida: '123213231312',
            pontoDeChegada: '121111231312'
        }
    ]);
});

app.use(express.static('./client/build'));
app.get('*', (req, res) => {
    return res.sendFile(__dirname+'/client/build/index.html');
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));