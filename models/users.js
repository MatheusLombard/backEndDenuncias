const con = require('../conexao')

const sql = "CREATE TABLE IF NOT EXISTS usuarios(id INT AUTO_INCREMENT PRIMARY KEY NOT NULL, nome VARCHAR(60), telefone VARCHAR(14),cpf VARCHAR(14),email VARCHAR(50), endereco VARCHAR(50),bairro VARCHAR(20),numero VARCHAR(4),cidade VARCHAR(20),estado VARCHAR(2), adm ENUM('Sim', 'Não') NOT NULL)";

con.query(sql, function (err, result) {
  if (err) throw err;
  console.log("Tabela criada: ", result);
});

module.exports = con
