const { mensagemPlataformas } = require("./plataformas");

function formatarMinutosPagantes(horarioAlvo, horarioAtual, listaJogos) {
  const hoje = new Date();
  const dataFormatada = hoje.toLocaleDateString('pt-BR');

  let mensagem = `🕹️ *MINUTOS PAGANTES* 🕹️\n`;
  mensagem += `📅 Data: *${dataFormatada}*\n`;
  mensagem += `⏰ Agora: *${horarioAtual}*\n`;
  mensagem += `🎯 Rodada das: *${horarioAlvo}*\n\n`;
  mensagem += `🔥 *Minutos Pagantes por Jogo:* 🔥\n\n`;

  const emojis = {
    'BIKINI PARADISE': '🎰',
    'CACHORRO': '🐶',
    'DRAGON HATCH': '🐉',
    'DRAGON TIGER LUCK': '🐅',
    'FORTUNE MOUSE': '🐭',
    'FORTUNE OX': '🐂',
    'FORTUNE RABBIT': '🐇',
    'FORTUNE TIGER': '🐯',
    'GÊNIO': '🧞‍♂️',
    'JUNGLE DELIGHT': '🌴',
    'LUCKY PIG': '🐷',
    'MIDAS GOLD': '💰',
    'MUAY THAI': '🥊',
    'PINGUIM': '🐧'
  };

  for (const jogo of listaJogos) {
    const nome = jogo.nome;
    const minutos = Array.isArray(jogo.minutos) ? jogo.minutos : [jogo.minutos];
    const emoji = emojis[nome] || '🎰';
    mensagem += `${emoji} *${nome.toUpperCase()}:*\n${minutos.join(", ")}\n\n`;
  }

  mensagem += `\n💸 Acompanhe e jogue nos minutos certos!\n\n`;

  // Adiciona a mensagem das plataformas no final
  mensagem += mensagemPlataformas();

  return mensagem;
}

module.exports = formatarMinutosPagantes;