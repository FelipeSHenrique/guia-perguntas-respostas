const express = require("express");
const app = express();

// Estou dizendo para o express usar o EJS como view engine
app.set('view engine', 'ejs');
// Para usar arquivos estaticos dentro do projeto node como javascript para front-end e arquivos css
// tem que usar um metodo chamado static, dentro dele tem que passar o nome da pasta onde esses
// arquivos vão estar.
app.use(express.static('public'))

app.get("/", (req, res) => {
    res.render("index"); 
});

app.get("/perguntar", (req, res) => {
    res.render("perguntar");
});

app.get("/:nome/:lang", (req, res) => {
    var nome = req.params.nome;
    var lang = req.params.lang;
    var exibirMsg = false;
    res.render("index", { // para enviar variaveis para o meu EJS que redenriza o html, eu passo como segundo parametro do meu metodo render um objeto com todas as minhas variaveis
        nome: nome,
        lang: lang,
        empresa: "DevCompany",
        inscritos: 10000,
        msg: exibirMsg,
    }); //o render vai dizer ao meu express que eu quero desenhar algo na tela, então sempre que minha rota for chamada, sera denderizado meu render
});

app.listen(3333, () => {
    console.log("App rodando");
});

// ---------------------------------------------------------------------------------------------