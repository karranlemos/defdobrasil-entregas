const Database = require('./database');

const table = 'entregas';

var usersSingleton;

class Entregas {

    /**
     * Tabela:
     * 
     * nome_cliente: varchar(128)
     * data_entrega: date
     * endereco_partida: varchar(256)
     * endereco_chegada: varchar(256)
     */
    
    constructor() {
        // throws async exception
        this.db = Database.getInstance();
    }

    getEntregas(limit, offset) {
        return new Promise((resolve, reject) => {
            const sql =
                `SELECT nome_cliente, data_entrega, endereco_partida, endereco_chegada FROM ?? `+
                `LIMIT ? OFFSET ? ORDER BY id`
            ;
            const params = [table, limit, offset];

            this.db.query(
                sql,
                params,
                (err, rows) => {
                    if (err) 
                        return reject(err);
                    return resolve(rows);
                }
            );
        });
    }

    addEntrega(nomeCliente, dataEntrega, enderecoPartida, enderecoChegada) {
        return new Promise((resolve, reject) => {
            const sql =
                `INSERT INTO ?? (nome_cliente, data_entrega, endereco_partida, endereco_chegada) `+
                `VALUES (?, ?, ?, ?)`
            ;
            const params = [table, nomeCliente, dataEntrega, enderecoPartida, enderecoChegada];

            this.db.query(
                sql,
                params,
                (err, data) => {
                    if (err)
                        return reject(err);
                    return resolve();
                }
            );
        });
    }



    static getInstance() {
        if (!usersSingleton)
            usersSingleton = new Entregas()
        return usersSingleton;
    }
}

module.exports = Entregas;