const Usuario = require("../models/Usuario");

// Função para calcular o IMC
const calcularIMC = (peso, altura) => {
  return peso / (altura * altura);
};

module.exports = class IMCController {
  // Renderiza a página de criação do usuário
  static criarUsuario(req, res) {
    res.render("imc/criar");
  }

  // Cria um novo usuário e salva no banco de dados
  static async criarUsuarioPost(req, res) {
    const { nome, peso, altura, idade, sexo } = req.body;
    const imc = calcularIMC(peso, altura);

    try {
      await Usuario.create({ nome, peso, altura, idade, sexo, imc });
      res.redirect("/imc"); // Redireciona após salvar
    } catch (err) {
      console.error("Erro: ", err);
      res.status(500).send("Erro ao salvar usuário.");
    }
  }

  // Exibe a lista de usuários cadastrados
  static async mostrarUsuarios(req, res) {
    try {
      const usuarios = await Usuario.findAll({ raw: true });
      const nenhumaInformacao = usuarios.length === 0;

      res.render("imc/todas", { informacoesIMC: usuarios, nenhumaInformacao });
    } catch (err) {
      console.error(err);
      res.status(500).send("Erro ao listar usuários.");
    }
  }

  // Remove um usuário
  static async removeUsuario(req, res) {
    const { id } = req.body;

    try {
      await Usuario.destroy({ where: { id } });
      res.redirect("/imc"); // Redireciona após deletar
    } catch (err) {
      console.error(err);
      res.status(500).send("Erro ao deletar usuário.");
    }
  }

  // Renderiza a página de edição de usuário
  static async atualizarUsuario(req, res) {
    const { id } = req.params;

    try {
      const usuario = await Usuario.findByPk(id);
      if (usuario) {
        res.render("imc/editar", { usuario });
      } else {
        res.status(404).send("Usuário não encontrado.");
      }
    } catch (err) {
      console.error("Erro ao buscar usuário:", err);
      res.status(500).send("Erro ao buscar usuário.");
    }
  }

  // Atualiza as informações do usuário e recalcula o IMC
  static async atualizarUsuarioPost(req, res) {
    console.log("Dados recebidos para atualização:", req.body);

    const { id, nome, peso, altura, idade, sexo } = req.body;

    // Checagem de dados básicos
    if (!id || !nome || !peso || !altura || !idade || !sexo) {
      return res.status(400).send("Dados insuficientes fornecidos.");
    }

    // Checagem de tipo e valor numérico de peso e altura
    const pesoConvertido = parseFloat(peso);
    const alturaConvertida = parseFloat(altura);

    if (
      isNaN(pesoConvertido) ||
      isNaN(alturaConvertida) ||
      pesoConvertido <= 0 ||
      alturaConvertida <= 0
    ) {
      return res
        .status(400)
        .send("Peso e altura devem ser valores numéricos positivos.");
    }

    const imc = calcularIMC(pesoConvertido, alturaConvertida);
    console.log("IMC calculado:", imc);

    try {
      console.log("Buscando usuário com id:", id);
      const usuario = await Usuario.findByPk(id);
      console.log("Usuário encontrado:", usuario);

      if (usuario) {
        await usuario.update({
          nome,
          peso: pesoConvertido,
          altura: alturaConvertida,
          idade,
          sexo,
          imc,
        });
        res.redirect("/imc");
      } else {
        res.status(404).send("Usuário não encontrado.");
      }
    } catch (err) {
      console.error("Erro ao atualizar usuário:", err);
      res.status(500).send("Erro ao atualizar usuário.");
    }
  }
};
