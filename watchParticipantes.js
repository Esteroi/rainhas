const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const PARTICIPANTES_PATH = path.join(__dirname, "participantes.json");

function iniciarWatchParticipantes() {
  fs.watch(PARTICIPANTES_PATH, (eventType, filename) => {
    if (eventType === "change") {
      console.log(`Arquivo ${filename} foi modificado. Gerando TXT...`);

      exec("python gera_txt.py", (error, stdout, stderr) => {
        if (error) {
          console.error(`Erro ao executar script Python: ${error.message}`);
          return;
        }
        if (stderr) {
          console.error(`Stderr: ${stderr}`);
          return;
        }
        console.log(`Script Python executado com sucesso:\n${stdout}`);
      });
    }
  });
}

module.exports = { iniciarWatchParticipantes };