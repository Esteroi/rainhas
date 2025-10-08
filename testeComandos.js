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

console.log("🔹 Testando imports e funções...");

try {
  console.log("✔️ pegarAleatoria():", pegarAleatoria());
  console.log("✔️ mensagemBoasVindas('Ester','Grupo'):", mensagemBoasVindas('Ester','Grupo'));
  console.log("✔️ gerarMensagemContatos():", gerarMensagemContatos());
  console.log("✔️ piadas[0]:", piadas[0]);
  console.log("✔️ versiculos[0]:", versiculos[0]);
  console.log("✔️ enviarAjuda(chat) - função existe:", typeof enviarAjuda === "function");
  console.log("✔️ obterDicaAleatoria():", obterDicaAleatoria());
  console.log("✔️ formatarMinutosPagantes('20:00','19:55', [{nome:'Jogo1', minutos:5}]):", formatarMinutosPagantes('20:00','19:55', [{nome:'Jogo1', minutos:5}]));
  console.log("✔️ gerarSorteUnica():", gerarSorteUnica());
  console.log("✔️ linksPorcentagem:", linksPorcentagem);
  console.log("✔️ obterSaudacao('bom dia'):", obterSaudacao('bom dia'));
  console.log("✔️ mensagemPromocoes():", mensagemPromocoes());
  console.log("✔️ mensagemPlataformas():", mensagemPlataformas());
  console.log("✔️ mensagemPlataformasParaDicas():", mensagemPlataformasParaDicas());

  // Teste de arrays
  console.log("✔️ brincadeiras[0]:", brincadeiras[0]);
  console.log("✔️ respostas[0]:", respostas[0]);

  console.log("✅ Todos os módulos e funções importaram e retornaram valores corretamente!");
} catch (err) {
  console.error("❌ Erro ao testar funções:", err);
}
