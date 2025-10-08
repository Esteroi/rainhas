import json

# Lê o JSON com participantes
with open('participantes.json', 'r', encoding='utf-8') as f:
    participantes = json.load(f)

# Abre o TXT para sobrescrever e escrever todos os participantes
with open('participantes_formatados.txt', 'w', encoding='utf-8') as f:
    for p in participantes:
        linha = f"{p['nome']} - {p['numero']} - {p['plataforma']}\n"
        f.write(linha)

print("Arquivo TXT criado com todos os participantes do JSON, duplicatas incluídas.")