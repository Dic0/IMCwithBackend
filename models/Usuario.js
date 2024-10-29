const { DataTypes } = require("sequelize");
const db = require("../db/conn");

const Usuario = db.define("Usuario", {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  peso: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  altura: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  sexo: {
    type: DataTypes.ENUM("masculino", "feminino", "outro"),
    allowNull: false,
  },
  idade: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  imc: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

module.exports = Usuario;
