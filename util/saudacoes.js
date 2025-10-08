// util/saudacoes.js

const respostasBomDia = [
  "Bom dia! Que seu dia seja incrível! ✨",
  "Ótimo dia pra você, que seus objetivos sejam alcançados! 😊",
  "Bom dia! Bora fazer acontecer! 💪",
  "Bom dia! Que hoje você acorde com o coração leve, o sorriso solto e a certeza de que algo incrível está para acontecer!",
  "Bom dia! Acorde com gratidão e caminhe com fé. Cada novo dia é uma nova chance de recomeçar.",
  "Bom dia! Que o seu dia seja repleto de motivos para sorrir, e que nenhuma dificuldade seja maior que a sua vontade de vencer.",
  "Bom dia! Que a coragem seja maior que o medo e que a fé seja mais forte que qualquer dúvida.",
  "Bom dia! O dia começou! Vista seu melhor sorriso, abrace suas metas e vá conquistar o que é seu.",
  "Bom dia! Que hoje seja leve, produtivo e cheio de boas surpresas. A vida sorri para quem tem esperança.",
  "Bom dia! Acredite: há sempre algo bom esperando por você logo ali na esquina da vida."
];

const respostasBoaTarde = [
  "Boa tarde! Espero que esteja tendo um ótimo dia!☀️",
  "Boa tarde! 😊",
  "Tardezinha boa pra você! ✨",
  "Boa tarde! Que a paz invada seu coração e a esperança renove sua força para continuar com fé e alegria.",
  "Boa tarde! Que as próximas horas sejam leves, produtivas e cheias de boas surpresas.",
  "Boa tarde! Nunca é tarde para recomeçar, sonhar de novo e fazer o dia valer a pena.",
  "Boa tarde! Respire fundo, mantenha o foco e lembre-se: ainda dá tempo de fazer deste dia algo especial.",
  "Boa tarde! Que a luz do sol te inspire a seguir em frente com coragem e positividade.",
  "Boa tarde! Que você receba agora uma dose extra de ânimo, paz e pensamentos bons.",
  "Boa tarde! Ainda tem muita coisa boa por vir... acredite!"
];

const respostasBoaNoite = [
  "Boa noite! Durma bem! 🌙",
  "Boa noite! Bons sonhos! ✨",
  "Noite abençoada pra você! 🙏",
  "Boa noite! Que a paz te abrace, o descanso seja profundo e os sonhos te levem para lugares de esperança.",
  "Boa noite! Que a gratidão embale seu coração e que o amanhã chegue com novas oportunidades.",
  "Boa noite! Que você termine o dia com serenidade e comece a noite com fé renovada.",
  "Boa noite! Que o silêncio da noite traga respostas, conforto e renovação para sua alma.",
  "Boa noite! Descanse sabendo que tudo que é seu está a caminho. Confie e espere com o coração em paz.",
  "Boa noite! Que a noite traga descanso ao corpo, paz à mente e alívio ao coração.",
  "Boa noite! Que o céu te cubra de bênçãos e que o amanhã seja um recomeço cheio de luz."
];

function obterSaudacao(mensagem) {
  const texto = mensagem.toLowerCase();

  if (texto.includes("bom dia")) {
    return respostasBomDia[Math.floor(Math.random() * respostasBomDia.length)];
  } else if (texto.includes("boa tarde")) {
    return respostasBoaTarde[Math.floor(Math.random() * respostasBoaTarde.length)];
  } else if (texto.includes("boa noite")) {
    return respostasBoaNoite[Math.floor(Math.random() * respostasBoaNoite.length)];
  }

  return null;
}

module.exports = obterSaudacao;