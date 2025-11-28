const database = require("../database/config");

function buscarKPIs() {
    const sqls = {
        acima900: `
            SELECT COUNT(*) AS total 
            FROM media_aluno_enem 
            WHERE nota_candidato > 900;
        `,
        abaixo500: `
            SELECT COUNT(*) AS total 
            FROM media_aluno_enem 
            WHERE nota_candidato < 500;
        `,
        menorMedia: `
            SELECT e.nomeUf AS estado, AVG(m.nota_candidato) AS media
            FROM media_aluno_enem m
            JOIN estado e ON m.idEstado = e.idUF
            GROUP BY e.nomeUf
            ORDER BY media ASC
            LIMIT 1;
        `,
        maiorMedia: `
            SELECT e.nomeUf AS estado, AVG(m.nota_candidato) AS media
            FROM media_aluno_enem m
            JOIN estado e ON m.idEstado = e.idUF
            GROUP BY e.nomeUf
            ORDER BY media DESC
            LIMIT 1;
        `
    };

    return Promise.all([
        database.executar(sqls.acima900),
        database.executar(sqls.abaixo500),
        database.executar(sqls.menorMedia),
        database.executar(sqls.maiorMedia)
    ]);
}

function buscarNotas900() {
    const instrucaoSql = `
        SELECT e.nomeUf AS estado, COUNT(*) AS total
        FROM media_aluno_enem m
        JOIN estado e ON m.idEstado = e.idUF
        WHERE m.nota_candidato > 900
        GROUP BY e.nomeUf
        ORDER BY total DESC
        LIMIT 10;
    `;
    return database.executar(instrucaoSql);
}

function buscarMediaGeral() {
    const instrucaoSql = `
        SELECT ano, AVG(nota_candidato) AS media
        FROM media_aluno_enem
        GROUP BY ano
        ORDER BY ano ASC;
    `;
    return database.executar(instrucaoSql);
}

function buscarDistribuicaoNotas() {
    const instrucaoSql = `
        SELECT 
            SUM(CASE WHEN nota_candidato >= 800 THEN 1 ELSE 0 END) AS acima800,
            SUM(CASE WHEN nota_candidato >= 600 AND nota_candidato < 800 THEN 1 ELSE 0 END) AS entre600e800,
            SUM(CASE WHEN nota_candidato < 600 THEN 1 ELSE 0 END) AS abaixo600
        FROM media_aluno_enem;
    `;
    return database.executar(instrucaoSql);
}

function buscarEstados() {
    const instrucaoSql = `
        SELECT e.nomeUf AS estado, AVG(m.nota_candidato) AS notaMedia
        FROM media_aluno_enem m
        JOIN estado e ON m.idEstado = e.idUF
        GROUP BY e.idUF, e.nomeUf
        ORDER BY e.idUF;
    `;
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarKPIs,
    buscarNotas900,
    buscarMediaGeral,
    buscarDistribuicaoNotas,
    buscarEstados
};