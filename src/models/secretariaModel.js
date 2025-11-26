var database = require("../database/config");

function cadastrar(nome, tipo) {
    console.log("ACESSEI O SECRETARIA MODEL - CADASTRAR");
    
    var instrucaoSql = `
        INSERT INTO secretaria (nome, tipo, data_criacao) 
        VALUES ('${nome}', '${tipo}', NOW());
    `;
    
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listar() {
    console.log("ACESSEI O SECRETARIA MODEL - LISTAR");
    
    var instrucaoSql = `
        SELECT 
            idSecretaria, 
            nome, 
            tipo, 
            data_criacao
        FROM secretaria;
    `;
    
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarPorId(idSecretaria) {
    console.log("ACESSEI O SECRETARIA MODEL - BUSCAR POR ID");
    
    var instrucaoSql = `
        SELECT 
            idSecretaria, 
            nome, 
            tipo, 
            data_criacao
        FROM secretaria 
        WHERE idSecretaria = ${idSecretaria};
    `;
    
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function atualizar(idSecretaria, nome, tipo) {
    console.log("ACESSEI O SECRETARIA MODEL - ATUALIZAR");
    
    var instrucaoSql = `
        UPDATE secretaria 
        SET 
            nome = '${nome}',
            tipo = '${tipo}'
        WHERE idSecretaria = ${idSecretaria};
    `;
    
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function deletar(idSecretaria) {
    console.log("ACESSEI O SECRETARIA MODEL - DELETAR");
    
    var instrucaoSql = `
        DELETE FROM secretaria WHERE idSecretaria = ${idSecretaria};
    `;
    
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    cadastrar,
    listar,
    buscarPorId,
    atualizar,
    deletar
};