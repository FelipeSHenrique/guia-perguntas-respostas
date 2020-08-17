const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require('./database/database');
const Pergunta = require('./database/Pergunta');
const Resposta = require('./database/Resposta');

// DATABASE
connection
    .authenticate() // Esse método vai tentar se conectar ao mysql
    .then(() => {
        console.log("Conexão feita com o banco de dados!");
    })
    .catch((msgErro) => {
        console.log(msgErro);
    });

// Estou dizendo para o express usar o EJS como view engine
app.set('view engine', 'ejs');
// Para usar arquivos estaticos dentro do projeto node como javascript para front-end e arquivos css
// tem que usar um metodo chamado static, dentro dele tem que passar o nome da pasta onde esses
// arquivos vão estar.
app.use(express.static('public'));
// Body-Parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//ROTAS
app.get("/", (req, res) => {
    Pergunta.findAll({ raw: true, order: [
        ['id', 'DESC']
    ]}).then(perguntas => {
        res.render("index", {
            perguntas: perguntas
        })
    });
});

app.get("/perguntar", (req, res) => {
    res.render("perguntar");
});

//ROTA QUE PEGA OS DADOS DO FORMULARIO PERGUNTAS
app.post("/salvarpergunta", (req, res) => {
    //Pegando as informações dos campos do formulario e colocando numa várivel
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    Pergunta.create({ // Inserir dados no banco de dados
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect("/"); // Redirecionar para home
    });
});

app.get("/pergunta/:id", (req, res) => {
    var id = req.params.id; // Pega o valor passado na URL
    Pergunta.findOne({ // Me retorna apenas um resultado
        where: {id: id} // Vai filtrar o meu resultado pelo ID
    }).then(pergunta => { // Vai armazenar o resultado da consulta da tabela
        if (pergunta != undefined) { // Se minha pergunta tiver algum resultado então mostra a tela de pergunta, se não redireciona para a página home.

            Resposta.findAll({
                where: {perguntaId: pergunta.id},
                order: [ ['id', 'DESC'] ]
            }).then(respostas => {

                res.render("pergunta", {
                    pergunta: pergunta, // vai enviar o resultado da consulta na tabela para a minha página html
                    respostas: respostas
                });

            });

        } else {
            res.redirect("/");
        }
    });
});

app.post("/responder", (req, res) => {
    var corpo = req.body.corpo;
    var perguntaId = req.body.pergunta;
    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() => {
        res.redirect("/pergunta/"+perguntaId);
    });
});

app.listen(3333, () => {console.log("App rodando");});

