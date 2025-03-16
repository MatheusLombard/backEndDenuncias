const mysql = require('mysql2')

const conexao = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'bdDenuncias'
})

conexao.connect(function(error){
    if (error) {
        throw error;
    }
    console.log('Conectado ao banco de dados')
})

module.exports = conexao