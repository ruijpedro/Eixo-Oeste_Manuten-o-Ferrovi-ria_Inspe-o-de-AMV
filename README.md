# Eixo Oeste — Manutenção Ferroviária — Inspeção AMV

Autor: RJP

Projeto inicial da app de inspeção de Aparelhos de Mudança de Via (AMV), com filosofia EBTCC e abertura vertical por secções.

## Inclui
- PWA funcional em `index.html`
- Cabeçalho com Autor: RJP
- Logótipo RJP AMV inspirado no portachaves / linguagem ferroviária
- Formulário vertical por blocos
- Guardar localmente no telemóvel/browser
- Exportar JSON
- Gerar PDF por impressão
- Pasta `templates` com os ficheiros Excel enviados
- Base para futura sincronização Google Sheets / Drive

## Como testar
1. Abre `index.html` no browser.
2. Ou usa GitHub Codespaces / VS Code:
   ```bash
   npm install
   npm run start
   ```

## Próxima fase
- Mapear 1:1 os campos reais dos templates Excel.
- Gerar PDF igual ao modelo oficial.
- Exportar Excel preenchido.
- Ligar Google Sheets/Drive.
- Criar pacote Android via Capacitor.
