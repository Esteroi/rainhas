// util/motivacional.js

const frases = [
   "🌟 Você não veio ao mundo para sobreviver… mas para viver intensamente cada sonho que carrega no coração.",
  "💪 A força que você precisa já está dentro de você. Hoje é o dia de provar isso ao mundo!",
  "🔥 Pare de esperar o momento perfeito… comece agora e torne este momento perfeito!",
  "🌱 Cada dificuldade é um solo fértil para o seu crescimento. Plante coragem e colha vitórias.",
  "🏆 A vida não dá troféus para quem apenas sonha, mas para quem se levanta e luta.",
  "🚀 Sua vida muda no instante em que você decide agir. O resto é só consequência.",
  "⚡ Você não é fruto do acaso, você é resultado da sua coragem de continuar.",
  "💡 Quando pensar em desistir, lembre-se: é no último golpe que a rocha se parte.",
  "🌈 Mesmo a noite mais escura termina com o nascer do sol. Continue, a sua luz já está vindo.",
  "🔥 Desafios não existem para te parar, mas para provar que você pode ir além.",
  "⏳ A vida não espera! Ou você age agora, ou passa a vida assistindo outros viverem seus sonhos.",
  "🚫 O impossível só existe para quem não tenta. Vá e prove para si mesmo que você é capaz!",
  "🏃‍♂️ Enquanto você pensa se deve começar, alguém já começou e está a milhas de distância. Mexa-se!",
  "🛡️ A força que você precisa já está aí dentro, só falta você decidir usá-la.",
  "🎯 Não existe sorte, existe persistência. O que você quer está a um passo da sua disciplina.",
  "🙌 Você não precisa estar pronto, precisa estar disposto!",
  "⌛ Pare de esperar por um momento perfeito, ele não existe. Faça o momento ser perfeito!",
  "💎 Não é sobre ser fácil, é sobre valer a pena.",
  "🦁 Seja mais forte que suas desculpas.",
  "🌈 Mesmo a noite mais escura termina com o nascer do sol. Continue, a sua luz já está vindo.",
  "🌍 Você não é o que aconteceu com você, você é o que escolhe se tornar.",
  "🎲 Quem não arrisca, já está perdendo sem perceber.",
  "📆 Cada dia que você não age é um dia que você não viveu.",
  "🚪 Você não nasceu para viver pequeno. Sonhe grande, ouse mais, faça acontecer!",
  "🔥 A dor de hoje é o combustível da sua vitória amanhã.",
  "🏹 Seja tão comprometido com seus sonhos que desistir pareça impossível."
];

function pegarAleatoria() {
  const idx = Math.floor(Math.random() * frases.length);
  return frases[idx];
}

function formatarParaWhatsApp() {
  return frases.map((f, i) => `${i + 1}. ${f}`).join('\n\n');
}

module.exports = {
  frases,
  pegarAleatoria,
  formatarParaWhatsApp
};
