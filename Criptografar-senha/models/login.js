const fs = require('fs');
const bcrypt = require('bcrypt');


const validarEmail = (email) => {
    const usuarios = JSON.parse(fs.readFileSync('static-database/db.json', {encoding: 'utf-8'}));
    const usuarioJaEstaCadastrado = usuarios.find(usuario => usuario.email === email);
    return usuarioJaEstaCadastrado;
}

const validarPassword = (email, password) => {
    const usuarios = JSON.parse(fs.readFileSync('static-database/db.json', {encoding: 'utf-8'}));
    const usuarioJaEstaCadastrado = usuarios.find(usuario => usuario.email === email);

    return bcrypt.compareSync(password, usuarioJaEstaCadastrado.password);
}

module.exports = {
    validarEmail,
    validarPassword
}
