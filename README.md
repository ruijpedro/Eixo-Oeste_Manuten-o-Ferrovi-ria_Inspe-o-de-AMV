# Eixo Oeste — Manutenção Ferroviária — Inspeção AMV

Autor: RJP

Versão v0.3 inicial para arrancar no GitHub.

## Inclui
- PWA funcional em `index.html`
- Separadores AMV, MPS, Medições e Histórico
- Lista de estações da Linha do Oeste
- PK início 21+190 e PK final 191+197
- Templates Excel na pasta `templates`
- Estrutura preparada para APK Android via Capacitor

## Uso rápido
Abrir `index.html` no navegador.

## APK Android
Usar GitHub Codespaces:
```bash
npm install
mkdir -p www
cp index.html manifest.webmanifest service-worker.js www/
cp -r assets src www/
npx cap init "Eixo Oeste AMV" "rjp.eixooeste.amv" --web-dir=www
npx cap add android
npx cap sync android
cd android
./gradlew assembleDebug
```
