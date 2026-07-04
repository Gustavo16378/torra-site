# PROMPT CLAUDE CODE — TORRA. — ATUALIZAÇÃO v1 → v2

O site TORRA. já está implementado (React 19 + Vite + TS + Tailwind + Lucide, deploy Cloudflare Pages). Esta é uma **atualização incremental** sobre o código existente — NÃO reescreva o projeto. O protótipo evoluiu de conceito artístico para site de cafeteria real: mesma identidade visual (nada muda em tipografia, cores, Ken Burns, grain, masks, reveals), mas com conteúdo comercial de verdade + 2 blocos novos (cardápio completo e mapa interativo).

Mantenha intactos: design tokens, navbar kit, SceneMedia/SceneMarker/RevealText, hooks, keyframes existentes, estrutura de seções atual. Todo estilo novo segue os padrões já estabelecidos (easing `cubic-bezier(0.16,1,0.3,1)`, padding lateral `clamp(20px,5vw,72px)`, labels Archivo 600 tracking largo).

---

## MUDANÇA 1 — Fim da metáfora de filme (renomear labels)

Os marcadores "CENA XX" viram numeração de conteúdo real. Atualizar o `SceneMarker` de cada seção:

| Seção | Antes | Agora |
|---|---|---|
| Hero | CENA 01 · ABERTURA | TORREFAÇÃO PRÓPRIA · PINHEIROS, SP |
| Manifesto | CENA 02 · MANIFESTO | 01 · SOBRE NÓS |
| Menu (destaques) | CENA 03 · QUATRO TOMADAS | 02 · DESTAQUES DA CASA |
| Origem | CENA 04 · ORIGEM | 03 · ORIGEM |
| Casa | CENA 05 · A CASA | 04 · A CASA |
| Mapa (NOVA) | — | 04 · COMO CHEGAR |
| Footer | CENA 06 · CRÉDITOS FINAIS | 05 · CONTATO |

Labels das faixas do menu: "TOMADA 01..04" → "DESTAQUE 01..04".

## MUDANÇA 2 — Copy nova (substituições exatas)

**Hero:**
- Tagline: "O EXAGERO É O PONTO" → "CAFÉS ESPECIAIS · TORRA PRÓPRIA · DESDE 2019"

**Menu mobile (portal):**
- Tagline gold do rodapé do overlay: "O EXAGERO É O PONTO" → "TORREFAÇÃO E CAFÉ · PINHEIROS, SP"

**Manifesto:**
- H2: "CAFÉ NÃO É / DESCULPA PRA CONVERSA. / É O MOTIVO." → "TORRAMOS AQUI. / MOEMOS NA HORA. / SERVIMOS NO PONTO." (mesmas quebras de linha, 3 linhas)
- Parágrafo: → "Somos uma torrefação e cafeteria em Pinheiros. Torramos pequenos lotes toda semana e servimos cada grão no auge do frescor — do espresso ao coado."

**Descrições das 4 faixas de destaque (nomes e preços não mudam):**
- ESPRESSO: → "Blend da casa, moído na hora. 30ml."
- LATTE: → "Espresso duplo, leite vaporizado e microespuma. 300ml."
- COLD BREW: → "Infusão a frio por 18 horas. Servido gelado. 250ml."
- V60: → "Coado manual com o grão do dia. 240ml."

**Origem (grid de estatísticas):**
- Terceira estatística: "1 / OBSESSÃO" → "86 / PONTOS ESCALA SCA"

**Casa:**
- Linha final: "SEM RESERVA. SEM PRESSA. SEM DESCAFEINADO." → "DOMINGO · 8H–14H · WI-FI · PET FRIENDLY · CARTÕES E PIX"

**Footer:**
- Créditos: "© 2026 TORRA. TORREFAÇÃO & CAFÉ — FILMADO COM EXAGERO EM SÃO PAULO — FIM." → "© 2026 TORRA. TORREFAÇÃO E CAFÉ LTDA · CNPJ 00.000.000/0001-00 · PINHEIROS, SÃO PAULO — SP"

**SEO:**
- `<title>`: "TORRA. — Torrefação e Café · Pinheiros, SP"
- Atualizar meta description coerente (torrefação própria, cafés especiais, Pinheiros SP).

---

## MUDANÇA 3 — Bloco "Cardápio Completo" (novo, dentro da seção `#menu`)

Entra DEPOIS das 4 faixas de destaque, ainda dentro da seção `#menu`, fundo #120d09 sem mídia. Criar componente `CardapioCompleto.tsx` (ou sub-bloco de `Menu.tsx`).

