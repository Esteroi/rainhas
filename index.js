const { Client, LocalAuth, MessageMedia } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const fs = require("fs");
const fsp = fs.promises;
const path = require("path");

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
const { iniciarWatchParticipantes } = require("./watchParticipantes");
const { mensagemPlataformas, mensagemPlataformasParaDicas } = require('./util/plataformas');

const GRUPO_ALVO_ID = "120363417960334632@g.us";

const arquivoLista = path.join(__dirname, 'desafiolista.txt');
const PARTICIPANTES_PATH = path.join(__dirname, "participantes.json");
const participantesFormatadosPath = path.join(__dirname, "participantes_formatados.txt");
const dadosJogosPath = path.join(__dirname, "dados_jogos.json");

let dadosJogos = {};
let perguntaAtual = null;
let respondida = true;
let candidatoAcao = null;

iniciarWatchParticipantes();

// -------------------- FUNÇÕES AUXILIARES --------------------
async function carregarDadosJogos() {
  try {
    const rawData = await fsp.readFile(dadosJogosPath, "utf8");
    dadosJogos = JSON.parse(rawData);
    console.log("📊 Dados dos jogos carregados com sucesso!");
  } catch (error) {
    console.error("❌ Erro ao carregar dados_jogos.json:", error);
    console.log("O bot continuará funcionando, mas o comando !horarios pode não funcionar corretamente.");
  }
}

