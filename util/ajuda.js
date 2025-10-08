// util/ajuda.js

const mensagemAjuda = `
📚 *Comandos disponíveis no bot:*

📜!adms
💥Envia uma mensagem com o nomes das adms e endereço do grupo

💪🏻 !motiva
📜 Envia uma mensagem motivacional, e enviará mensagens no pv de alguns membros aleatoriamente

✨ !dica
📝 Envia uma dica aleatória acompanhada das plataformas indicadas para apostas.

📖 !biblia
📜 Envia um versículo bíblico do dia (texto).

😂 !curiosidade
🤣 Envia um jogo com dica

🔗 !links
📊 Envia links com porcentagens atualizadas para suas apostas.

🍀 !sorte
🎲 Mostra a sorte do momento com um sorteio único.

🎮 !plataformas
🕹️ Envia uma mensagem com as plataformas disponíveis para jogar.

🎁 !promo
💥 Envia mensagens com promoções exclusivas.

📋 !participantes
👥 Lista os participantes confirmados para o sorteio do fim do mês.

🎉 !sortear2
🏆 Realiza o sorteio de dois participantes vencedores.

⏰ !horarios HH:mm
🗓️ Mostra os jogos programados para o horário e minuto indicados.
Exemplo: !horarios 20:30

🎯 !desafio Nome Valor
💰 Cria um desafio com nome e valor.
Exemplo: !desafio Mega 50

📝 !sorteio <nome> <últimos 4 dígitos> <plataforma>
🎟️ Entra no sorteio do grupo (preencher dados corretamente).

--- 

**PARA os ADMS**

❓ !pergunta (somente admins).
🧠 Inicia uma pergunta de quiz/jogo para o grupo.

🎉 !parabenizar @usuario (somente admins).
👏 Parabeniza o usuário que respondeu corretamente à pergunta.

🛑 !cancelarpergunta (somente admins).
🚫 Cancela a pergunta ativa no momento.

👢 !expulsar @usuario (somente admins).
🚷 Expulsa o usuário mencionado do grupo 

✍️ Digite o comando para executar a ação desejada.
`;

async function enviarAjuda(chat) {
  await chat.sendMessage(mensagemAjuda);
}

module.exports = { enviarAjuda };
