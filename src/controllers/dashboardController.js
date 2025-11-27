const dashboardModel = require("../models/dashboardModel");

function getKPIs(req, res) {
    dashboardModel.buscarKPIs()
        .then(([acima900, abaixo500, menorMedia, maiorMedia]) => {
            const dados = {
                totalAcima900: acima900[0].total,
                totalAbaixo500: abaixo500[0].total,
                estadoMenorMedia: menorMedia[0].estado,
                estadoMaiorMedia: maiorMedia[0].estado
            };
            res.json(dados);
        })
        .catch(erro => {
            console.error("Erro ao buscar KPIs:", erro);
            res.status(500).json({ erro: "Erro ao buscar KPIs" });
        });
}

function getChart1(req, res) {
    dashboardModel.buscarNotas900()
        .then(resultado => {
            // resultado deve ser [{estado: 'SP', total: 123}, ...]
            const estados = resultado.map(r => r.estado);
            const valores = resultado.map(r => r.total);

            res.json({ estados, valores });
        })
        .catch(erro => {
            console.error("Erro ao buscar dados do gráfico 1:", erro);
            res.status(500).json({ erro: "Erro no gráfico 1" });
        });
}

function getChart2(req, res) {
    dashboardModel.buscarMediaGeral()
        .then(resultado => {
            // resultado deve ser [{ano: 2019, media: 550}, ...]
            const anos = resultado.map(r => r.ano);
            const medias = resultado.map(r => r.media);

            res.json({ anos, medias });
        })
        .catch(erro => {
            console.error("Erro ao buscar dados do gráfico 2:", erro);
            res.status(500).json({ erro: "Erro no gráfico 2" });
        });
}

function getDistribuicaoNotas(req, res) {
    dashboardModel.buscarDistribuicaoNotas()
        .then(resultado => {
            const dados = resultado[0];
            res.json({
                acima800: dados.acima800,
                entre600e800: dados.entre600e800,
                abaixo600: dados.abaixo600
            });
        })
        .catch(erro => {
            console.error("Erro ao buscar distribuição de notas:", erro);
            res.status(500).json({ erro: "Erro ao buscar distribuição de notas" });
        });
}

function buscarEstados(req, res) {
    dashboardModel.buscarEstados()
        .then(estados => {
            res.json(estados);
        })
        .catch(erro => {
            console.error("Erro ao buscar estados:", erro);
            res.status(500).json({ erro: "Erro ao buscar estados" });
        });
}

module.exports = { 
    getKPIs, 
    getChart1,
    getChart2, 
    getDistribuicaoNotas,
    buscarEstados

};