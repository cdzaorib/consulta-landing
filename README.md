# Conclínica — landing page

Landing page do Conclínica, sistema de gestão para clínicas e consultórios
(agenda online, prontuário eletrônico, faturamento TISS e financeiro).

Stack: React 19 + Vite + Framer Motion, sem TypeScript.

## Scripts

```bash
npm install
npm run dev      # servidor de desenvolvimento
npm run build    # build de produção
npm run preview  # preview do build
npm run lint     # oxlint
npm run check    # valida o contraste dos pares de cor (WCAG AA)
npm run og       # regenera public/og.png (1200×630) a partir dos tokens
```

## Estrutura

- `src/styles/tokens.css` — design tokens (paleta sálvia/terracota, tipografia,
  espaçamento, sombras, curvas de animação)
- `src/styles/base.css` — reset, tipografia base e primitivas compartilhadas
  (botões, eyebrow, cabeçalho de seção, chips)
- `src/components/` — um componente por seção, com o CSS ao lado
- `src/hooks/` — `usePrefersReducedMotion`, `useCountUp`

## Acessibilidade

O projeto segue WCAG AA: contraste validado por
`scripts/check-contrast.mjs`, alvos de toque de no mínimo 44px no mobile,
navegação por teclado com `:focus-visible` e respeito a
`prefers-reduced-motion` (todas as animações do Framer Motion são desligadas
quando a preferência está ativa).
