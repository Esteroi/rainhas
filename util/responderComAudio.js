const { MessageMedia } = require('whatsapp-web.js');
const fs = require('fs');

async function responderComAudio(client, message, nomeArquivo) {
  try {
    const audio = fs.readFileSync(nomeArquivo);
    const media = new MessageMedia('audio/mp3', audio.toString('base64'));
    await client.sendMessage(message.from, media, { sendAudioAsVoice: true });
    console.log(`✅ Áudio enviado: ${nomeArquivo}`);
  } catch (error) {
    console.error("Erro ao responder com áudio:", error);
  }
}

module.exports = responderComAudio;