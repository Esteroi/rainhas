// util/conhecendoJogos.js
const jogos = [
  {
    nome: "Sweet Bonanza",
    descricao: "🍬 Slot clássico da Pragmatic Play. Combina doces iguais para ganhar. O bônus vem com multiplicadores de até 100x.",
    tempo: "🎯 Sugestão: jogue de 10 a 15 minutos.",
    bet: "💰 Bet inicial: R$ 0,40 – R$ 1,00. Aumente apenas se começar a pagar."
  },
  {
    nome: "Gates of Olympus",
    descricao: "⚡ Jogo do Zeus. Multiplicadores aparecem aleatoriamente e podem transformar ganhos pequenos em grandes vitórias.",
    tempo: "🎯 Sugestão: jogue de 15 a 20 minutos.",
    bet: "💰 Bet inicial: R$ 0,60 – R$ 1,20."
  },
  {
    nome: "Starlight Princess",
    descricao: "🌟 Similar ao Gates of Olympus, mas com a princesa como personagem principal. Multiplicadores frequentes.",
    tempo: "🎯 Sugestão: 10 a 15 minutos.",
    bet: "💰 Bet inicial: R$ 0,40 – R$ 1,00."
  },
  {
    nome: "Legend of Perseus",
    descricao: "🏹 Slot temático épico. Símbolos especiais liberam vitórias em cadeia.",
    tempo: "🎯 Sugestão: jogue de 12 a 18 minutos.",
    bet: "💰 Bet inicial: R$ 0,50 – R$ 1,50."
  },
  {
    nome: "Aztec Gems",
    descricao: "💎 Slot simples com 3 rolos e multiplicadores na lateral. Pagamentos rápidos e diretos.",
    tempo: "🎯 Sugestão: partidas curtas de até 10 minutos.",
    bet: "💰 Bet inicial: R$ 0,25 – R$ 0,75."
  },
  {
    nome: "Sugar Rush",
    descricao: "🍭 Conhecido pelos estourinhos acumulados. Quanto mais rodadas, maior o potencial de estourar alto.",
    tempo: "🎯 Sugestão: jogue de 20 a 25 minutos.",
    bet: "💰 Bet inicial: R$ 0,60 – R$ 1,20."
  },
  {
    nome: "Fortune Tiger (PG Soft)",
    descricao: "🐯 Jogo famoso pelo 'rugido do tigre'. Quando ativa, pode dar tela cheia de símbolos.",
    tempo: "🎯 Sugestão: jogue de 8 a 12 minutos.",
    bet: "💰 Bet inicial: R$ 0,40 – R$ 0,80."
  },
  {
    nome: "Fortune Rabbit (PG Soft)",
    descricao: "🐇 Bônus surpresa pode encher a tela de símbolos premium. Muito dinâmico.",
    tempo: "🎯 Sugestão: 10 a 15 minutos.",
    bet: "💰 Bet inicial: R$ 0,40 – R$ 1,00."
  }
];

function conhecerJogoAleatorio() {
  const jogo = jogos[Math.floor(Math.random() * jogos.length)];
  return `🎮 *${jogo.nome}*\n\n📖 ${jogo.descricao}\n\n${jogo.tempo}\n${jogo.bet}`;
}

module.exports = { conhecerJogoAleatorio };