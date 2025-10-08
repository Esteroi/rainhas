const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// Cria o client com LocalAuth personalizado
const client = new Client({
    authStrategy: new LocalAuth({
        clientId: "bot-rainhas" // nome único da sessão
    }),
    puppeteer: {
        headless: false, // Headful evita bloqueios em redes corporativas
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--single-process',
            '--disable-gpu'
        ]
    },
    takeoverOnConflict: true, // força reconexão se a sessão estiver ativa em outro lugar
    takeoverTimeoutMs: 5000
});

// Evento QR code
client.on('qr', (qr) => {
    console.log('📲 QR code gerado (escaneie com o WhatsApp)');
    qrcode.generate(qr, { small: true });
});

// Evento quando o client está pronto
client.on('ready', () => {
    console.log('✅ Bot iniciado!');
});

// Evento de mensagens
client.on('message', async (message) => {
    // Comando só funciona no grupo "Rainhas da Sorte"
    if (message.body.toLowerCase() === '!marcartodos' && message.from.endsWith('@g.us')) {
        const chat = await message.getChat();

        if (chat.isGroup && chat.name.toLowerCase() === 'rainhas da sorte') {
            const participantes = chat.participants;

            if (!participantes || participantes.length === 0) {
                await chat.sendMessage('⚠️ Não foi possível obter a lista de participantes.');
                return;
            }

            // Mensagem de marcação
            const menções = participantes.map(p => `@${p.id.user}`).join(' ');
            await chat.sendMessage(`🚨 Atenção, todas foram marcadas! 👑\n${menções}`, {
                mentions: participantes.map(p => p.id)
            });

            console.log(`👑 ${participantes.length} participantes marcados no grupo "${chat.name}".`);
        }
    }
});

// Evento de desconexão
client.on('disconnected', (reason) => {
    console.log(`⚠️ Bot desconectado: ${reason}`);
    console.log('♻️ Tentando reconectar em 5s...');
    setTimeout(() => client.initialize(), 5000);
});

// Inicializa o client
client.initialize();