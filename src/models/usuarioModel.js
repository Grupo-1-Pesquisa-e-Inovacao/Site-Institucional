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


  function cadastrar(idSecretaria, estado, nome, email, senha) {
    console.log("ACESSEI O USUARIO MODEL - CADASTRAR\n", { idSecretaria, estado, nome, email });

    var isec = (typeof idSecretaria !== 'undefined' && idSecretaria !== null && idSecretaria !== '') ? idSecretaria : 'NULL';
    var idEstado = (typeof estado !== 'undefined' && estado !== null) ? estado : 'NULL';

    var instrucaoSql = `
      INSERT INTO usuario (idSecretaria, idEstado, administrador, nome, email, senha)
      VALUES (${isec}, ${idEstado}, false, '${nome}', '${email}', '${senha}');
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
  }

function findAllCommonUsers() {
  var instrucaoSql = `
    select 
      usuario.idUsuario,
      usuario.nome as nomeUsuario, 
      usuario.email,
      secretaria.nome as nomeSecretaria 
    from usuario 
    left join secretaria on secretaria.idSecretaria = usuario.idSecretaria
    where administrador = false;
  `;
  return database.executar(instrucaoSql);
}

function findAllAdminUsers() {
  var instrucaoSql = `
    select 
      usuario.idUsuario,
      usuario.nome as nomeUsuario, 
      usuario.email,
      secretaria.nome as nomeSecretaria 
    from usuario 
    left join secretaria on secretaria.idSecretaria = usuario.idSecretaria
    where administrador = true;
  `;
  return database.executar(instrucaoSql);
}

function cadastrarAdmin(nome, email, senha, idSecretaria, idEstado) {
  var isec = (typeof idSecretaria !== 'undefined' && idSecretaria !== null) ? idSecretaria : 'NULL';
  var iest = (typeof idEstado !== 'undefined' && idEstado !== null) ? idEstado : 'NULL';

  var instrucaoSql = `
    INSERT INTO usuario (idSecretaria, idEstado, administrador, nome, email, senha)
    VALUES (${isec}, ${iest}, true, '${nome}', '${email}', '${senha}');
  `;
  return database.executar(instrucaoSql);
}


function deleteById(id){
  var instrucaoSql = `delete from usuario where idUsuario = ${id};`
  return database.executar(instrucaoSql);
}

function updateById(id, nome, email, senha, idSecretaria, idEstado) {
  var setClauses = [];
  if (nome !== undefined) setClauses.push(`nome = '${nome}'`);
  if (email !== undefined) setClauses.push(`email = '${email}'`);
  if (senha !== undefined) setClauses.push(`senha = '${senha}'`);
  if (typeof idSecretaria !== 'undefined') setClauses.push(`idSecretaria = ${idSecretaria}`);
  if (typeof idEstado !== 'undefined') setClauses.push(`idEstado = ${idEstado}`);

  if (setClauses.length === 0) {
    return Promise.resolve([]);
  }

  var instrucaoSql = `
    UPDATE usuario
    SET ${setClauses.join(', ')}
    WHERE idUsuario = ${id};
  `;
  return database.executar(instrucaoSql);
}

function findById(id) {
  var instrucaoSql = `select * from usuario where idUsuario = ${id};`
  return database.executar(instrucaoSql);
}



module.exports = {
  autenticar,
  cadastrar,
  findAllCommonUsers,
  findAllAdminUsers,
  deleteById,
  updateById,
  findById,
  cadastrarAdmin
};
