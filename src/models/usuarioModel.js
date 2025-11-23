var database = require("../database/config")

function autenticar(email, senha) {
  console.log("ACESSEI O USUARIO MODEL\n\n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n\t\t >> verifique suas credenciais de acesso ao banco\n\t\t >> e se o servidor de seu BD está rodando corretamente.\n\nfunction entrar():", email, senha);

  var instrucaoSql = `
    SELECT u.idUsuario, u.nome, u.email, u.administrador, e.nomeUf AS estado
    FROM usuario u
    JOIN estado e ON u.idEstado = e.idUF
    WHERE u.email = '${email}' AND u.senha = '${senha}';
  `;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function cadastrar(estado, nome, email, senha) {
  console.log("ACESSEI O USUARIO MODEL\n\n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n\t\t >> verifique suas credenciais de acesso ao banco\n\t\t >> e se o servidor de seu BD está rodando corretamente.\n\nfunction cadastrar():", nome, email, senha);

  var instrucaoSql = `
    INSERT INTO usuario (idSecretaria, idEstado, administrador, nome, email, senha)
    VALUES (1, 999, false, '${nome}', '${email}', '${senha}');
  `;
  
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
    autenticar,
    cadastrar
};
