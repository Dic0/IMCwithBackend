//Arquivo de conexão com o BD
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("usuarios", "root", "Dwdieric2004", {
  host: "localhost",
  dialect: "mysql",
  port: 3306,
});

try {
  sequelize.authenticate();
  console.log("Conectamos com sucesso");
} catch (error) {
  console.log("Não foi possível conectar: ", error);
}

module.exports = sequelize;
