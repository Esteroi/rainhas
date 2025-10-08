function gerarMensagem(valor) {
  if (valor >= 90) {
    const mensagens = [
      "Você está com MUITA sorte hoje! Aproveite para arriscar e conquistar o que deseja! 🍀💫",
      "Sua sorte está nas estrelas hoje. Não tenha medo de sonhar alto! ✨🚀",
      "Dia perfeito para tentar algo novo. O universo está a seu favor! 🌌💖",
      "Tudo conspira a seu favor. Aproveite cada oportunidade! 🍀🪐",
      "Você está brilhando! Nada pode te parar hoje. 🌟💪",
      "A sorte está escancarando portas pra você. Entre com fé! 🚪🍀",
      "É o seu momento! A energia ao seu redor é de conquista. 🔥✨",
      "Os ventos da sorte estão soprando forte no seu caminho! 🌬️🍀",
      "Você está imbatível hoje. Confie no seu poder! 💥🍀",
      "Hoje é o seu dia de vitória! Vá e vença! 🏆🌈"
    ];
    return mensagens[Math.floor(Math.random() * mensagens.length)];
  }

  if (valor >= 70) {
    const mensagens = [
      "Seu dia está com boas vibrações! Confie no seu potencial. 🌟",
      "A sorte está a seu favor, use isso com sabedoria! 🔮💫",
      "O caminho está claro, e sua energia é positiva! 🌞✨",
      "Hoje é um bom dia para decisões importantes. Você tem sorte do seu lado! 🍀🧭",
      "Sinta a positividade ao seu redor. Ela é real! 💚🌈",
      "Nada resiste a uma mente positiva e determinada. Vá com tudo! 💥🚀",
      "Seu brilho interior está atraindo coisas boas. Aproveite! 🌟💖",
      "Você está cercado de boas energias. Mantenha o foco! 🌀💚",
      "Hoje é dia de sorrir! A sorte está sorrindo com você. 😄🍀",
      "Com coragem e fé, você vai longe. E a sorte está te impulsionando! 🔝🔥"
    ];
    return mensagens[Math.floor(Math.random() * mensagens.length)];
  }

  if (valor >= 50) {
    const mensagens = [
      "A sorte está razoável... com atitude positiva, tudo melhora! 💪😊",
      "Não está ruim, mas pode melhorar — siga firme! 💥🍀",
      "Hoje pode ser um bom dia, se você acreditar nisso! 🌞🌀",
      "Com um pouco de fé, tudo pode se transformar. 💫💛",
      "A sorte está ali, te observando... chame por ela! 🙌🍀",
      "Você está no caminho certo, continue com coragem! 🛤️🔥",
      "Dias medianos também trazem grandes aprendizados. 🌿🧠",
      "Sua determinação pode fazer esse dia brilhar! 🌞💥",
      "Você tem mais força do que imagina. Confie! 🧡💪",
      "Sorte vem e vai, mas sua atitude fica. Faça valer a pena! 🚀✨"
    ];
    return mensagens[Math.floor(Math.random() * mensagens.length)];
  }

  if (valor >= 30) {
    const mensagens = [
      "Nem tudo depende da sorte... mas depende de você seguir em frente com fé! 🙏🔥",
      "A sorte pode estar dormindo, mas sua fé pode acordá-la. ✨🛏️",
      "Dias nublados também preparam arcos-íris. 🌧️🌈",
      "Mesmo quando tudo parece parado, você está evoluindo! 🐢💪",
      "Não pare! Mesmo com pouca sorte, sua força é imensa. 🧗‍♀️🍀",
      "Lembre-se: até nos dias difíceis, você pode plantar coisas boas. 🌱💚",
      "Acredite no processo. A sorte voltará! 🔄🍀",
      "Seu esforço é o que mais conta hoje. Continue! 🛤️💥",
      "Você já venceu outras batalhas — essa será só mais uma! ⚔️💛",
      "Coragem é mais poderosa que sorte. E você tem isso de sobra! 🦁💫"
    ];
    return mensagens[Math.floor(Math.random() * mensagens.length)];
  }

  const mensagens = [
    "Hoje a sorte está tímida, mas não desanime. Grandes milagres acontecem nos dias comuns. 🌈💛",
    "Sorte baixa, mas fé alta muda qualquer cenário! ✝️🔥",
    "Às vezes a sorte se esconde para testar sua persistência. Continue! 🏃‍♀️🍀",
    "Mesmo em dias difíceis, há beleza no caminho. 🌧️🌸",
    "Amanhã será melhor, mas hoje você pode ser forte. 💪💛",
    "A sorte te observa em silêncio... e torce por você! 👀🍀",
    "O céu escuro é onde as estrelas mais brilham. ✨🌌",
    "Você já passou por coisas piores — e venceu. Vai passar por essa também! 🛡️🔥",
    "Os maiores milagres surgem quando menos esperamos. 💫🙌",
    "Você é maior do que qualquer número de sorte. Confie em você! 🧠❤️"
  ];
  return mensagens[Math.floor(Math.random() * mensagens.length)];
}

function gerarSorteUnica() {
  const valor = Math.floor(Math.random() * 101);
  const mensagem = gerarMensagem(valor);
  return `🍀 Sua sorte hoje é: ${valor}%\n${mensagem}`;
}

module.exports = { gerarSorteUnica };