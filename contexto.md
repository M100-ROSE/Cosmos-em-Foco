# Contexto do Projeto — Cosmos em Foco

Blog de astronomia em React 18 (Create React App), com CSS puro e design
"aconchego cósmico". Este arquivo registra preferências, estado atual e o
histórico de entregas, para que nada se perca entre sessões.

---

## Preferências

- Idioma de trabalho e documentação: **português do Brasil**.
- Stack fixa: **React 18 / CRA** + **CSS puro**. Sem Tailwind, sem framework de
  UI, sem dependências novas sem autorização explícita.
- `src/styles/tokens.css` é a fonte da verdade dos tokens de design; o
  documento `design-layout-blog-astronomia.md` é a referência de layout.
- Especificações de design ficam em `docs/design-spec.md`; contratos de dados em
  `src/data/CONTRATO.md`.
- Commits curtos no padrão `tipo: descrição` (`feat:`, `fix:`, `docs:`,
  `refactor:`, `chore:`, `style:`, `test:`), um assunto por commit.
- Não usar `--force`, `reset --hard`, `clean -fd` nem reescrever histórico.
- Não commitar segredos, `.env`, `node_modules` ou artefatos de build.

---

## Estado atual

- **Branch:** `main` — remoto `origin` = `https://github.com/M100-ROSE/Cosmos-em-Foco.git`.
- **Estrutura de código:**
  - `src/App.jsx`, `src/index.js`
  - `src/components/Header/Header.jsx`, `src/components/Posts/HeroPost.jsx`,
    `src/components/Posts/PostCard.jsx`, `src/components/Shared/SearchBar.jsx`
  - `src/data/posts.js`, `src/data/samplePosts.js`, `src/data/categories.js`,
    `src/data/CONTRATO.md`
  - `src/services/postsApi.js`
  - `src/styles/global.css`, `src/styles/tokens.css`
  - `src/utils/formatDate.js`
  - `public/index.html`
- **Documentação:** `docs/design-spec.md` (especificação de design),
  `design-layout-blog-astronomia.md` (referência de layout) e os briefings do
  site: `briefing-site.txt` (completo, 118 perguntas) e `briefing-simples.txt`
  (versão simplificada, 33 perguntas).
- **Pendência estrutural conhecida:** o repositório tem **19.097 arquivos de
  `node_modules` versionados**. O `.gitignore` com a linha `node_modules` existe
  no disco mas ainda **não está commitado**, por isso não tem efeito. Isso
  polui o `git status` e precisa de decisão do time (provavelmente
  `git rm -r --cached node_modules` + commit do `.gitignore`).

---

## Histórico

### 2026-10-26 — Questionário de briefing para o site

**Solicitação original:** registrar no Git o novo arquivo de briefing criado
pela Day, sem tocar em código, em `src/` ou em `public/`.

**O que foi feito:**

1. `git status` inspecionado: `briefing-site.txt` confirmado como novo; o
   arquivo estava acompanhado de outras alterações pré-existentes
   (`node_modules/`, `package.json`, `src/styles/tokens.css` e arquivos ainda
   não rastreados como `.gitignore`, `docs/`, `package-lock.json`,
   `src/data/`, `src/services/`, `src/utils/`), que **não** foram incluídas
   neste commit.
2. Conteúdo validado: 31.251 bytes, 30.795 caracteres, UTF-8 válido sem BOM,
   118 perguntas numeradas em 13 seções, texto puro em pt-BR.
3. `contexto.md` criado (não existia) registrando preferências, estado atual do
   projeto e esta entrega.

**Arquivos alterados:**

- `briefing-site.txt` (novo) — questionário de briefing para site, 118
  perguntas em 13 seções, texto puro UTF-8.
- `contexto.md` (novo) — este arquivo de contexto.

**Pendências:**

- [ ] Preencher o `briefing-site.txt` com as respostas do cliente (Day).
- [ ] Decidir o que fazer com os 19.097 arquivos de `node_modules` versionados:
      remover do índice e commitar o `.gitignore`.
- [ ] Commitar (ou descartar conscientemente) as alterações pendentes fora
      deste commit: `package.json`, `src/styles/tokens.css`, `package-lock.json`,
      `docs/`, `src/data/`, `src/services/`, `src/utils/`.
- [ ] Revisar os arquivos de `node_modules` que aparecem como modificados ou
      deletados no `git status` (possível instalação parcial ou limpeza local).

---

### 2026-10-26 - Versão simplificada do briefing de site (33 perguntas)

**Solicitação original:** registrar no Git a versão simplificada do briefing
criada pela Day, sem tocar em código, `src/`, `docs/`, `node_modules` ou no
`briefing-site.txt`.

**O que foi feito:**

1. `git status` e `git diff` inspecionados antes de qualquer ação: as alterações
   em `node_modules/`, `package.json` e `src/styles/tokens.css`, além dos itens
   ainda não rastreados (`.gitignore`, `docs/`, `package-lock.json`, `src/data/`,
   `src/services/`, `src/utils/`), são pré-existentes e **ficaram fora** deste
   commit.
2. `briefing-simples.txt` validado: 6.693 bytes, UTF-8 sem BOM, quebras LF,
   pt-BR, 33 perguntas numeradas distribuídas em 6 seções (Objetivo; Público e
   Conteúdo; Identidade Visual; Estrutura e Funcionalidades; Técnico e SEO;
   Prazo, Orçamento e Aprovação). O resumo do time confere com o arquivo real.
3. Registro desta entrega no histórico e menção aos dois briefings (completo com
   118 perguntas e simplificado com 33) no Estado atual.

**Arquivos alterados:**

- `briefing-simples.txt` (novo) - versão simplificada do briefing, 33 perguntas
  em 6 seções, texto puro UTF-8.
- `contexto.md` (modificado) - nova entrada de histórico e atualização da seção
  de documentação.

**Pendências:**

- [ ] Preencher as respostas do `briefing-simples.txt` (e do briefing completo,
      se necessário) com a Day.
- [ ] Remover os 19.097 arquivos de `node_modules` do índice e commitar o
      `.gitignore` que já existe no disco.
- [ ] Commitar (ou descartar conscientemente) as alterações pendentes fora
      deste commit: `package.json`, `package-lock.json`,
      `src/styles/tokens.css`, `docs/`, `src/data/`, `src/services/`,
      `src/utils/`.

---

## Modelo para novas entradas

```markdown
### AAAA-MM-DD — Título curto da tarefa

**Solicitação original:** (o que foi pedido, em uma ou duas frases)

**O que foi feito:**

1. ...
2. ...

**Arquivos alterados:**

- `caminho/do/arquivo` (novo | modificado | removido) — o que mudou.

**Pendências:**

- [ ] ...
- [ ] ...
```

> Nunca apague entradas antigas do histórico; apenas acrescente novas.
