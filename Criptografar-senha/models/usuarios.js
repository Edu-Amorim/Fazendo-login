const fs = require('fs');
const bcrypt = require('bcrypt');

const cadastrarUsuario = ({ email, password, confirmPassword }) => {
    //Quero saber se as duas senhas são iguais. Se forem diferentes, vai enviar uma mensagem de erro
    validarSenhaDeCadastro(password, confirmPassword);

    //Cria um novoUsuario, já com senha encriptada, para a gente dar um push no banco de dados daqui a pouco
    const senhaEncriptada = bcrypt.hashSync(password, 10);
    const novoUsuario = {email: email, password: senhaEncriptada};

    //Quero saber se já existe esse email cadastrado. Se não existir, dou um push no novoUsuario
    const usuarios = listarUsuarios();
    validarEmailDoUsuario(usuarios, email);
    usuarios.push(novoUsuario);
    fs.writeFileSync('static-database/db.json', JSON.stringify(usuarios));

    //Isso aqui é para eu usar lááá no ../controllers/login.js , na função novoCadastro
    return novoUsuario;
}



//Basicamente, eu crio o banco de dados aqui e, depois de criado, retorno a lista de usuarios como um array de objetos
const listarUsuarios = () => {
    const usuarios = fs.readFileSync('static-database/db.json', {encoding: 'utf-8'});
    
    //Se existir alguém no banco de dados, eu retorno o array. Se não, eu crio o array:
    const listaDeUsuarios = usuarios ? JSON.parse(usuarios) : [];
    return listaDeUsuarios;
}

const validarSenhaDeCadastro = (password, confirmPassword) => {
    if (password !== confirmPassword) {
        throw Error('As senhas são diferentes. Informe senhas iguais.');
    };
}


const validarEmailDoUsuario = (usuarios, email) => {
    const usuarioJaEstaCadastrado = usuarios.find(usuario => usuario.email === email);
    if (usuarioJaEstaCadastrado) throw Error('Esse usuário já está cadastrado. Faça o login.');
}





module.exports = {
    cadastrarUsuario,
    listarUsuarios
}
