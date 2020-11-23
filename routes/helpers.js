const moduleHelpers = {
    checaCamposEntrega(req, res, next) {
        for (const campo of ['nomeCliente', 'dataEntrega', 'enderecoPartida', 'enderecoChegada']) {
            if (!req.body[campo])
                return res.status(400).json({
                    status: 400,
                    errorMessage: 'Todos os campos devem ser enviados...'
                });
        }

        if (!internalHelpers.checaFormatoData(req.body.dataEntrega))
            return res.status(400).json({
                status: 400,
                errorMessage: "Parâmetro 'dataEntrega' tem formato ou valor inválido..."
            });

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



const internalHelpers = {
    checaFormatoData(dataString) {
        if (!/^\d\d\d\d\-\d\d-\d\d$/.test(dataString))
            return false;
        
        if (isNaN(Date.parse(dataString)))
            return false;

        return true;
    }
}



module.exports = moduleHelpers;