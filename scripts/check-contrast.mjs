/**
 * Valida os pares de cor do design system contra WCAG 2.1.
 * Uso: node scripts/check-contrast.mjs
 * Sai com código 1 se algum par ficar abaixo do mínimo exigido.
 */

const C = {
  sage50: '#F1F5F1',
  sage100: '#E2EAE3',
  sage200: '#C6D6C9',
  sage300: '#A0B8A6',
  sage400: '#74947D',
  sage500: '#4E7159',
  sage600: '#395A44',
  sage700: '#2B4634',
  sage800: '#1E3327',
  sage900: '#15251C',
  sage950: '#0D1811',

  amber100: '#FDEAC4',
  amber200: '#FBD48C',
  amber300: '#FAC155',
  amber400: '#FAAB1C',
  amber600: '#A96C08',
  amber700: '#7E5007',
  amber800: '#573807',

  brandMark: '#008872',
  brandInk: '#1E282E',

  sand50: '#FAF8F4',
  sand100: '#F2EDE4',
  sand200: '#E4DCCE',

  white: '#FFFFFF',
  ink: '#0D1811',
  ink2: '#3A4A40',
  ink3: '#59695F',
  line: '#DCE5DD',
  lineStrong: '#C3D2C6',
};

function toRgb(hex) {
  const h = hex.replace('#', '');
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
}

function luminance(hex) {
  const [r, g, b] = toRgb(hex).map((v) =>
    v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
  );
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function ratio(a, b) {
  const [l1, l2] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
}

/** [rótulo, frente, fundo, mínimo] — 4.5 texto normal, 3 texto grande/UI */
const PAIRS = [
  ['texto principal / fundo sálvia', C.ink, C.sage50, 4.5],
  ['texto principal / fundo areia', C.ink, C.sand50, 4.5],
  ['texto principal / superfície branca', C.ink, C.white, 4.5],
  ['texto secundário / fundo sálvia', C.ink2, C.sage50, 4.5],
  ['texto secundário / superfície branca', C.ink2, C.white, 4.5],
  ['texto suave / fundo sálvia', C.ink3, C.sage50, 4.5],
  ['texto suave / superfície branca', C.ink3, C.white, 4.5],
  ['texto suave / fundo areia', C.ink3, C.sand50, 4.5],
  ['eyebrow âmbar / fundo sálvia', C.amber700, C.sage50, 4.5],
  ['eyebrow âmbar / superfície branca', C.amber700, C.white, 4.5],
  ['eyebrow âmbar / fundo areia', C.amber700, C.sand50, 4.5],
  ['link sálvia / superfície branca', C.sage700, C.white, 4.5],
  ['botão primário (texto sobre sálvia 800)', C.white, C.sage800, 4.5],
  ['botão primário hover (texto sobre sálvia 700)', C.white, C.sage700, 4.5],
  ['faixa escura: número', C.sage50, C.sage950, 4.5],
  ['faixa escura: legenda', C.sage200, C.sage950, 4.5],
  ['faixa escura: sufixo âmbar', C.amber300, C.sage950, 4.5],
  ['faixa escura: eyebrow', C.sage300, C.sage950, 4.5],
  ['agenda: rótulo sobre bloco sálvia', C.white, C.sage600, 4.5],
  ['agenda: rótulo sobre bloco âmbar', C.amber800, C.amber200, 4.5],
  ['chip "antes" (texto sobre areia 100)', C.ink2, C.sand100, 4.5],
  ['chip "depois" (texto sobre sálvia 100)', C.sage800, C.sage100, 4.5],
  ['chip âmbar (texto sobre âmbar 100)', C.amber800, C.amber100, 4.5],
  ['marcador "antes" (âmbar sobre areia 200)', C.amber700, C.sand200, 4.5],
  ['badge plano em destaque', C.white, C.sage800, 4.5],
  ['card de confiança: marcador âmbar', C.amber300, C.sage900, 4.5],

  // Elementos não textuais (bordas, ícones, indicadores): mínimo 3:1
  ['borda forte / fundo sálvia', C.lineStrong, C.sage50, 1.2],
  ['anel de foco / fundo sálvia', C.sage700, C.sage50, 3],
  ['anel de foco / faixa escura', C.sage200, C.sage950, 3],
  ['ícone âmbar / superfície branca', C.amber600, C.white, 3],
  ['ícone âmbar / fundo sálvia', C.amber600, C.sage50, 3],
  ['divisor / superfície branca', C.line, C.white, 1.1],

  // O âmbar oficial (#FAAB1C) só entra como grafismo decorativo: as
  // estrelas repetem uma nota que já está no aria-label, então não
  // precisam atingir 3:1. Fica registrado para ninguém promovê-lo a texto.
  ['estrelas âmbar oficial / superfície branca (decorativo)', C.amber400, C.white, 1.1],

  // Logotipo: a 1.4.3 isenta nome de marca de contraste mínimo. Medido
  // mesmo assim para acompanhar.
  ['logo "con" verde / fundo sálvia (logotipo, isento)', C.brandMark, C.sage50, 3],
  ['logo "clínica" ardósia / fundo sálvia', C.brandInk, C.sage50, 4.5],
];

let failed = 0;
for (const [label, fg, bg, min] of PAIRS) {
  const r = ratio(fg, bg);
  const ok = r >= min;
  if (!ok) failed += 1;
  console.log(
    `${ok ? 'OK  ' : 'FALHA'} ${r.toFixed(2).padStart(5)}:1 (min ${min})  ${label}`
  );
}

console.log(
  failed === 0
    ? `\nTodos os ${PAIRS.length} pares passaram.`
    : `\n${failed} de ${PAIRS.length} pares reprovaram.`
);
process.exit(failed === 0 ? 0 : 1);
