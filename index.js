// npm install express express-handlebars mysql2 nodemon sequelize

const express = require("express");
const exphbs = require("express-handlebars");
const app = express();
const conn = require("./db/conn");

// Configuração do Handlebars
const hbs = exphbs.create({
  defaultLayout: "main", // Define o layout padrão (caso tenha um)
  extname: ".handlebars", // Define a extensão dos arquivos de template
});

app.engine("handlebars", hbs.engine); // Usa hbs.engine para configurar o Handlebars
app.set("view engine", "handlebars");

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Rotas
const imcRoutes = require("./routes/imcRoutes");
app.use("/imc", imcRoutes);

// Conexão com o banco de dados e inicialização do servidor
conn
  .sync()
  .then(() => {
    app.listen(3000, () => {
      console.log("Servidor rodando na porta 3000");
    });
  })
  .catch((err) => console.log("Erro ao conectar com o banco de dados:", err));
