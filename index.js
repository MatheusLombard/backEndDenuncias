const express = require('express')
require('dotenv').config()
const con = require('./conexao')
const tabelaUsuarios = require('./models/users.js')
const tabelaDenuncias = require('./models/denuncias.js')
const cors = require('cors');



const app = express()
const port = process.env.PORT



app.use(express.json())
app.use(cors());


app.post('/loginUsuarios', (req, res) => {
    const nome = req.body.nome;
    const cpf = req.body.cpf;

    const sql = "SELECT * FROM usuarios WHERE nome = ? AND cpf = ?";
    const values = [nome, cpf];

    con.query(sql, values, function(error, result){
        if(error) throw error;

        if(result.length === 0){
            res.status(400).json({message:'Usuario não encontrado'})
            console.log('usuario nao encontrado')
        }else{
            res.status(200).json({message:'Usuario correto', result});
            console.log('Usuario encontrado: ', result)
        }
    })
})

app.post('/listarUsuario', (req, res) => {
    const id = req.body.id;

    const sql = "SELECT * FROM usuarios WHERE id = ?";
    const values = [id];

    con.query(sql, values, function(error, result){
        if(error) throw error;

        if(result.length === 0){
            res.status(400).json({message:'Usuario não encontrado'})
            console.log('usuario nao encontrado')
        }else{
            res.status(200).json({message:'Usuario correto', result});
            console.log('Usuario encontrado: ', result)
        }
    })
})


app.get('/denuncias', (req, res) => {
    const id = req.query.id;
    let sql;
    let values = [];
    if(id){
        console.log("Com Id")
        sql = `
        SELECT 
            denuncias.id AS denuncia_id, 
            usuarios.id AS usuario_id, 
            denuncias.*, 
            usuarios.* 
        FROM denuncias 
        INNER JOIN usuarios ON denuncias.idUsuario = usuarios.id 
        WHERE denuncias.idUsuario = ?
    `;
        values = [id]
    }else{
        console.log("Sem Id")
        sql = `
        SELECT 
            denuncias.id AS denuncia_id, 
            usuarios.id AS usuario_id, 
            denuncias.*, 
            usuarios.* 
        FROM denuncias 
        INNER JOIN usuarios ON denuncias.idUsuario = usuarios.id 
    `;;
    }
    console.log(" o id: ", values)
    con.query(sql, values, function(error, result) { 
        if (error) throw error;

        const parsed = result.map(row => {
    if (row.imagem) {
        // Se a imagem já está no formato "data:image/png;base64,..." — não mexa
        row.imagemBase64 = `data:image/png;base64,${row.imagem.toString('base64')}`;

    }
    return row;
});
        res.json(parsed)
    })
})

app.put('/denuncias', (req, res) => {
    const id = req.query.id;

    const sql = `UPDATE denuncias SET pendente = 'Não' WHERE denuncias.id = ?`;

    const values = [id];

    con.query(sql, values, function(error, result) { 
        if (error) throw error;
        res.json(result)
    })
})

app.post('/denuncias', (req, res) => {
    const idUsuario = req.body.idUsuario;
    const titulo = req.body.titulo;
    const local = req.body.local;
    const descricao = req.body.descricao;
    const imagem = req.body.imagem;
    const pendente = req.body.pendente;

    const sql = `INSERT INTO denuncias (id, idUsuario, titulo, local, descricao, imagem, data_denuncia, pendente) VALUES (NULL, ?, ?, ?, ?, ?, current_timestamp(), ?)`;

    const values = [idUsuario, titulo, local, descricao, imagem, pendente];

    con.query(sql, values, function(error, result) { 
        if (error) throw error;
        res.json(result)
    })
})

app.listen(port, () => {
  console.log(`App de exemplo esta rodando na porta ${port}`)
})