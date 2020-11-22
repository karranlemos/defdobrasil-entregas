module.exports = {
    checaCamposEntrega(req, res, next) {
        for (const campo of ['nomeCliente', 'dataEntrega', 'enderecoPartida', 'enderecoChegada']) {
            if (!req.body[campo])
                return res.status(400).json({
                    status: 400,
                    errorMessage: 'Todos os campos devem ser enviados...'
                });
        }
        next();
    },

    checaPaginacaoNumeros(req, res, next) {
        var page = parseInt(req.query.page);
        console.log(req.query);
        if (isNaN(page) || page <= 0)
            return res.status(400).json({
                status: 400,
                errorMessage: "Query 'page' deve ser providenciada e ser um número positivo..."
            });

        var limit = parseInt(req.query.limit);
        if (isNaN(limit) || limit <= 0)
            return res.status(400).json({
                status: 400,
                errorMessage: "Query 'limit' deve ser providenciada e ser um número positivo..."
            });
        
        next();
    }
};