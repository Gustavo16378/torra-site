# TORRA. — Torrefação & Café

Site one-page cinematográfico (variação **VAPOR**) para uma cafeteria fictícia.
100% dark contínuo, cada seção é uma "cena" numerada, com mídia fullbleed em
Ken Burns perpétuo, grain de filme, fades escuros costurando as cenas e reveals
on scroll.

Feito como peça de portfólio. **Desenvolvido por [Gustavo Dev](https://gustavodev.dev/).**

## Stack

- React 19 + Vite 6 + TypeScript (estrito)
- Tailwind CSS v4 (`@tailwindcss/vite`)
- Lucide React
- Animações 100% CSS + IntersectionObserver nativo (sem libs de animação)
- Imagens pré-otimizadas em AVIF, WebP e JPEG, em quatro larguras

## Estrutura

```
src/
  components/   Navbar, SceneMarker, SceneMedia, RevealText
  sections/     Hero, Manifesto, Menu, Origem, Casa, Footer
  hooks/        useScrollDirection, useReveal, useScrollSpy
  assets/       imagens otimizadas + images.ts
  index.css     tokens, keyframes (grain / Ken Burns / parallax), acessibilidade
```

## Comandos

```bash
npm install
npm run dev      # servidor de desenvolvimento
npm run build    # tsc + vite build → dist/
npm run preview  # pré-visualiza o build de produção
```

## Deploy (Cloudflare Pages)

- Build command: `npm run build`
- Output directory: `dist`

## Acessibilidade

`@media (prefers-reduced-motion: reduce)` desliga grain, Ken Burns, parallax e o
indicador de scroll; os reveals viram um fade simples. Foco em contraste e
`aria` nos elementos interativos.
