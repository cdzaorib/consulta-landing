/**
 * Gera public/og.png (1200×630) a partir dos tokens do design system.
 *
 * Uso: node scripts/make-og.mjs
 *
 * Provisório: usa o laço de infinito reconstruído, não o logo oficial.
 * Quando o SVG oficial chegar, trocar o markup do `.mark` e rodar de novo.
 *
 * As fontes são baixadas do Google Fonts e embutidas em base64 no HTML,
 * porque o Chromium do sandbox não busca recurso externo na hora de
 * renderizar — sem isso a imagem sairia com a serifa de fallback.
 */

import { chromium } from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const OUT = path.join(ROOT, 'public', 'og.png');

/* UA de navegador moderno para o Google devolver woff2 em vez de ttf. */
const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36';

const FAMILIES = {
  fraunces: 'Fraunces:opsz,wght,SOFT,WONK@9..144,400..700,0..100,0..1',
  plex: 'IBM+Plex+Sans:wght@400;600',
};

/**
 * Resolve a família pela API css2 e devolve o subset latin em base64.
 * Hardcodar a URL do .woff2 não funciona: ela muda a cada versão da fonte.
 */
async function fetchFont(family) {
  const cssUrl = `https://fonts.googleapis.com/css2?family=${family}&display=swap`;
  const css = await (await fetch(cssUrl, { headers: { 'User-Agent': UA } })).text();

  // O último bloco @font-face é sempre o subset latin.
  const blocks = css.split('@font-face').filter((b) => b.includes('U+0000-00FF'));
  const url = blocks.at(-1)?.match(/url\((https:[^)]+\.woff2)\)/)?.[1];
  if (!url) throw new Error(`não achei o woff2 latin de ${family}`);

  const res = await fetch(url);
  if (!res.ok) throw new Error(`falha ao baixar ${url}: ${res.status}`);
  return Buffer.from(await res.arrayBuffer()).toString('base64');
}

const [fraunces, plex] = await Promise.all([
  fetchFont(FAMILIES.fraunces),
  fetchFont(FAMILIES.plex),
]);

const html = `<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8" /><style>
  @font-face {
    font-family: 'Fraunces';
    src: url(data:font/woff2;base64,${fraunces}) format('woff2');
    font-weight: 100 900;
  }
  @font-face {
    font-family: 'IBM Plex Sans';
    src: url(data:font/woff2;base64,${plex}) format('woff2');
    font-weight: 100 700;
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    width: 1200px;
    height: 630px;
    overflow: hidden;
    position: relative;
    background: #0d1811;
    font-family: 'IBM Plex Sans', sans-serif;
    -webkit-font-smoothing: antialiased;
  }

  /* Mesmos halos sálvia/âmbar das faixas escuras da página */
  .glow {
    position: absolute;
    inset: 0;
    background:
      radial-gradient(46% 60% at 16% 88%, rgba(78, 113, 89, 0.62), transparent 70%),
      radial-gradient(40% 52% at 92% 12%, rgba(250, 171, 28, 0.30), transparent 72%);
  }

  .frame {
    position: relative;
    height: 100%;
    padding: 72px 80px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .lockup { display: flex; align-items: center; gap: 14px; }
  .lockup svg { width: 54px; height: 36px; }
  .word {
    font-size: 40px;
    font-weight: 600;
    letter-spacing: -0.03em;
  }
  .word .con { color: #01a98e; }
  .word .clinica { color: #f1f5f1; }

  h1 {
    font-family: 'Fraunces', serif;
    font-variation-settings: 'SOFT' 24, 'WONK' 1;
    font-weight: 500;
    font-size: 76px;
    line-height: 1.06;
    letter-spacing: -0.03em;
    color: #f1f5f1;
    max-width: 17ch;
  }
  h1 em { font-style: italic; color: #a0b8a6; }

  .foot {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 40px;
  }

  .tagline {
    font-size: 25px;
    line-height: 1.45;
    color: #c6d6c9;
    max-width: 30ch;
  }

  .stats { display: flex; gap: 48px; flex: none; }
  .stat .n {
    font-family: 'Fraunces', serif;
    font-variation-settings: 'SOFT' 24, 'WONK' 1;
    font-size: 46px;
    font-weight: 500;
    line-height: 1;
    letter-spacing: -0.03em;
    color: #f1f5f1;
  }
  .stat .n span { color: #fac155; font-size: 0.62em; }
  .stat .l {
    margin-top: 8px;
    font-size: 17px;
    color: #a0b8a6;
  }
</style></head>
<body>
  <div class="glow"></div>
  <div class="frame">
    <div class="lockup">
      <svg viewBox="0 0 48 32" fill="none">
        <g stroke="#01a98e" stroke-width="4.2">
          <circle cx="13" cy="16" r="9" />
          <circle cx="31" cy="16" r="9" />
        </g>
        <path d="M16.5 21.5 27.5 10.5" stroke="#01a98e" stroke-width="4.2" stroke-linecap="round" />
      </svg>
      <span class="word"><span class="con">con</span><span class="clinica">clínica</span></span>
    </div>

    <h1>A agenda, o prontuário e o caixa da sua clínica <em>num lugar só</em>.</h1>

    <div class="foot">
      <p class="tagline">Sistema de gestão para clínicas e consultórios.</p>
      <div class="stats">
        <div class="stat"><p class="n">12<span>M+</span></p><p class="l">marcações</p></div>
        <div class="stat"><p class="n">10<span>K+</span></p><p class="l">médicos</p></div>
        <div class="stat"><p class="n">500<span>+</span></p><p class="l">clínicas</p></div>
      </div>
    </div>
  </div>
</body></html>`;

const browser = await chromium.launch({
  executablePath:
    process.env.CHROMIUM_PATH || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
});
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(html, { waitUntil: 'load' });
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: OUT });
await browser.close();

const { size } = await fs.stat(OUT);
console.log(`og.png gerado: 1200x630, ${(size / 1024).toFixed(0)} kB`);
