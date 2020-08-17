// ARQUIVO DE MODEL

const Sequelize = require("sequelize"); // Importando o Sequelize
const connection = require("./database"); // Importando o banco de dados 

const Pergunta = connection.define('perguntas', { // => Nome da tabela
  titulo: { // => Nome do campo
    type: Sequelize.STRING, // => Qual o tipo do campo
    allowNull: false // => Vai dizer que o campo não pode ser nullo
  },
  descricao: {
    type: Sequelize.TEXT,
    allowNull: false
  }
});

Pergunta.sync({force: false}).then(() => {
  console.log("Tabela criada!");
}); // Vai sincronizar a minha tabela com o banco de dados.

module.exports = Pergunta; // Importando Model