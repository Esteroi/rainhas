const fs = require('fs');
const fsp = fs.promises;
const path = require('path');

const { pegarAleatoria } = require('./util/motivacional');
const mensagemBoasVindas = require('./util/bemvindos');
const { gerarMensagemContatos } = require('./util/contatosAdms');
const piadas = require("./util/piada");
const versiculos = require("./util/versiculos");
const { enviarAjuda } = require("./util/ajuda");
const { obterDicaAleatoria } = require('./util/dicas');
const formatarMinutosPagantes = require('./util/minutosPagantes');
const { brincadeiras, respostas } = require('./util/brincadeiras');
const { gerarSorteUnica } = require('./util/sorte');
const linksPorcentagem = require("./util/porcentagem");
const obterSaudacao = require("./util/saudacoes");
const mensagemPromocoes = require("./util/promocoes");
const { mensagemPlataformas, mensagemPlataformasParaDicas } = require('./util/plataformas');

(async () => {
  console.log("🔹 Testando imports...");
  console.log("Todos os módulos importaram corretamente!");

  console.log("\n🔹 Testando funções básicas...");

  console.log("- Motivacional:", pegarAleatoria());
  console.log("- Piada:", piadas[Math.floor(Math.random() * piadas.length)]);
  console.log("- Versículo:", versiculos[Math.floor(Math.random() * versiculos.length)]);
  console.log("- Dica aleatória:", obterDicaAleatoria());
  console.log("- Mensagem de plataformas:", mensagemPlataformas());
  console.log("- Mensagem de plataformas para dicas:", mensagemPlataformasParaDicas());
  console.log("- Mensagem de promoções:", mensagemPromocoes());

  console.log("\n🔹 Testando formatação minutos pagantes...");
  const exemploJogos = [
    { nome: "Jogo 1", minutos: 30 },
    { nome: "Jogo 2", minutos: 45 }
  ];
  console.log(formatarMinutosPagantes("20:00", "19:55", exemploJogos));

  console.log("\n🔹 Testando mensagens de boas-vindas...");
  console.log(mensagemBoasVindas("TestUser", "GrupoTeste"));

  console.log("\n🔹 Testando mensagens de contatos/admins...");
  console.log(gerarMensagemContatos());

  console.log("\n🔹 Testando sorteios...");
  console.log(gerarSorteUnica());

  console.log("\n🔹 Testando respostas de brincadeiras...");
  console.log("Brincadeiras:", brincadeiras);
  console.log("Respostas:", respostas);

  console.log("\n🔹 Teste finalizado!");
})();
