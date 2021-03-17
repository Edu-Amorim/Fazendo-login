const usuariosModel = require('../models/usuarios');
const loginModel = require('../models/login');
const bancoDeDados = require('../static-database/db.json');
const bcrypt = require('bcrypt')

const index = (req, res) => {
  res.render('login/index');
}

const submit = (req, res) => {
  const { email, password } = req.body;
  const listaUsuarios = usuariosModel.listarUsuarios();
  if (loginModel.validarEmail(email) && loginModel.validarPassword(email, password)) {
    return res.render('lista-usuarios', { lista: listaUsuarios });
  } 
  return res.render('/error')
}

const cadastro = (req, res) => {
  res.render('login/cadastro');
}

const novoCadastro = (req, res) => {
  //capturar os dados enviados via POST
  const usuarioDoFormulario = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body['confirm-password']
  }

  //mandar para o model validar email e senha e cadastrar no banco de dados
  const usuarioCadastrado = usuariosModel.cadastrarUsuario(usuarioDoFormulario);

  res.redirect('/login')
}

module.exports = {
  index,
  submit,
  cadastro,
  novoCadastro
}