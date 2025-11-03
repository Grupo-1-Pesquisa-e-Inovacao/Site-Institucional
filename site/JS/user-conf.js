username.innerHTML += sessionStorage.NOME_USUARIO

var dataNotas900 = [600, 580, 484, 455, 436, 391, 372, 267];

    var dataMedia = [1789098, 8906143, 14876450];

    var estados = ["Acre", "Alagoas", "Amapá", "Amazonas", "Bahia", "Ceará", "Distrito Federal", "Espírito Santo",
        "Goiás", "Maranhão", "Mato Grosso", "Mato Grosso do Sul", "Minas Gerais", "Pará", "Paraíba", "Paraná", "Pernambuco",
        "Piauí", "Rio de Janeiro", "Rio Grande do Norte", "Rio Grande do Sul", "Rondônia", "Roraima", "Santa Catarina",
        "São Paulo", "Sergipe", "Tocantins"];

    var notasMedia = [450, 460, 470, 455, 480, 475, 500, 490, 485, 455, 470, 465, 495, 460, 455, 500, 480, 445, 510, 465, 500, 450, 455, 495, 505, 460, 470];

    var anos = ["2018", "2019", "2020", "2021", "2022"];

    var mediaGeral = [500.6, 510.2, 520.5, 510.8, 530.0];


    var optionsChart1 = {
        series: [{
            name: 'Notas acima de 900 pontos',
            data: dataNotas900
        }],
        chart: {
            height: 455,
            type: 'bar',
            FontFace: '10'
        },
        xaxis: {
            categories: ['São Paulo', 'Rio de Janeiro', "Mato Grosso", 'Alagoas', 'Bahia', 'Amazonas', 'Goias', 'DF']
        },
        yaxis: {
            max: dataNotas900[0] + 100
        },
        title: {
            text: 'Estados com mais nota acima de 900 pontos (TOP 10)',
            align: 'center'

        },
        style: {
            fontSize: '9px', // tamanho menor
            fontWeight: 'bold'
        }
    };
    var optionsChart2 = {
        chart: {
            type: 'line',
            height: 455
        },
        series: [{
            name: 'Média Geral ENEM',
            data: mediaGeral
        }],
        xaxis: {
            categories: anos,
            title: {
                text: 'Ano'
            }
        },
        yaxis: {
            title: {
                text: 'Nota Média'
            },
            min: valorMaisBaixo(mediaGeral),
            max: valorMaisAlto(mediaGeral),
        },
        title: {
            text: 'Média geral do ENEM por ano',
            align: 'center'
        },
        stroke: {
            curve: 'smooth'
        },
        markers: {
            size: 6
        },
        tooltip: {
            shared: true,
            intersect: false
        }
    };
  

    var chart1 = new ApexCharts(document.querySelector("#chart1"), optionsChart1);
    var chart2 = new ApexCharts(document.querySelector("#chart2"), optionsChart2);



    chart1.render();
    chart2.render();

      // FUNÇÕES PRINCIPAIS !
      function gerarNumeroAleatorio() {
        const min = 500;
        const max = 800;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function chartKill() {
        chart1.destroy();
        chart2.destroy();
    }

    function limparKIPs() {
        for (i = 1; i < 5; i++) {
            document.getElementById('KPI' + i).innerHTML = '';
        }
    }

    function kpiReset() {
        document.getElementById('KPI-PRINCIPAL').innerHTML = `
        <div class="kpi-card" id="KPI1">
                    <h3>Total de notas <br> acima de 900 pontos </h3>
                    <p>4.870</p>
        </div>
        <div class="kpi-card" id="KPI2">
                    <h3>Total de notas <br> abaixo de 500 pontos </h3>
                    <p>123.989</p>
        </div>
        <div class="kpi-card" id="KPI3">
                    <h3>Total de provas <br> analizadas no ultimo ano </h3>
                    <p>48.760.878</p>
        </div>
        <div class="kpi-card" id="KPI4">
                    <h3>Total de provas <br> com 1000 pontos no ultimo ano</h3>
                    <p>230</p>
        </div>
        `;
    }

    function botaoResetAparecer() {
        document.getElementById("botao_reset").style.display = "inline";
    }

    function botaoResetSumir() {
        document.getElementById("botao_reset").style.display = "none";
        ;
    }

    function valorMaisAlto(mediaGeral) {
        let valorDaVez = mediaGeral[0]; // Começa com o primeiro valor do array

        for (let i = 1; i < mediaGeral.length; i++) {
            if (mediaGeral[i] > valorDaVez) {
                valorDaVez = mediaGeral[i];
            }
        }

        return valorDaVez + 100;
    }

    function valorMaisBaixo(mediaGeral) {
        let valorDaVez = mediaGeral[0]; // Começa com o primeiro valor do array

        for (let i = 1; i < mediaGeral.length; i++) {
            if (mediaGeral[i] < valorDaVez) {
                valorDaVez = mediaGeral[i];
            }
        }

        return valorDaVez - 100;
    }


