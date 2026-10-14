# Cartão digital — Bianca Gonçalves

Página estática de apresentação profissional com prévia Open Graph para compartilhamento e encaminhamento ao WhatsApp.

## Publicação

- Repositório: `christian-goncalves/qr-code-levemente`
- Hospedagem: Vercel
- URL: <https://whatsapp-levemente.vercel.app/>
- A página não usa framework nem exige etapa de build.

## Desenvolvimento local

Sirva a pasta raiz com qualquer servidor HTTP estático e abra `/?preview=1` para visualizar o cartão sem redirecionar. A URL sem esse parâmetro encaminha para o link de conversa configurado em `config.js`.

`config.local.js` é exclusivo da máquina local e não deve ser publicado. O cartão e a imagem Open Graph estão em `assets/`.
