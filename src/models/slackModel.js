var database = require("../database/config")

function findStatus() {
  var instrucaoSql = `
    SELECT s.idSlackConfig, s.canal_padrao, e.ligado
    FROM slack_config s
    JOIN slack_evento e ON e.fkSlackConfig = s.idSlackConfig
    WHERE e.idSlackEvento = 1;
  `;
  return database.executar(instrucaoSql);
}

function updateStatus(id, estado) {
  var instrucaoSql = `
    UPDATE slack_evento
    SET ligado = ${estado}
    WHERE idSlackEvento= ${id};
  `;
  return database.executar(instrucaoSql);
}

module.exports = {
  findStatus,
  updateStatus,
};