async function carregarParticipantes() {
  try {
    const data = await fsp.readFile(PARTICIPANTES_PATH, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    if (err.code === 'ENOENT') return [];
    console.error("Erro ao carregar participantes:", err);
    return [];
  }
}

async function salvarParticipantes(participantes) {
  try {
    await fsp.writeFile(PARTICIPANTES_PATH, JSON.stringify(participantes, null, 2), 'utf8');
  } catch (err) {
    console.error("Erro ao salvar participantes:", err);
  }
}

async function enviarHorariosJogos(chat, horarioAlvo, horarioAtual) {
  if (!dadosJogos) {
    await chat.sendMessage("❌ Dados dos jogos não estão disponíveis no momento.");
    return;
  }

  const jogosDaHora = dadosJogos[horarioAlvo];
  if (!jogosDaHora) {
    await chat.sendMessage(`😕 Nenhum dado de horário encontrado para as ${horarioAlvo}.`);
    return;
  }

  const listaFormatada = Object.entries(jogosDaHora).map(([nome, minutos]) => ({
    nome,
    minutos,
  }));

  const mensagem = formatarMinutosPagantes(horarioAlvo, horarioAtual, listaFormatada);
  await chat.sendMessage(mensagem);
}

// -------------------- FUNÇÕES DE ENVIO AUTOMÁTICO --------------------
function iniciarVerificacaoAutomatica(client) {
  let ultimaHoraEnviadaPlataformas = null;
  const horariosEnviados = new Set();

  setInterval(async () => {
    const agora = new Date();
    const horaAtual = agora.getHours();

    if (horaAtual >= 7 && horaAtual <= 22 && agora.getMinutes() === 30 && horaAtual !== ultimaHoraEnviadaPlataformas) {
      try {
        const chat = await client.getChatById(GRUPO_ALVO_ID);
        await chat.sendMessage(mensagemPlataformas());
        console.log(`📢 Mensagem automática de plataformas enviada às ${horaAtual}:30`);
        ultimaHoraEnviadaPlataformas = horaAtual;
      } catch (err) {
        console.error("Erro ao enviar mensagem automática das plataformas:", err);
      }
    }
  }, 60 * 1000);

  setInterval(async () => {
    const agora = new Date();
    if (agora.getHours() < 7 || agora.getHours() >= 23) return;

    for (const horario of Object.keys(dadosJogos)) {
      const [hora, minuto] = horario.split(":").map(Number);
      let horarioJogo = new Date(agora);
      horarioJogo.setHours(hora, minuto, 0, 0);

      const horarioAlvo = new Date(horarioJogo.getTime() - 5 * 60000);

      if (agora >= horarioAlvo && agora < new Date(horarioAlvo.getTime() + 2 * 60000)) {
        if (!horariosEnviados.has(horario)) {
          try {
            const chat = await client.getChatById(GRUPO_ALVO_ID);
            const horaAtualFormatada = agora.toTimeString().slice(0, 5);
            await enviarHorariosJogos(chat, horario, horaAtualFormatada);
            console.log(`📢 Mensagem automática enviada 5 minutos antes de ${horario}`);
            horariosEnviados.add(horario);
          } catch (err) {
            console.error("Erro ao enviar mensagem automática:", err);
          }
        }
      } else if (horariosEnviados.has(horario) && agora > horarioJogo) {
        horariosEnviados.delete(horario);
      }
    }
  }, 60 * 1000);
}

function iniciarEnvioAutomaticoDicas(client) {
  let ultimoMinutoEnviado = null;

  setInterval(async () => {
    const agora = new Date();
    const minutos = agora.getMinutes();

    if (minutos % 40 === 0 && minutos !== ultimoMinutoEnviado && agora.getHours() >= 7 && agora.getHours() <= 22) {
      try {
        const chat = await client.getChatById(GRUPO_ALVO_ID);
        const textoFixo = "👑 *Dica da RAINHA DA SORTE* 👑\nAnote e use com sabedoria:";
        const mensagemCompleta = `${textoFixo}\n\n${obterDicaAleatoria()}\n\n${mensagemPlataformasParaDicas()}`;
        await chat.sendMessage(mensagemCompleta);
        console.log(`📢 Mensagem automática de dicas enviada às ${agora.toTimeString().slice(0,5)}`);
        ultimoMinutoEnviado = minutos;
      } catch (err) {
        console.error("Erro ao enviar mensagem automática de dicas:", err);
      }
    }
  }, 60 * 1000);
}

// -------------------- FUNÇÃO DE TRATAMENTO DE MENSAGENS --------------------
async function tratarMensagem(client, message) {
  const chat = await message.getChat();
  if (!message.body || typeof message.body !== "string") return;
  const corpo = message.body.toLowerCase().trim();
  const contact = await message.getContact();

  console.log("Mensagem recebida:", corpo);

  function isAdmin() {
    if (!chat.isGroup) return false;
    const autorId = (contact && contact.id && contact.id._serialized)
      ? contact.id._serialized
      : (message.author || message.from);
    const adminIds = chat.participants
      .filter(p => p.isAdmin)
      .map(p => p.id._serialized);
    return adminIds.includes(autorId);
  }

  // -------------------- COMANDO !EXPULSAR --------------------
  if (corpo.startsWith('!expulsar')) {
    if (!chat.isGroup) return;
    if (!isAdmin()) {
      await chat.sendMessage('❌ Apenas administradores podem usar este comando.');
      return;
    }
    const mentionedIds = message.mentionedIds;
    if (!mentionedIds || mentionedIds.length === 0) {
      await chat.sendMessage('⚠️ Por favor, mencione um usuário para expulsar.');
      return;
    }
    const adminIds = chat.participants
      .filter(p => p.isAdmin)
      .map(p => p.id._serialized);
    const expulsar = mentionedIds.filter(id => !adminIds.includes(id));
    if (expulsar.length === 0) {
      await chat.sendMessage('⚠️ Todos os usuários mencionados são administradores. O bot não pode expulsá-los.');
      return;
    }
    try {
      await chat.removeParticipants(expulsar);
      await chat.sendMessage('🚷 Usuário(s) expulso(s) com sucesso.');
    } catch (err) {
      console.error('Erro ao expulsar participante:', err);
      await chat.sendMessage('❌ Não foi possível expulsar o usuário. Verifique se o bot é admin.');
    }
    return;
  }

  // -------------------- COMANDO !MARCARTODOS --------------------
  if (corpo.startsWith("!marcartodos")) {
    const textoOriginal = message.body.slice("!marcartodos".length).trim();
    const mensagemFormatada = textoOriginal.length > 0 ? textoOriginal : "📣 *Mensagem para todos.*";

    try {
      const mentions = chat.participants.map(p => p.id._serialized);
      let media = null;
      if (message.hasMedia) media = await message.downloadMedia();

      try { await message.delete(true); } catch {}
      if (media) {
        await chat.sendMessage(media, { caption: mensagemFormatada, mentions: mentions.map(id => ({ id })) });
      } else {
        await chat.sendMessage(mensagemFormatada, { mentions: mentions.map(id => ({ id })) });
      }

    } catch (err) {
      console.error("❌ Erro ao reenviar mensagem com menções:", err);
      await chat.sendMessage("⚠️ Não foi possível reenviar a mensagem para todos.");
    }
    return;
  }

  // -------------------- OUTROS COMANDOS --------------------
  if (corpo === "!dica") {
    const textoFixo = "👑 *Dica da RAINHA DA SORTE* 👑\nAnote e use com sabedoria:";
    const mensagemCompleta = `${textoFixo}\n\n${obterDicaAleatoria()}\n\n${mensagemPlataformasParaDicas()}`;
    await client.sendMessage(message.from, mensagemCompleta);
    return;
  }

  if (corpo === "!motiva") {
    const frase = pegarAleatoria();
    await message.reply(`💡 Mensagem motivacional:\n\n${frase}`);
    return;
  }

  if (corpo === "!ajuda" || corpo === "!comandos") {
    await enviarAjuda(chat);
    return;
  }

  if (corpo === "!adms") {
    await chat.sendMessage(gerarMensagemContatos());
    return;
  }

  if (/bo+m+ *di+a+/i.test(corpo) || /bo+a+ *ta+r+d+e+/i.test(corpo) || /bo+a+ *noi+t+e+/i.test(corpo)) {
    const saudacao = obterSaudacao(corpo);
    await message.reply(saudacao);
    return;
  }

  switch (corpo) {
    case "!links":
      await chat.sendMessage(linksPorcentagem);
      return;
    case "!sorte":
      await message.reply(gerarSorteUnica());
      return;
    case "!plataformas":
      await chat.sendMessage(mensagemPlataformas());
      return;
    case "!promo":
      await chat.sendMessage(mensagemPromocoes());
      return;
    case "!participantes":
      try {
        const conteudo = await fsp.readFile(participantesFormatadosPath, "utf8");
        const resposta = `📋 *Participantes confirmados para o sorteio do fim do mês:*\n\n${conteudo}`;
        await chat.sendMessage(resposta);
      } catch (err) {
        console.error("❌ Erro ao ler participantes_formatados.txt:", err);
        await chat.sendMessage("⚠️ Erro ao carregar a lista de participantes.");
      }
      return;
    case "!sortear2":
      const participantes = await carregarParticipantes();
      if (participantes.length < 2) {
        await chat.sendMessage("❗ Não há participantes suficientes para realizar o sorteio de dois nomes.");
        return;
      }
      const embaralhados = participantes.sort(() => 0.5 - Math.random());
      const [sorteado1, sorteado2] = embaralhados;
      await chat.sendMessage(`🎉 Sorteio realizado!\n\n🥇 *${sorteado1.nome}* (${sorteado1.numero} - ${sorteado1.plataforma})\n🥈 *${sorteado2.nome}* (${sorteado2.numero} - ${sorteado2.plataforma})\n\nParabéns aos vencedores! 🍀`);
      return;
  }

  if (corpo.startsWith("!biblia")) {
    const versiculoAleatorio = versiculos[Math.floor(Math.random() * versiculos.length)];
    await message.reply(`📖 Versículo do dia:\n\n${versiculoAleatorio}`);
    return;
  }

  if (corpo.startsWith("!desafio")) {
    const partes = message.body.trim().split(" ");
    if (partes.length < 3) {
      await chat.sendMessage("⚠️ Formato inválido. Use: !desafio NomeDoDesafio Valor\nEx: !desafio Mega Sorteio R$ 50,00");
      return;
    }
    const valorRaw = partes.pop();
    const nomeDesafio = partes.slice(1).join(" ");
    const valorLimpo = valorRaw.replace("R$", "").replace(",", ".").trim();
    const valor = parseFloat(valorLimpo);
    if (isNaN(valor)) {
      await chat.sendMessage("⚠️ Valor inválido. Use um valor monetário. Ex: R$ 50,00");
      return;
    }
    const valorFormatado = `R$ ${valor.toFixed(2).replace(".", ",")}`;
    const data = new Date();
    const linhaLista = `Nome: ${nomeDesafio} - Valor: ${valorFormatado} - Criado em: ${data.toISOString()}\n`;

    try {
      await fs.appendFile(arquivoLista, linhaLista, "utf8");
      const mensagem = `🎯 *Desafio Criado!*\n\n📌 Nome: *${nomeDesafio}*\n💸 Valor: *${valorFormatado}*\n\nParticipe e mostre sua sorte!`;
      await chat.sendMessage(mensagem);
    } catch (err) {
      console.error("Erro ao salvar desafio:", err);
      await chat.sendMessage("❌ Ocorreu um erro ao salvar o desafio.");
    }
    return;
  }

  if (corpo === "!curiosidade") {
    const piada = piadas[Math.floor(Math.random() * piadas.length)];
    const mensagemFormatada = `😂 *JOGOS PARA O GRUPO* 😂\n\n🌟 _Você conhece este jogo?_\n\n📌 *${piada}*\n\n*Volatilidade* significa a tendência de algo mudar rapidamente e de forma imprevisível. \n\n🔁 Envie *!curiosidade* para receber outra!`;
    await chat.sendMessage(mensagemFormatada);
    return;
  }

  if (corpo.startsWith("!horarios")) {
    const partes = corpo.split(" ");
    if (partes.length < 2) {
      await chat.sendMessage("❗ Use o comando assim: !horarios HH:mm");
      return;
    }
    const horario = partes[1];
    const regexHora = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if (!regexHora.test(horario)) {
      await chat.sendMessage("❗ Formato inválido! Use HH:mm (ex: 20:30).");
      return;
    }
    const horaAtual = new Date().toTimeString().slice(0, 5);
    await enviarHorariosJogos(chat, horario, horaAtual);
    return;
  }
} // <-- FECHA a função tratarMensagem


// -------------------- FUNÇÃO PARA INICIAR O BOT --------------------

    const client = new Client({
        authStrategy: new LocalAuth(),
        puppeteer: { headless: true }
    });

    // QR Code
    client.on('qr', (qr) => {
        qrcode.generate(qr, { small: true });
        console.log("📲 Escaneie o QR Code para conectar.");
    });

    // Bot pronto
    client.on('ready', async () => {
        console.log("✅ Bot WhatsApp pronto!");
        await carregarDadosJogos();

        iniciarVerificacaoAutomatica(client);
        iniciarEnvioAutomaticoDicas(client);
    });

    // Recebimento de mensagens
    client.on("message", async (message) => {
        try {
            await tratarMensagem(client, message);
        } catch (err) {
            console.error("Erro no tratamento da mensagem:", err);
        }
    });

    // Boas-vindas
    client.on('group_join', async (notification) => {
        try {
            const chat = await notification.getChat();
            const contact = await notification.getContact();
            const nomeUsuario = contact.pushname || contact.number || "novo membro";

            const mensagem = mensagemBoasVindas(nomeUsuario, chat.name);

            await chat.sendMessage(mensagem, { mentions: [contact] });
            console.log(`👑 Mensagem de boas-vindas enviada para ${nomeUsuario}`);
        } catch (err) {
            console.error("❌ Erro ao enviar mensagem de boas-vindas:", err);
        }
    });

    // Inicializa o client
    await client.initialize();
}

// -------------------- CHAMA O BOT --------------------
iniciarBot();
