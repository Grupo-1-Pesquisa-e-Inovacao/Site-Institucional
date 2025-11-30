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
        SELECT ano, ROUND(AVG(nota_candidato), 2) AS media
        FROM media_aluno_enem
        GROUP BY ano
        ORDER BY ano ASC;
    `;
    return database.executar(instrucaoSql);
}

function buscarDistribuicaoNotas() {
    const instrucaoSql = `
    SELECT 
        CAST(SUM(CASE WHEN nota_candidato >= 700 THEN 1 ELSE 0 END) AS UNSIGNED) AS acima700,
        CAST(SUM(CASE WHEN nota_candidato >= 600 AND nota_candidato < 700 THEN 1 ELSE 0 END) AS UNSIGNED) AS entre600e700,
        CAST(SUM(CASE WHEN nota_candidato < 600 THEN 1 ELSE 0 END) AS UNSIGNED) AS abaixo600
    FROM media_aluno_enem;
    `;
    return database.executar(instrucaoSql);
}

function buscarEstados() {
    const instrucaoSql = `
    SELECT 
        e.nomeUf AS estado,
        COUNT(*) AS qtd_abaixo500
    FROM media_aluno_enem m
        JOIN estado e ON m.idEstado = e.idUF
        WHERE m.nota_candidato < 500
        GROUP BY e.nomeUf
    ORDER BY qtd_abaixo500 DESC;
    `;
    return database.executar(instrucaoSql);
}


function buscarKPIsPorEstado(estado) {
    const instrucaoSql = `
    SELECT 
        ROUND((COUNT(CASE WHEN mae.nota_candidato > 700 THEN 1 END) * 100.0 / COUNT(*)), 2) AS percentualAcima700,
        ROUND(AVG(mae.nota_candidato), 2) AS mediaGeral,
        COUNT(*) AS totalProvas,
        COUNT(DISTINCT mae.inscricao_enem) AS totalAlunos
    FROM media_aluno_enem mae
    JOIN estado e ON mae.idEstado = e.idUF
    WHERE e.nomeUf = '${estado}';
    `;
    return database.executar(instrucaoSql);
}

function buscarMunicipiosMenoresMedias(estado) {

    console.log("MODEL DE MINICIPIOS")
    const instrucaoSql = `    
    SELECT 
        m.nome_municipio,
        ROUND(AVG(mae.nota_candidato), 2) AS media_notas
    FROM media_aluno_enem mae
    JOIN municipio m 
        ON mae.idMunicipio = m.idMunicipio 
       AND mae.idEstado = m.idEstado
    JOIN estado e 
        ON m.idEstado = e.idUF
    WHERE e.nomeUf = '${estado}'
    GROUP BY m.nome_municipio
    ORDER BY media_notas ASC
    LIMIT 10;
    `;
    return database.executar(instrucaoSql);

}

function buscarMediaAnoPorEstado(estado) {

    console.log('MODEL DE MEDIAS ANO MUNICIPIO')
    const instrucaoSql = `
        SELECT 
            mae.ano,
            ROUND(AVG(mae.nota_candidato), 2) AS media
        FROM media_aluno_enem mae
        JOIN estado e ON mae.idEstado = e.idUF
        WHERE e.nomeUf = '${estado}'
        GROUP BY mae.ano
        ORDER BY mae.ano ASC;
    `;
    return database.executar(instrucaoSql);
}


module.exports = {
    buscarKPIs,
    buscarNotas900,
    buscarMediaGeral,
    buscarDistribuicaoNotas,
    buscarEstados,
    buscarKPIsPorEstado,
    buscarMunicipiosMenoresMedias,
    buscarMediaAnoPorEstado
};