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
    background: #0c1013;
    font-family: 'IBM Plex Sans', sans-serif;
    -webkit-font-smoothing: antialiased;
  }

  /* Mesmos halos sálvia/âmbar das faixas escuras da página */
  .glow {
    position: absolute;
    inset: 0;
    background:
      radial-gradient(46% 60% at 16% 88%, rgba(0, 136, 114, 0.62), transparent 70%),
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
  .lockup svg { width: 62px; height: 32px; }
  .word {
    font-size: 40px;
    font-weight: 600;
    letter-spacing: -0.03em;
  }
  .word .con { color: #01a98e; }
  .word .clinica { color: #f3f3f3; }

  h1 {
    font-family: 'Fraunces', serif;
    font-variation-settings: 'SOFT' 24, 'WONK' 1;
    font-weight: 500;
    font-size: 76px;
    line-height: 1.06;
    letter-spacing: -0.03em;
    color: #f3f3f3;
    max-width: 17ch;
  }
  h1 em { font-style: italic; color: #4fb5a3; }

  .foot {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 40px;
  }

  .tagline {
    font-size: 25px;
    line-height: 1.45;
    color: #c9cfd2;
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
    color: #f3f3f3;
  }
  .stat .n span { color: #fac155; font-size: 0.62em; }
  .stat .l {
    margin-top: 8px;
    font-size: 17px;
    color: #a3abaf;
  }
</style></head>
<body>
  <div class="glow"></div>
  <div class="frame">
    <div class="lockup">
      <!-- símbolo oficial, extraído de public/images/logo-conclinica.svg -->
      <svg viewBox="0 0 42 21.5" fill="none"><mask id="mask0-og" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="12" y="0" width="30" height="21"><path d="M24.0029 3.81457C24.0029 2.87475 24.7768 2.10078 25.7167 2.10078C26.6565 2.10078 27.4304 2.87475 27.4304 3.81457C27.4304 4.7544 26.6565 5.52837 25.7167 5.52837C24.7492 5.52837 24.0029 4.7544 24.0029 3.81457ZM27.2093 0.718688C26.7394 0.497553 26.2418 0.359344 25.689 0.359344C23.7817 0.359344 22.2614 1.90729 22.2614 3.78693C22.2614 5.69422 23.8094 7.21452 25.689 7.21452C27.5134 7.21452 29.006 5.77714 29.1166 3.98042C31.0515 3.39995 33.2352 3.70401 35.0043 5.00317C36.4417 6.05356 37.4092 7.62915 37.6579 9.39822C37.9343 11.1673 37.4921 12.9364 36.4417 14.4014C35.3913 15.8388 33.8157 16.8062 32.0466 17.055C30.2776 17.3314 28.5085 16.8892 27.0435 15.8388L14.6876 6.71696C14.3559 6.46819 13.886 6.55111 13.6648 6.88282L12.338 8.70718C12.0892 9.03888 12.1722 9.50879 12.5039 9.75757L24.8598 18.8794C27.0987 20.5379 29.8629 21.2013 32.6271 20.7867C35.3913 20.372 37.8238 18.8794 39.4546 16.6404C41.1132 14.4014 41.7766 11.6372 41.3619 8.87303C40.9473 6.10884 39.4546 3.67636 37.2157 2.0455C35.3637 0.663404 33.2076 0 31.0515 0C29.7524 0 28.4532 0.248776 27.2093 0.718688Z" fill="white"></path></mask><g mask="url(#mask0-og)"><path d="M41.8043 0H12.1169V21.1736H41.8043V0Z" fill="#01a98e"></path></g><mask id="mask1-og" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="30" height="21"><path d="M14.107 17.0273C14.107 16.0875 14.8809 15.3135 15.8208 15.3135C16.7606 15.3135 17.5346 16.0875 17.5346 17.0273C17.5346 17.9671 16.7606 18.7411 15.8208 18.7411C14.8809 18.7411 14.107 17.9948 14.107 17.0273ZM8.85502 0.165797C6.09084 0.580424 3.65835 2.07308 2.02749 4.31207C0.368977 6.55106 -0.294427 9.31524 0.1202 12.0794C0.534828 14.8436 2.02749 17.2761 4.26647 18.907C7.27943 21.1183 11.1216 21.4776 14.3557 20.1508C14.798 20.3443 15.2956 20.4825 15.7931 20.4825C17.7004 20.4825 19.2207 18.9346 19.2207 17.055C19.2207 15.1477 17.6728 13.6274 15.7931 13.6274C13.9411 13.6274 12.4485 15.0924 12.3655 16.9167C10.403 17.4972 8.21926 17.2208 6.45018 15.9216C5.0128 14.8713 4.04534 13.2957 3.79656 11.5266C3.52015 9.75751 3.96242 7.98843 5.0128 6.52342C6.06319 5.08604 7.63878 4.11858 9.40786 3.8698C11.1769 3.59338 12.946 4.03565 14.411 5.08604L26.7669 14.2078C27.0986 14.4566 27.5685 14.3737 27.7897 14.042L29.1165 12.2453C29.3653 11.9136 29.2823 11.4437 28.9506 11.1949L16.5947 2.07308C14.8257 0.718634 12.6696 0.0275879 10.4859 0.0275879C9.93305 0.0275879 9.40786 0.0828715 8.85502 0.165797Z" fill="white"></path></mask><g mask="url(#mask1-og)"><path d="M29.3929 0.0275879H-0.294434V21.45H29.3929V0.0275879Z" fill="#01a98e"></path></g></svg>
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