**Cabeçalho do bloco:**
- Linha divisória 1px: `linear-gradient(90deg, rgba(201,151,63,0.6), rgba(201,151,63,0.05))`
- Header flex wrap space-between (gap 20px 44px): à esquerda, marcador "02 · CARDÁPIO COMPLETO" + H3 (reveal) "TUDO O QUE / SERVIMOS." em Anton `clamp(36px, 4.8vw, 88px)` line-height 0.96; à direita (reveal 120ms), parágrafo max-w 300px Archivo 300 13px/1.75 `rgba(242,236,225,0.62)`: "Bebidas preparadas com o blend da casa ou com o grão do dia. Todas as bebidas têm opção com leite de aveia."
- Padding do bloco: `clamp(56px,9vh,110px) clamp(20px,5vw,72px) clamp(8px,2vh,20px)`

**Grid de categorias:** `grid-template-columns: repeat(auto-fit, minmax(272px, 1fr))`, gap `clamp(40px,7vh,64px) clamp(44px,6vw,92px)`. Cada categoria tem reveal próprio (delays escalonados).

**Cabeçalho de categoria:** flex baseline space-between com `border-bottom: 1px solid rgba(242,236,225,0.16)`, padding-bottom 14px: nome em Archivo 700 11px tracking 0.3em gold + número da categoria ("01".."04") em Anton 13px `rgba(242,236,225,0.35)`.

**Item do cardápio (padrão dot-leader):** flex baseline gap 14px, padding 10px 0: nome Archivo 400 14px `rgba(242,236,225,0.88)` + span flexível `flex:1; border-bottom: 1px dotted rgba(242,236,225,0.22); transform: translateY(-3px)` + preço Archivo 700 12px tracking 0.12em gold nowrap. Hover (desktop): `translateX(8px)` transition 0.5s.

**Dados (criar como array tipado `cardapio.ts` — não hardcodar no JSX):**

ESPRESSO BAR (01): Espresso R$ 8 · Espresso duplo R$ 10 · Ristretto R$ 8 · Cortado R$ 10 · Macchiato R$ 10 · Cappuccino R$ 13 · Latte R$ 14 · Flat white R$ 15 · Mocha R$ 16

COADOS (02): V60 R$ 18 · Aeropress R$ 17 · Prensa francesa R$ 16 · Coado da casa — grão do dia R$ 10

GELADOS (03): Cold brew R$ 16 · Cold brew tônica R$ 19 · Espresso tônica R$ 18 · Latte gelado R$ 16 · Affogato R$ 18

PRA COMER (04): Pão de queijo R$ 9 · Croissant de manteiga R$ 12 · Croissant de amêndoas R$ 16 · Banana bread R$ 11 · Bolo de fubá com goiabada R$ 12 · Cookie de chocolate R$ 10 · Tostado de queijo e presunto R$ 18 · Basque cheesecake R$ 16

---

## MUDANÇA 4 — Seção MAPA interativa (nova, entre `#casa` e o footer)

Nova seção `id="mapa"`, componente `Mapa.tsx`. **Usar Leaflet puro** (`npm i leaflet @types/leaflet`) num `useEffect` — NÃO usar react-leaflet (dependência extra desnecessária pra um mapa único e estático). Importar `leaflet/dist/leaflet.css` só neste componente (lazy).

**Container:** seção fundo #120d09, div do mapa com `height: clamp(520px, 92vh, 940px)`, fundo #0b0705 enquanto carrega.

**Costura visual (essencial):** dois overlays `pointer-events:none` por cima do mapa:
- Vertical: `linear-gradient(180deg, #120d09, rgba(18,13,9,0) 16%, rgba(18,13,9,0) 80%, #120d09)`
- Horizontal: `linear-gradient(90deg, rgba(18,13,9,0.5), rgba(18,13,9,0) 28%, rgba(18,13,9,0) 74%, rgba(18,13,9,0.4))`

**Config do mapa:**
```ts
const centro: [number, number] = [-23.5646, -46.6926];
L.map(el, {
  center: centro, zoom: 12.4, zoomSnap: 0.2, minZoom: 10, maxZoom: 19,
  zoomControl: false, attributionControl: false,
  scrollWheelZoom: false,           // nunca sequestrar o scroll da página
  dragging: !isMobile,              // mobile: arrastar desabilitado (não travar scroll)
});
L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
  subdomains: 'abcd', maxZoom: 19,
}).addTo(mapa);
```

