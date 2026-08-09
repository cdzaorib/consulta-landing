# Assets reais: o que já entrou e o que ainda falta

## Para subir manualmente (a rede desta sessão não alcança o site)

O domínio `conclinica.com.br` é recusado pela política de saída (403 no
CONNECT), então os arquivos abaixo precisam ser baixados por fora e salvos
nestes caminhos exatos. O código já espera por eles.

| Baixar de | Salvar como |
| --- | --- |
| `/wp-content/uploads/2024/05/Dark.svg` | `public/images/logo-conclinica.svg` |
| `/wp-content/uploads/2025/10/conclinica-1.png` | `public/images/logo-conclinica.png` |
| `/wp-content/uploads/2024/07/Rafael-Gualberto.webp` | `public/images/depoimentos/rafael-gualberto.webp` |
| `/wp-content/uploads/2024/07/leonardo-daumas.webp` | `public/images/depoimentos/leonardo-daumas.webp` |
| `/wp-content/uploads/2024/07/pedro-baches.png` | `public/images/depoimentos/pedro-baches.png` |

Todos com o prefixo `https://conclinica.com.br`.

Assim que os arquivos existirem, o que falta é mecânico:

1. Ler a cor primária do `Dark.svg` (atributo `fill`/`stop-color` do símbolo)
   e trocar `--brand-mark` em `src/styles/tokens.css`, mais o `fill` do
   `public/favicon.svg` e o `stroke` em `src/components/Logo.jsx`.
2. Rodar `npm run check` para reconferir os 35 pares de contraste com a cor
   nova e ajustar a rampa sálvia se algum par cair abaixo de 4,5:1.
3. Acrescentar o campo `photo` aos três depoimentos em `src/content.js` —
   o componente já troca monograma por foto sozinho quando o campo existe.
4. Rodar `npm run og` para regerar a prévia de compartilhamento com o logo
   oficial.


Boa parte desta lista foi resolvida com o PDF de captura do site. As imagens
foram extraídas com PyMuPDF, tratadas (recorte da moldura vazia, branco de
fundo dos logos convertido em transparência) e salvas em `public/images/`.

## Já resolvido

| Item | Onde entrou | Arquivo |
| --- | --- | --- |
| Foto do médico do hero | `Hero.jsx`, atrás do card de agenda | `hero-medico.webp` (55 kB) |
| Logos de 4 clientes | faixa de prova social (`LogosStrip.jsx`) | `clientes/*.png` |
| Foto do Leonardo Daumas | avatar do depoimento | `depoimentos/leonardo-daumas.jpg` |
| Redes sociais | rodapé | Instagram, Facebook, YouTube e TikTok |
| Cores da marca | `tokens.css` | `#008872`, `#01A98E`, `#1E282E`, `#FAAB1C` |
| Preços dos planos | `content.js` | R$ 89 / R$ 119 / R$ 169 por profissional |
| Imagem de compartilhamento | `public/og.png`, via `npm run og` | 1200×630 |

Os clientes cujos logos entraram: **MedNil** (Centro de Especialidades
Integradas de Nilópolis), **NitMed Centro Médico**, **Clínica Médica Itacibá**
e **Clínica Icaraí**.

---

## 1. Arquivo vetorial do logo — o que falta de mais visível

**Onde:** cabeçalho de https://conclinica.com.br/

**O que pegar:** o SVG do logo (ou PNG em alta) e o favicon oficial.

As **cores** já estão certas. O que continua sendo aproximação é o **desenho**
do símbolo: `Logo.jsx` e `public/favicon.svg` reconstroem o laço de infinito à
mão. Em tamanho pequeno passa bem, mas o traço interno e os dois pontinhos do
original não estão fiéis.

Trocar o `<svg>` em `src/components/Logo.jsx`, o `public/favicon.svg` e o
markup do `.lockup` em `scripts/make-og.mjs` (depois rodar `npm run og`).

## 2. Fotos dos outros dois depoimentos

**Onde:** carrossel "O que os gestores e médicos dizem sobre nosso sistema".

Falta a foto de **Rafael Gualberto** e de **Dr. Pedro Baches** — o PDF só
trouxe a do Leonardo Daumas. Os dois seguem com monograma, e o componente já
troca sozinho para `<img>` quando o campo `photo` existe no depoimento.

## 3. Capturas das telas do produto em resolução cheia

| Bloco | Tela | Página de origem |
| --- | --- | --- |
| 08h | Agenda do dia com os status | https://conclinica.com.br/agenda-medica/ |
| 10h | Prontuário eletrônico com IA | https://conclinica.com.br/software-medico-clinica/ |
| 17h | Cobrança / novo boleto | https://conclinica.com.br/gestao-clinicas/controle-financeiro/ |

Os três blocos de "Um dia na clínica" mostram um recorte reconstruído em
HTML/CSS (`DayScreen.jsx`), com os rótulos, status e campos reais. Com as
imagens, cada `<DayScreen>` vira um `<img>`.

## 4. Imagens de capa do blog

O PDF trouxe só uma capa (a do post sobre campanhas preventivas). Com uma
única foto entre três cards, a fileira ficaria desigual, então nenhuma foi
usada — as capas continuam em degradê da paleta. Vale pegar as três de uma vez.

Dois dos três posts já estão com título, resumo, categoria e URL do site; o
terceiro ("Fluxo de caixa") tem título e URL reais, mas resumo e categoria
escritos aqui.

## 5. URLs de 11 links do rodapé

Os rótulos e a estrutura das quatro colunas estão corretos. Faltam 11
endereços, marcados com `pending: true` em `src/content.js`:

| Coluna | Links pendentes |
| --- | --- |
| Soluções | Cobrança inteligente, Faturamento |
| Suporte | Quem somos, Termos de uso, Mapa do site, Mapa do blog |
| Conteúdo | Materiais gratuitos, Casos de sucesso, CID 10, Vídeos |
| Contato | Contato |

## 6. og:image com URL absoluta, na hora de publicar

`public/og.png` já existe e as meta tags estão no `index.html`, mas o
`og:image` aponta para um caminho relativo. WhatsApp e Facebook não montam o
card sem URL absoluta — trocar pelo domínio final ao publicar.

---

## Dados a confirmar com a empresa

- **Preço do plano Enterprise.** Os outros três estão publicados; o Enterprise
  entra como faixa "Falar com a equipe".
- **Periodicidade do preço.** A página diz "por profissional de saúde" sem
  dizer se é mensal ou anual. A nossa repete o mesmo texto, sem inventar
  "/mês".
- **Tempo de mercado.** Não aparece no site.

## Cuidado com os números da faixa escura

Os valores em uso — **12M+ marcações, 3M+ pacientes, 10K+ médicos, 500+
clientes ativos** — vieram de um screenshot da home em que os contadores já
haviam terminado de animar.

No **PDF** de captura esses mesmos contadores aparecem como `0M+ / 0K+ / 0+`,
porque a captura pegou o estado inicial da animação. **Os zeros do PDF não são
os valores reais** — não substituir por eles.
