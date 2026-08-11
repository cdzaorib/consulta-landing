/**
 * Valida os pares de cor do design system contra WCAG 2.1.
 * Uso: node scripts/check-contrast.mjs
 * Sai com código 1 se algum par ficar abaixo do mínimo exigido.
 */

const C = {
  // Neutros — todas as superfícies da página
  n0: '#FFFFFF',
  n50: '#FAFAFA',
  n100: '#F3F3F3',
  n200: '#E9E9E9',
  n300: '#DCDCDC',
  n400: '#B4B4B4',

  // Ardósia — blocos escuros
  slate900: '#1E282E',
  slate950: '#12171A',
  // Fundo da faixa de números e o mesmo fundo sob o ponto mais denso da
  // mancha verde animada (0,45 de #008872 por cima do quase-preto).
  metricsBg: '#0C1013',
  metricsBlob: '#064639',

  // Verde-água da marca
  teal50: '#E6F4F1',
  teal400: '#01A98E',
  teal500: '#008872',
  teal600: '#00705D',
  teal700: '#005A4B',

  amber100: '#FDEAC4',
  amber300: '#FAC155',
  amber400: '#FAAB1C',
  amber600: '#A96C08',
  amber700: '#7E5007',
  amber800: '#573807',

  ink: '#1A1D1F',
  ink2: '#4D5356',
  ink3: '#64696C',
  onDark: '#F3F3F3',
  onDark2: '#C9CFD2',
  onDark3: '#A3ABAF',
  line: '#E6E6E6',
  lineStrong: '#D4D4D4',
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
  // ---- Texto sobre as duas superfícies claras (branco puro e #F3F3F3) ----
  ['texto principal / branco', C.ink, C.n0, 4.5],
  ['texto secundário / branco', C.ink2, C.n0, 4.5],
  ['texto suave / branco', C.ink3, C.n0, 4.5],
  ['texto principal / cinza #F3F3F3', C.ink, C.n100, 4.5],
  ['texto secundário / cinza #F3F3F3', C.ink2, C.n100, 4.5],
  ['texto suave / cinza #F3F3F3', C.ink3, C.n100, 4.5],
  ['texto secundário / cinza #E9E9E9 (chip)', C.ink2, C.n200, 4.5],

  // ---- Verde da marca ----
  ['rótulo do botão primário (branco sobre verde-escuro)', C.n0, C.teal600, 4.5],
  ['link/valor em verde / branco', C.teal600, C.n0, 4.5],
  ['link/valor em verde / cinza #F3F3F3', C.teal600, C.n100, 4.5],
  ['chip verde (texto sobre verde-50)', C.teal700, C.teal50, 4.5],
  ['botão primário no hover (branco sobre verde-700)', C.n0, C.teal700, 4.5],

  // ---- Âmbar (eyebrow e marcadores) ----
  ['eyebrow âmbar / branco', C.amber700, C.n0, 4.5],
  ['eyebrow âmbar / cinza #F3F3F3', C.amber700, C.n100, 4.5],
  ['chip âmbar (texto sobre âmbar 100)', C.amber800, C.amber100, 4.5],

  // ---- Faixa escura de números, incluindo o pior ponto da mancha animada ----
  ['número / fundo da faixa escura', C.onDark, C.metricsBg, 4.5],
  ['número / fundo sob a mancha verde', C.onDark, C.metricsBlob, 4.5],
  ['legenda do número / faixa escura', C.onDark2, C.metricsBg, 4.5],
  ['legenda do número / sob a mancha verde', C.onDark2, C.metricsBlob, 4.5],
  ['eyebrow sobre escuro / sob a mancha verde', C.onDark2, C.metricsBlob, 4.5],
  ['sufixo âmbar / sob a mancha verde', C.amber300, C.metricsBlob, 4.5],

  // ---- Bloco escuro do CTA final ----
  ['título / bloco escuro', C.onDark, C.slate950, 4.5],
  ['texto de apoio / bloco escuro', C.onDark2, C.slate950, 4.5],
  ['nota / bloco escuro', C.onDark3, C.slate950, 4.5],
  ['botão claro sobre bloco escuro', C.slate950, C.n100, 4.5],
  ['depoimento em destaque / ardósia 900', C.onDark, C.slate900, 4.5],

  // ---- Elementos não textuais: 3:1 (bordas puras: só registradas) ----
  ['anel de foco verde / branco', C.teal500, C.n0, 3],
  ['anel de foco verde / cinza #F3F3F3', C.teal500, C.n100, 3],
  ['ícone/marcador verde / branco', C.teal500, C.n0, 3],
  ['barra do carrossel / cinza #F3F3F3', C.teal500, C.n100, 3],
  ['ícone âmbar / branco', C.amber600, C.n0, 3],
  ['trilha preenchida do slider / cinza #F3F3F3', C.teal500, C.n100, 3],
  ['ícone branco / botão flutuante verde', C.n0, C.teal500, 3],
  ['divisor / branco', C.line, C.n0, 1.1],
  ['borda forte / branco', C.lineStrong, C.n0, 1.2],
  ['trilha vazia do carrossel / cinza #F3F3F3', C.n300, C.n100, 1.1],
  ['borda do cartão da calculadora / branco', C.n300, C.n0, 1.2],

  // O âmbar oficial (#FAAB1C) só entra como grafismo decorativo: as
  // estrelas repetem uma nota que já está no aria-label, então não
  // precisam atingir 3:1. Fica registrado para ninguém promovê-lo a texto.
  ['estrelas âmbar oficial / branco (decorativo)', C.amber400, C.n0, 1.1],

  // Logotipo: a 1.4.3 isenta nome de marca de contraste mínimo. Medido
  // mesmo assim para acompanhar.
  ['logo "con" verde / branco (logotipo, isento)', C.teal500, C.n0, 3],
  ['logo "clínica" ardósia / branco', C.slate900, C.n0, 4.5],
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