**Marker customizado (L.divIcon, className vazio, iconSize 18×18, anchor 9,9):**
- Anel pulsante: span `inset:-13px; border:1px solid rgba(201,151,63,0.55); border-radius:50%; animation: pulsar 2.6s ease-out infinite`
- Ponto: span `background:#c9973f; border-radius:50%; box-shadow: 0 0 24px rgba(201,151,63,0.85)`
- Rótulo: "TORRA." em Anton 17px creme, `text-shadow: 0 2px 14px rgba(11,7,5,0.9)`, à direita do ponto (left 30px, centralizado vertical)

Novo keyframe global:
```css
@keyframes pulsar {0%{transform:scale(0.45);opacity:0.9}100%{transform:scale(2.05);opacity:0}}
```

**Voo cinematográfico de entrada (uma vez só):** IntersectionObserver na seção (threshold 0.35). Ao entrar: `flyTo` do zoom 12.4 → 16.2, `{ duration: 4, easeLinearity: 0.15 }`, com alvo deslocado para o marker não ficar atrás do card de endereço:
```ts
const size = mapa.getSize();
const fx = size.x < 700 ? 0.05 : 0.2;
const p = mapa.project(centro, 16.2);
const alvo = mapa.unproject(p.subtract(L.point(size.x * fx, -size.y * 0.16)), 16.2);
mapa.flyTo(alvo, 16.2, { duration: 4, easeLinearity: 0.15 });
```
Com `prefers-reduced-motion`: usar `setView(alvo, 16.2)` direto, sem voo. Desconectar o observer após disparar. Chamar `mapa.invalidateSize()` ~300ms após montar. Cleanup completo no unmount (`mapa.remove()`).

**Elementos de UI sobre o mapa (z-index 3):**
- Marcador padrão top-left: "04 · COMO CHEGAR"
- Badge decorativo top-right: `23°33'53"S · 46°41'33"W` — Archivo 600 9.5px tracking 0.22em `rgba(242,236,225,0.55)`, fundo blur igual ao marcador
- Controles de zoom customizados abaixo do badge (coluna, gap 8px): botões +/− de 38×38px, fundo `rgba(18,13,9,0.65)` blur(8px), borda `rgba(242,236,225,0.22)`, hover borda/texto gold; chamam `mapa.zoomIn()` / `mapa.zoomOut()`. `aria-label` em ambos.
- **Card de endereço** (reveal), bottom-left: max-w 400px, fundo `rgba(18,13,9,0.82)` blur(14px), borda `rgba(242,236,225,0.14)`, padding `clamp(24px,3.4vw,36px)`:
  - Label gold 9.5px tracking 0.32em: "TORRA. — TORREFAÇÃO E CAFÉ"
  - Endereço em Anton `clamp(28px,3.4vw,52px)`: "RUA DO PONTO, 128"
  - Sub: "Pinheiros · São Paulo — SP" (Archivo 300 13px)
  - Divisória 1px `rgba(242,236,225,0.14)`
  - Horário: "SEG–SÁB · 7H–19H — DOM · 8H–14H" (10px tracking 0.24em, line-height 2)
  - Botão: "TRAÇAR ROTA ↗" → `https://www.google.com/maps/dir/?api=1&destination=-23.5646,-46.6926` (target _blank, rel noopener) — borda gold, texto gold, hover fundo gold texto ink
- Crédito bottom-right: "MAPA © OPENSTREETMAP · © CARTO" — 8.5px `rgba(242,236,225,0.35)`

**Performance:** lazy-load do componente (`React.lazy` + Suspense com o fundo #0b0705 como fallback) — Leaflet (~41KB) não pode entrar no bundle inicial.

**Nota:** a navbar NÃO ganha link pro mapa (continua MENU / ORIGEM / CASA / CONTATO) — o mapa é descoberto no scroll, entre Casa e o footer.

---

## CHECKLIST DE ACEITE
1. Nenhuma regressão visual nas seções existentes (tipografia, Ken Burns, grain, masks, reveals intactos)
2. Labels e copy trocados exatamente como especificado (conferir acentos e pontuação)
3. Cardápio completo com os 26 itens, dot-leader alinhado por baseline, hover translateX só em desktop
4. Mapa: tiles dark carregando, marker pulsando, flyTo disparando UMA vez ao entrar na viewport, scroll da página nunca travado (desktop e mobile), zoom +/− funcionando
5. Leaflet fora do bundle inicial (verificar com `npm run build` — chunk separado)
6. `prefers-reduced-motion` respeitado também no mapa (sem flyTo)
7. Lighthouse mobile ainda 90+