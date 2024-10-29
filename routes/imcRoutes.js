const express = require("express");
const router = express.Router();
const IMCController = require("../controllers/IMCController");

// Rotas para gerenciar informações de IMC
router.get("/adicionar", IMCController.criarUsuario); // Exibe o formulário de criação
router.post("/adicionar", IMCController.criarUsuarioPost); // Recebe os dados para criar o usuário
router.post("/remover", IMCController.removeUsuario); // Remove o usuário
router.get("/editar/:id", IMCController.atualizarUsuario); // Exibe o formulário de edição
router.post("/editar", IMCController.atualizarUsuarioPost); // Recebe os dados para atualizar o usuário
router.get("/", IMCController.mostrarUsuarios); // Exibe a lista de usuários

module.exports = router;
