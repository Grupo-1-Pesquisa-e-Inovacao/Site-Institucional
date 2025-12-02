var database = require("../database/config")

function findAll() {
  var instrucaoSql = `
  select fkSlackConfig, idSlackEvento, canal_padrao, ligado from slack_evento join slack_config on fkSlackConfig = idSlackConfig;
  `;
  return database.executar(instrucaoSql);
}

function updateStatus(id, ligado) {
  var instrucaoSql = `
    UPDATE slack_evento
    SET ligado = ${ligado}
    WHERE idSlackEvento = ${id};
  `;
  return database.executar(instrucaoSql);
}

function deleteById(id) {
  var instrucaoSql = `
    DELETE FROM slack_evento
    WHERE idSlackEvento = ${id};
  `;
  return database.executar(instrucaoSql);
}

module.exports = {
  findAll,
  updateStatus,
  deleteById
};
