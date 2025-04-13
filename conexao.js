const mysql = require('mysql2')

const conexao = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'bdDenuncias',
    typeCast: function (field, next) {
        if (field.type === "BLOB" && field.length) {
            return field.buffer();
        }
        return next();
    }
    
})

conexao.connect(function(error){
    if (error) {
        throw error;
    }
    console.log('Conectado ao banco de dados')
})

module.exports = conexao