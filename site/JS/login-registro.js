
window.onload = function () {
  document.getElementById('login-loading').innerHTML = "";
};

// OLHINHO DA SENHA
function toggleSenha(id) {
  const campo = document.getElementById(id);
  campo.type = campo.type === "password" ? "text" : "password";
}

function validar() {
  limparErros();

  const nomeElement = document.getElementById("nome_input");
  const emailElement = document.getElementById("email_input");
  const senhaElement = document.getElementById("senha_input");
  const confirmacaoSenhaElement = document.getElementById("confirmacao_senha_input");
  const estadoElement = document.getElementById("estado_input");
  const estadoBorder = document.getElementById("estado_border");

  const nome = nomeElement.value.trim();
  const email = emailElement.value.trim();
  const senha = senhaElement.value;
  const confirmacaoSenha = confirmacaoSenhaElement.value;
  const estado = estadoElement.value;

  console.log(estado)

  let valido = true;

  // Validação do estado
  if (estado === "0") {
    mostrarErro("erro_estado", estadoBorder, "❌ Selecione um estado.");
    valido = false;
  }

  // Validação de nome e email
  if (nome === "" || email === "") {
    if (email === "") {
      mostrarErro("erro_email", emailElement, "❌ Campo Obrigatório");
    }
    if (nome === "") {
      mostrarErro("erro_nome", nomeElement, "❌ Campo Obrigatório");
    }
    valido = false;
  } else {
    const nomeValido = /^[A-Za-zÀ-ÿ]+(?:\s[A-Za-zÀ-ÿ]+)+$/.test(nome);
    if (!nomeValido) {
      mostrarErro("erro_nome", nomeElement, "❌ Nome inválido. Use nome completo sem números.");
      valido = false;
    }
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailValido) {
      mostrarErro("erro_email", emailElement, "❌ Email inválido. Use o formato nome@dominio.com");
      valido = false;
    }
  }

  // Validação de senha e confirmação
  if (senha === "" || confirmacaoSenha === "") {
    if (senha === "") {
      mostrarErro("erro_senha", senhaElement, "❌ Campo Obrigatório");
    }
    if (confirmacaoSenha === "") {
      mostrarErro("erro_confirmacao", confirmacaoSenhaElement, "❌ Campo Obrigatório");
    }
    valido = false;
  } else {
    const errosSenha = [];
    if (!/[A-Z]/.test(senha)) errosSenha.push(" Pelo menos uma letra maiúscula ");
    if (!/\d/.test(senha)) errosSenha.push(" Pelo menos um número");
    if (!/[\W_]/.test(senha)) errosSenha.push(" Pelo menos um caractere especial ");
    if (senha.length < 6) errosSenha.push(" Mínimo de 6 caracteres ");

    if (errosSenha.length > 0) {
      const mensagem = "❌ Senha fraca:" + errosSenha.join("|");
      mostrarErro("erro_senha", senhaElement, mensagem);
      mostrarErro("erro_confirmacao", confirmacaoSenhaElement);
      valido = false;
    }

    if (senha !== confirmacaoSenha) {
      mostrarErro("erro_confirmacao", confirmacaoSenhaElement, "❌ As senhas não coincidem.");
      mostrarErro("erro_senha", senhaElement, "❌ As senhas não coincidem.");
      valido = false;
    }
  }

  // Se tudo estiver válido
  if (valido) {
    document.getElementById("loading_gif").innerHTML = `
      <div><img src="./IMGS/loading.gif" alt="" height="120px" width="120px"></div>
      <div><h3>✅ Cadastro realizado com sucesso! Redirecionando</h3></div>
    `;
    setTimeout(() => {
      cadastrar();
    }, 1500);
  }
}

function mostrarErro(idSpan, inputElement, mensagem) {
  document.getElementById(idSpan).textContent = mensagem;
  inputElement.style.border = "2px solid red";
}

function limparErros() {
  const spans = document.querySelectorAll(".erro");
  spans.forEach(span => span.textContent = "");

  const inputs = document.querySelectorAll("input");
  inputs.forEach(input => input.style.border = "");

  const estadoBorder = document.getElementById("estado_border");
  if (estadoBorder) {
    estadoBorder.style.border = "1px solid #ccc"; // restaura a borda padrão
  }
}


// FEITO!!!
function cadastrar() {
  // aguardar();

  //Recupere o valor da nova input pelo nome do id
  // Agora vá para o método fetch logo abaixo
  var nomeVar = nome_input.value;
  var emailVar = email_input.value;
  var estadoVar = document.getElementById("estado_input").value;
  var senhaVar = senha_input.value;
  var confirmacaoSenhaVar = confirmacao_senha_input.value;


  // Verificando se há algum campo em branco
  if (
    nomeVar == "" ||
    emailVar == "" ||
    estadoVar == "" ||
    senhaVar == "" ||
    confirmacaoSenhaVar == ""
  ) {
    //com erro!!
  } else {
    //sem erro!!
  }

  // Enviando o valor da nova input
  fetch("/usuarios/cadastrar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nomeServer: nomeVar,
      emailServer: emailVar,
      estadoServer: estadoVar,
      senhaServer: senhaVar,
    }),
  })
    .then(function (resposta) {
      console.log("resposta: ", resposta);

      if (resposta.ok) {

        setTimeout(() => {
          window.location = "login.html";
        }, "2000");
      } else {
        throw "Houve um erro ao tentar realizar o cadastro!";
      }
    })
    .catch(function (resposta) {
      console.log(`#ERRO: ${resposta}`);
    });

  return false;
}
// FEITO!!!
function entrar() {

  var emailVar = email_input.value;
  var senhaVar = senha_input.value;


  if (emailVar == "" || senhaVar == "") {
    document.getElementById("erro_login").innerHTML = `<h3 style="color:red;margin:0">❌ Preencha Todos Os Campos<h3>`
    return false

  }
  else {
    console.log("ERRO")
  }

  fetch("/usuarios/autenticar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      emailServer: emailVar,
      senhaServer: senhaVar
    })
  }).then(function (resposta) {
    console.log("ESTOU NO THEN DO entrar()!")

    if (resposta.ok) {
      document.getElementById("erro_login").innerHTML = ""

      resposta.json().then(json => {

        sessionStorage.EMAIL_USUARIO = json.email;
        sessionStorage.NOME_USUARIO = json.nome;
        sessionStorage.ID_USUARIO = json.id;
        sessionStorage.USUARIO_ADMIN = json.administrador;
        sessionStorage.USUARIO_ESTADO = json.estado;
        
        document.getElementById('login-loading').innerHTML = `<img src="./IMGS/loading.gif" height="75px" width="75px">`

        setTimeout(() => {
          console.log("REDIRECIONANDO")
          window.location.href = "./USER-PAGES/usuario.html";
        }, "2000");
      });


    } else {
      console.log("Houve um erro ao tentar realizar o login!");
      document.getElementById("erro_login").innerHTML = `<h3 style="color:red;margin:0">❌ Houve um erro ao realizar login<h3>`
      resposta.text().then(texto => {
        console.error(texto);
      });
    }

  }).catch(function (erro) {
    console.log(erro);
  })

  return false;

};


