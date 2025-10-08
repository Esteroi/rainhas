const gTTS = require('gtts');

function gerarAudio(texto, nomeArquivo = 'mensagem.mp3') {
  return new Promise((resolve, reject) => {
    const gtts = new gTTS(texto, 'pt-br');
    gtts.save(nomeArquivo, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(nomeArquivo);
      }
    });
  });
}

module.exports = gerarAudio;