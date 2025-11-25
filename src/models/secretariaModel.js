var database = require("../database/config");

function autenticar(email, senha) {
    console.log("Função autenticar() chamada!");

    var instrucaoSql = `
       
    `;
    
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    
    return database.executar(instrucaoSql);
}

function cadastrar(estado, nome, email, senha) {
    console.log("Função cadastrar() chamada!");

    var instrucaoSql = `

    `;
    
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    
    return database.executar(instrucaoSql);
}


function listar() {
    console.log("Função listar() chamada!");

    var instrucaoSql = `
        
    `;
    
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    
    return database.executar(instrucaoSql);
}

function buscarPorId(idSecretaria) {
    console.log("Função buscarPorId() chamada!");

    var instrucaoSql = `
        
    `;
    
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    
    return database.executar(instrucaoSql);
}

function atualizar(idSecretaria, nome, email, estado) {
    console.log("Função atualizar() chamada!");

    var instrucaoSql = `
        
    `;
    
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    
    return database.executar(instrucaoSql);
}

function deletar(idSecretaria) {
    console.log("Função deletar() chamada!");

    var instrucaoSql = `
        DELETE FROM secretaria WHERE id = ${idSecretaria};
    `;
    
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    
    return database.executar(instrucaoSql);
}

module.exports = {
    autenticar,
    cadastrar,
    listar,
    buscarPorId,
    atualizar,
    deletar
};