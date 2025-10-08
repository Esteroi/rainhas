const contatosAdms = {
  ester: {
    nome: "Ester",
    whatsapp: "+55 14 99148-6070",
  },
  kely: {
    nome: "Kely",
    whatsapp: "+55 38 98605-371",
  },
  grupo: {
<<<<<<< HEAD
    whatsapp: "https://chat.whatsapp.com/KWSpSa4AUIT6zfcIEE8AGq",
=======
    whatsapp: "https://chat.whatsapp.com/Bbp41rAWJqC1ZTGk7mkvZi",
>>>>>>> 3312338f92c6eeaadad4b9e9a97a95dd8678e452
    instagram: "https://www.instagram.com/rainhas_da_sorte"
  }
};

function gerarMensagemContatos() {
  return `👑 *RAINHAS DA SORTE* 👑\n` +
         `ADMS RESPONSÁVEIS\n\n` +
         `📌 *Ester*\n` +
         `- WhatsApp: ${contatosAdms.ester.whatsapp}\n\n` +
         `📌 *Kely*\n` +
         `- WhatsApp: ${contatosAdms.kely.whatsapp}\n\n` +
<<<<<<< HEAD
         `📌 *Grupo do WhatsApp*: ${contatosAdms.grupo.whatsapp}\n` +
         `📌 *Instagram*: ${contatosAdms.grupo.instagram}\n\n` +
         `Estamos à disposição! 💖`;
=======
         `📌 *Grupo do WhatsApp*: ${contatosAdms.grupo.whatsapp}\n\n` +
         `📌 *Instagram*: ${contatosAdms.grupo.instagram}\n\n` +
         `*_Estamos à disposição! 💖_*`;
>>>>>>> 3312338f92c6eeaadad4b9e9a97a95dd8678e452
}

module.exports = { contatosAdms, gerarMensagemContatos };