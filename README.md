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


## APK Android automático

Este projeto já inclui o workflow:

`.github/workflows/build-apk.yml`

Para gerar a APK:
1. Fazer upload do projeto para o GitHub.
2. Abrir o separador **Actions**.
3. Executar **Build Android APK**.
4. No fim, descarregar o artifact **Eixo_Oeste_AMV_RJP_debug_apk**.

Nome da app: **Eixo Oeste AMV**  
Autor: **RJP**


## Atualização v0.5 — Manutenção Hub / Templates IP

Incluído:
- Imagem técnica `assets/esquema_medicoes_amv_mps.png` nas zonas de medições/MPS.
- Templates Excel adicionados à pasta `templates`.
- Estrutura de dados revista com base nos modelos:
  - IP.MOD.052 AMV
  - IP.MOD.057 Transversais
  - Inspeção UM
  - Inspeção à Via
  - Registo fotográfico
- Campos reforçados para lanças, contra-lanças, cróssima, coxins, fixações, peças isolantes, lubrificação, cotas d/m/y, bitola S, abertura C e guiamento g.


## v0.6 — Imagem IP / Manutenção Hub

Alterações:
- Cores alinhadas com a filosofia Manutenção Hub/IP: verde IP + azul ferroviário.
- Ícone atualizado a partir do pacote `ic_launcher`.
- Logótipo aplicado no cabeçalho, PWA/WebApp e APK.
- Workflow Android: `.github/workflows/build-apk.yml`.
- Workflow WebApp/PWA: `.github/workflows/build-webapp.yml`.

### Gerar WebApp
Ir a **Actions → Build WebApp → Run workflow**.  
O workflow cria o artifact `Eixo_Oeste_AMV_RJP_webapp` e publica em GitHub Pages.

### Gerar APK
Ir a **Actions → Build Android APK → Run workflow**.  
No fim descarregar o artifact `Eixo_Oeste_AMV_RJP_debug_apk`.


## v0.7 — Separador Medições

Incluído:
- Separador **Medições** visível na app e na WebApp.
- Imagem técnica das cotas **S, d, m e y** no topo do separador.
- Campos: Bitola S, Cota d, Cota m, Cota y, Abertura C e Guiamento g.
