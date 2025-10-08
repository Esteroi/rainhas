const fs = require('fs').promises;
const path = require('path');
const { gerarAudio } = require('./audio'); // função de gerar áudio que você já tem
const { responderComAudio } = require('./responderComAudio');
const { carregarParticipantes } = require('./participantes');

const arquivoLista = path.join(__dirname, '..', 'desafiolista.txt');

async function criarDesafio(client, chat, nomeJogo, valorRaw, plataformaGeral) {
    const valor = parseFloat(valorRaw.replace("R$", "").replace(",", ".").trim());
    if (isNaN(valor)) {
        await chat.sendMessage("⚠️ Valor inválido. Use um valor monetário. Ex: R$ 50,00");
        return;
    }
    const valorFormatado = `R$ ${valor.toFixed(2).replace(".", ",")}`;
    const data = new Date();
    const linhaLista = `Nome: ${nomeJogo} - Valor: ${valorFormatado} - Criado em: ${data.toISOString()}\n`;

    try {
        // Salva no arquivo
        await fs.appendFile(arquivoLista, linhaLista, "utf8");

        // Carrega participantes
        const participantes = await carregarParticipantes();
        const listaParticipantes = participantes.length > 0
            ? participantes.map(p => `• ${p.nome} - Valor: ${p.valor || "não informado"}`).join("\n")
            : "Nenhum participante registrado ainda.";

        // Mensagem final para o grupo
        const mensagem = `🎯 *Desafio Criado!*\n\n📌 Nome do Jogo: *${nomeJogo}*\n💸 Valor: *${valorFormatado}*\n\n📋 *Participantes atuais:*\n${listaParticipantes}\n\n💡 Participe do desafio usando a plataforma: *${plataformaGeral}* e mostre sua sorte!`;

        await chat.sendMessage(mensagem);

        // Áudio TTS
        const textoAudio = `Atenção, pessoal! Um novo desafio foi criado: ${nomeJogo}, no valor de ${valorFormatado}. Venham participar usando a plataforma ${plataformaGeral}!`;
        const nomeArquivoAudio = "desafio.mp3";

        await gerarAudio(textoAudio, nomeArquivoAudio);
        await responderComAudio(client, chat, nomeArquivoAudio);

    } catch (err) {
        console.error("Erro ao salvar desafio:", err);
        await chat.sendMessage("❌ Ocorreu um erro ao salvar o desafio.");
    }
}

module.exports = { criarDesafio };