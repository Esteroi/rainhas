// util/rtp.js
const puppeteer = require('puppeteer');

// URLs das páginas com as RTPs dos jogos
const urls = {
  "Pragmatic Play": "https://alibabaslots.org/rtp-live/pragmatic-play/",
  "JDB": "https://alibabaslots.org/rtp-live/jdb/",
  "PG Soft": "https://alibabaslots.org/rtp-live/pg-soft/",
  "Fa Chai": "https://alibabaslots.org/rtp-live/fa-chai/",
  "Microgaming": "https://alibabaslots.org/rtp-live/microgaming/"
};

// Função para buscar as RTPs usando Puppeteer
async function buscarRTPs(url) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  try {
    await page.goto(url, { waitUntil: 'networkidle2' });

    const jogos = await page.evaluate(() => {
      const lista = [];
      document.querySelectorAll('.rtp-row').forEach(el => {
        const nome = el.querySelector('.rtp-cell.name')?.innerText.trim();
        const rtpText = el.querySelector('.rtp-cell.value')?.innerText.trim();
        const rtp = parseFloat(rtpText?.replace('%', ''));

        if (nome && !isNaN(rtp)) {
          lista.push({ nome, rtp });
        }
      });
      return lista;
    });

    return jogos;
  } catch (err) {
    console.error(`Erro ao buscar RTPs de ${url}:`, err.message);
    return [];
  } finally {
    await browser.close();
  }
}

// Função para gerar mensagem já pronta (Top 5 RTPs)
async function gerarMensagemRTP() {
  let mensagem = "🎰 *Top 5 RTPs ao Vivo*\n\n";

  for (const [provedor, url] of Object.entries(urls)) {
    try {
      const jogos = await buscarRTPs(url);

      if (jogos.length > 0) {
        const topJogos = jogos.sort((a, b) => b.rtp - a.rtp).slice(0, 5);

        mensagem += `*${provedor}*\n`;
        topJogos.forEach((jogo) => {
          mensagem += `🎮 ${jogo.nome} - RTP: ${jogo.rtp}%\n`;
        });
        mensagem += "\n";

        console.log(`✅ ${provedor} carregado com ${jogos.length} jogos.`);
      } else {
        mensagem += `⚠️ Nenhum jogo encontrado em ${provedor}.\n\n`;
      }
    } catch (err) {
      mensagem += `❌ Erro ao buscar ${provedor}: ${err.message}\n\n`;
    }
  }

  return mensagem;
}

module.exports = { gerarMensagemRTP };