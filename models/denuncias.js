const con = require('../conexao')
const users = require('./users')

const sql = "CREATE TABLE IF NOT EXISTS denuncias(id INT AUTO_INCREMENT PRIMARY KEY NOT NULL, idUsuario INT,titulo VARCHAR(60), local VARCHAR(30),descricao VARCHAR(255),imagem LONGBLOB,data_denuncia DATETIME DEFAULT CURRENT_TIMESTAMP, pendente ENUM('Sim', 'Não') NOT NULL, FOREIGN KEY (idUsuario) REFERENCES usuarios(id) ON DELETE CASCADE)";

con.query(sql, function (err, result) {
if (err) throw err;
console.log("Tabela criada");
});