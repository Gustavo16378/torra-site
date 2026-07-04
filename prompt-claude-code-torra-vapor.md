# PROMPT CLAUDE CODE — TORRA. (Variação VAPOR) — Implementação fiel

Implemente o site one-page **TORRA.** a partir do protótipo aprovado (variação "VAPOR" — dark contínuo, linguagem de filme). Fidelidade ao protótipo é prioridade máxima: valores exatos de cor, tipografia, espaçamento e timing estão especificados abaixo.

## Stack
- React 19 + Vite + TypeScript + Tailwind CSS v4 + Lucide React
- Deploy: Cloudflare Pages (`npm run build` → `dist/`)
- Sem libs de animação — tudo com CSS + IntersectionObserver nativo

## Conceito
Site = sequência contínua de filme. 100% dark (#120d09), o creme (#f2ece1) só existe na tipografia. Cada seção é uma "CENA" numerada com marcador. Mídia fullbleed em TODAS as seções com Ken Burns perpétuo. Fades escuros (mask-image) costurando as seções. Grain animado por cima de tudo.

---

## DESIGN TOKENS

```
Cores:
--ink:        #120d09   (fundo dominante, marrom-preto — NUNCA #000)
--ink-deep:   #0b0705   (footer)
--cream:      #f2ece1   (tipografia display, textos)
--gold:       #c9973f   (acentos: ponto do logo, labels de cena, preços, link ativo)

Tipografia (Google Fonts):
--font-display: 'Anton'   (weight 400, sempre UPPERCASE, letter-spacing -0.01em a -0.015em)
--font-text:    'Archivo' (weights 300/400/500/600/700)

Labels padrão: Archivo 600, 9.5–11px, letter-spacing 0.24em–0.44em, uppercase
Easing global: cubic-bezier(0.16, 1, 0.3, 1) — transições 0.6s a 1s (lentas, cinematográficas)
Padding lateral padrão: clamp(20px, 5vw, 72px)
```

## ASSETS
As 9 imagens estão em `src/assets/` (fornecidas junto com este prompt):
`hero-extracao.jpg`, `manifesto-vapor.jpg`, `menu-espresso.jpg`, `menu-latte.jpg`, `menu-coldbrew.jpg`, `menu-v60.jpg`, `origem-graos.jpg`, `casa-interior.jpg`, `footer-xicara.jpg`

Antes de importar, otimize: converter para WebP com fallback JPEG (vite-imagetools ou script), max-width 1920px. `footer-xicara.jpg` tem 817KB — comprimir agressivo. Todas com `loading="lazy"` exceto a do hero (`loading="eager"` + `fetchpriority="high"`).

---

## ESTRUTURA DE COMPONENTES

```
src/
  components/
    Navbar.tsx          (kit padrão — ver seção NAVBAR)
    SceneMarker.tsx     (marcador "CENA XX · NOME" reutilizável)
    SceneMedia.tsx      (wrapper de mídia fullbleed: img + overlay + mask + ken burns)
    RevealText.tsx      (wrapper de reveal on scroll)
  sections/
    Hero.tsx
    Manifesto.tsx
    Menu.tsx
    Origem.tsx
    Casa.tsx
    Footer.tsx
  hooks/
    useScrollDirection.ts
    useReveal.ts        (IntersectionObserver para reveals)
    useScrollSpy.ts     (link ativo na navbar)
  App.tsx
  index.css             (tokens, keyframes, grain)
```

---

## NAVBAR (kit padrão — NÃO NEGOCIÁVEL)

Aplicar o kit completo, adaptado ao visual do protótipo:
- `useScrollDirection` — esconde ao scrollar pra baixo, mostra ao subir
- Fundo: `linear-gradient(180deg, rgba(18,13,9,0.72), rgba(18,13,9,0))` no topo; quando scrollada, fundo sólido `rgba(18,13,9,0.85)` + `backdrop-filter: blur(8px)`
- `border-b` sempre presente (transparente no topo, `rgba(242,236,225,0.08)` quando scrollada)
- `transition-[transform,background-color,backdrop-filter,border-color]` — NUNCA `transition-all`
- Logo à esquerda: "TORRA" em Anton 22px creme + ponto final em gold
- Links desktop: MENU / ORIGEM / CASA / CONTATO — Archivo 600 11px, tracking 0.3em, cor `rgba(242,236,225,0.75)`, ativo em `#c9973f` (scroll spy com rootMargin `-42% 0px -52% 0px`)
- Mobile (breakpoint 860px): botão hambúrguer de 2 linhas (28px × 2px creme, gap 7px)
- Menu mobile: `ReactDOM.createPortal`, overlay fullscreen `#120d09`, links em Anton `14vw` empilhados, botão FECHAR bordado no canto sup. direito, tagline "O EXAGERO É O PONTO" em gold embaixo
- Scroll lock iOS: `position:fixed + top:-scrollY` no body — NUNCA `overflow:hidden`
- Inline styles no overlay/panel, z-index 9998/9999

---

## EFEITOS GLOBAIS (index.css)

```css
/* Grain de filme — fixed por cima de tudo */
body::after {
  content:""; position:fixed; inset:-60%; z-index:95; pointer-events:none; opacity:.06;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E");
  animation:grain 7s steps(10) infinite;
}
@keyframes grain {0%,100%{transform:translate(0,0)}20%{transform:translate(-2%,3%)}40%{transform:translate(3%,-2%)}60%{transform:translate(-3%,-3%)}80%{transform:translate(2%,2%)}}

/* Ken Burns — alternar kbIn/kbOut entre seções */
@keyframes kbIn  {from{transform:scale(1.02)}to{transform:scale(1.18)}}
@keyframes kbOut {from{transform:scale(1.18)}to{transform:scale(1.03)}}

/* Indicador de scroll do hero */
@keyframes scrollDrop {0%{transform:translateY(-102%)}55%{transform:translateY(0%)}100%{transform:translateY(102%)}}
```

Durações Ken Burns por seção: hero 20s, manifesto 22s, origem 24s, casa 26s, footer 28s — `ease-in-out infinite alternate`.

**Parallax no menu:** o protótipo usa `animation-timeline: view()` (só Chrome). Implementar com progressive enhancement: `@supports (animation-timeline: view())` usa o CSS puro (`@keyframes par {from{translateY(-3.5%)}to{translateY(3.5%)}}`, container com `top:-10%;bottom:-10%`); fallback = sem parallax (Ken Burns já cobre). NÃO implementar parallax via scroll listener em JS.

**Acessibilidade:** `@media (prefers-reduced-motion: reduce)` → desligar grain, Ken Burns, parallax e scrollDrop; reveals viram fade simples.

**SceneMedia (padrão de toda seção):** wrapper `absolute inset-0 overflow-hidden` com `mask-image: linear-gradient(180deg, transparent 0%, #000 10%, #000 90%, transparent 100%)` (+ prefixo -webkit-) — é isso que costura as cenas com fade escuro. Dentro: img `object-fit:cover` com `filter:brightness(0.78–0.88)` + div de overlay em gradiente (valores por seção abaixo).

**SceneMarker:** flex com traço de 30px×1px gold + label Archivo 600 9.5px tracking 0.34em gold, fundo `rgba(18,13,9,0.5)` + `backdrop-filter:blur(6px)`, padding 8px 14px. Posição: absolute top-28px left padrão (no hero: top 96px por causa da navbar).

**Reveals (useReveal):** elementos entram com `opacity:0; translateY(44px)` → `opacity:1; translateY(0)`, transition `1s cubic-bezier(0.16,1,0.3,1)`, threshold 0.12, delays escalonados via prop (0/80/100/120/140/180/240/300ms conforme protótipo). Só aplicar estado inicial se o elemento estiver abaixo de 92% da viewport (evita flash em elementos já visíveis).

---

## SEÇÕES (copy EXATA do protótipo — não alterar textos)

### CENA 01 · ABERTURA (`#hero`) — min-h-screen, centrado
- Mídia: `hero-extracao.jpg`, brightness(0.88) saturate(0.95), kbIn 20s
- Overlay: `linear-gradient(180deg, rgba(18,13,9,0.45), rgba(18,13,9,0.22) 45%, rgba(18,13,9,0.7))` + faixa inferior de 22vh fundindo para #120d09
- Marcador: `CENA 01 · ABERTURA`
- H1: "TORRA" + "." em gold — Anton `clamp(64px, 18vw, 400px)`, line-height 0.92, tracking -0.015em
- Tagline: "O EXAGERO É O PONTO" — Archivo 600 `clamp(10px,1vw,13px)`, tracking 0.44em
- CTA ghost: "VER O MENU" → `#menu` — borda 1px `rgba(242,236,225,0.55)`, padding 17px 36px, tracking 0.32em; hover: fundo creme, texto ink, transition 0.7s
- Indicador de scroll: label "SCROLL" + linha vertical 1px×46px com fio gold animado (scrollDrop 2.4s infinite)

### CENA 02 · MANIFESTO (`#manifesto`) — min-h-[96vh]
- Mídia: `manifesto-vapor.jpg`, brightness(0.8), kbOut 22s, mask 12%/88%
- Overlay horizontal: `linear-gradient(90deg, rgba(18,13,9,0.72), rgba(18,13,9,0.35) 60%, rgba(18,13,9,0.55))`
- H2 (reveal): "CAFÉ NÃO É / DESCULPA PRA CONVERSA. / É O MOTIVO." (quebras nessas posições) — Anton `clamp(42px, 7.2vw, 134px)`, line-height 0.98
- Traço gold 64px×2px (reveal 120ms)
- Parágrafo alinhado à direita, max-w 340px, Archivo 300 14px/1.8 `rgba(242,236,225,0.72)` (reveal 180ms): "Torra própria, extração precisa, zero sutileza. Aqui o café não acompanha nada — ele é a cena inteira, do primeiro ao último frame."

### CENA 03 · QUATRO TOMADAS (`#menu`)
- Título "MENU" cortado pela borda superior: Anton `clamp(120px, 24vw, 460px)`, line-height 0.85, `margin-top: -0.31em` (o corte é proposital), white-space nowrap
- Marcador: `CENA 03 · QUATRO TOMADAS`
- 4 faixas fullwidth (`min-height: clamp(340px, 64vh, 700px)`), cada uma com mask 7%/93%, label "TOMADA 0X" no topo, conteúdo alinhado embaixo (nome à esquerda, preço+descrição à direita):

| Tomada | Nome | Imagem | Preço | Descrição |
|---|---|---|---|---|
| 01 | ESPRESSO | menu-espresso | R$ 8 | "25 segundos de pressão. 30ml de opinião." |
| 02 | LATTE | menu-latte | R$ 14 | "Microespuma de verdade. Desenhado, nunca decorado." |
| 03 | COLD BREW | menu-coldbrew | R$ 16 | "18 horas de infusão a frio. Paciência engarrafada." |
| 04 | V60 | menu-v60 | R$ 18 | "Despejo lento em espiral. O ritual completo, sem atalhos." |

- Nome: Anton `clamp(48px, 8.5vw, 150px)`, line-height 0.95
- Preço: Archivo 700 12px tracking 0.3em gold; descrição: Archivo 300 13px/1.6 `rgba(242,236,225,0.7)`, max-w 320px, alinhada à direita
- Overlay: `linear-gradient(180deg, rgba(18,13,9,0.4), rgba(18,13,9,0.12) 45%, rgba(18,13,9,0.68))`, img brightness(0.82)
- Hover (desktop only): img `scale(1.05)` transition 1s; nome `translateX(22px)` transition 0.9s — via mouseenter/leave no container
- Parallax scroll-driven na img (ver EFEITOS GLOBAIS)

### CENA 04 · ORIGEM (`#origem`) — min-h-screen, centrado vertical
- Mídia: `origem-graos.jpg`, brightness(0.78), kbIn 24s, mask 10%/90%
- Overlay: `linear-gradient(90deg, rgba(18,13,9,0.75), rgba(18,13,9,0.3) 55%, rgba(18,13,9,0.55))`
- Label gold (reveal): "DO CERRADO À XÍCARA"
- H2 (reveal 80ms): "TORRA PRÓPRIA, / TODO DIA." — Anton `clamp(40px, 5.4vw, 100px)`
- Parágrafo (reveal 140ms), max-w 440px: "Grão único do Cerrado Mineiro, colhido maduro e torrado no fundo da casa em lotes pequenos. A gente acompanha da fazenda à moagem — e torra escuro porque gosta, não porque precisa."
- Grid de estatísticas (auto-fit minmax(150px,1fr), border-top `rgba(242,236,225,0.16)`, max-w 820px), números Anton `clamp(56px,7vw,120px)`, labels gold 10px tracking 0.24em, reveals 0/120/240ms:
  - `12` — DIAS DA COLHEITA À TORRA
  - `100%` — ARÁBICA
  - `1` — OBSESSÃO
- Rodapé da seção (reveal 300ms): "FAZENDA SANTA FÉ — CERRADO MINEIRO, MG" em `rgba(242,236,225,0.45)`

### CENA 05 · A CASA (`#casa`) — min-h-screen, conteúdo no rodapé
- Mídia: `casa-interior.jpg`, brightness(0.85), kbOut 26s, mask 10%/92%
- Overlay: `linear-gradient(180deg, rgba(18,13,9,0.4), rgba(18,13,9,0.2) 45%, rgba(18,13,9,0.78))`
- Endereço (reveal): "RUA DO PONTO, 128 — PINHEIROS, SÃO PAULO" — Archivo 500 `clamp(13px,1.2vw,16px)` tracking 0.14em
- H2 (reveal 100ms): "SEG–SÁB · 7H–19H" (o "·" em gold) — Anton `clamp(44px, 7.5vw, 140px)`
- Linha final (reveal 180ms): "SEM RESERVA. SEM PRESSA. SEM DESCAFEINADO." — 10px tracking 0.28em `rgba(242,236,225,0.55)`

### CENA 06 · CRÉDITOS FINAIS (`#contato`, footer) — fundo #0b0705
- Mídia: `footer-xicara.jpg`, opacity 0.4, brightness(0.7), kbIn 28s
- Overlay: `linear-gradient(180deg, #0b0705, rgba(11,7,5,0.55) 45%, rgba(11,7,5,0.85))`
- Marcador: `CENA 06 · CRÉDITOS FINAIS`
- Linha de links (flex wrap, space-between, tracking 0.28em 11px):
  - "INSTAGRAM ↗ @TORRA.CAFE" → https://instagram.com
  - "WHATSAPP ↗ +55 11 98888-0000" → https://wa.me/5511988880000
  - "RUA DO PONTO, 128 — SP" (span, mais apagado)
  - Hover dos links: cor → gold, 0.6s
- Linha divisória: `linear-gradient(90deg, rgba(201,151,63,0.75), rgba(201,151,63,0.1))`, 1px
- Créditos centrados 9px tracking 0.3em: "© 2026 TORRA. TORREFAÇÃO & CAFÉ — FILMADO COM EXAGERO EM SÃO PAULO — FIM."
- **Assinatura de fechamento:** "TORRA." gigante cortado pela borda inferior — container `height: clamp(64px, 13vw, 250px); overflow:hidden`, texto Anton `clamp(120px, 26vw, 500px)` line-height 0.78 centrado, ponto em gold, `aria-hidden="true"`

---

## RESPONSIVO
- Mobile-first, breakpoints só com `min-width`. Breakpoint navbar/hover: 860px.
- Os `clamp()` já resolvem a escala tipográfica — manter os valores exatos (o exagero não pode morrer no mobile: hero continua 18vw).
- Hover de zoom do menu só em desktop (`matchMedia('(min-width: 861px)')` ou media query hover).
- `overflow-x: clip` no body (os títulos cortados vazam).

## PERFORMANCE / QUALIDADE
- `html { scroll-behavior: smooth }`
- Lighthouse alvo: 90+ performance mobile. Grain e Ken Burns são `transform`-only (compositor), ok.
- SEO básico: title "TORRA. — Torrefação & Café", meta description, OG image (usar hero), lang="pt-BR".
- Favicon: "T." nas cores da marca (gerar SVG simples).
- Sem console.logs, sem TODOs. TypeScript estrito.
