CREATE TABLE entregas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome_cliente VARCHAR(128),
    data_entrega DATE,
    endereco_partida VARCHAR(256),
    endereco_chegada VARCHAR(256)
);