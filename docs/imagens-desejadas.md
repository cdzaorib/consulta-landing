# Assets reais: o que já entrou e o que ainda falta

## Atualização — rede liberada (sessão local)

As sessões anteriores rodavam na nuvem, com o domínio `conclinica.com.br`
bloqueado pelo proxy de saída (403 no CONNECT). Nesta sessão, rodando local,
a rede alcança o domínio normalmente — todos os itens abaixo que dependiam
disso foram resolvidos.

## Já resolvido

| Item | Onde entrou | Arquivo |
| --- | --- | --- |
| Foto do médico do hero | `Hero.jsx`, atrás do card de agenda | `hero-medico.webp` (55 kB) |
| Logos de 4 clientes (extraídos do PDF) | faixa de prova social (`LogosStrip.jsx`) | `clientes/mednil.webp`, `nitmed.webp`, `itaciba.webp`, `icarai.webp` |
| Logos dos outros 7 clientes | faixa de prova social (`LogosStrip.jsx`) | `clientes/sou.png`, `seo.jpg`, `otto-sinus.png`, `genutarso.avif`, `doutor-tem.png`, `de-luca.png`, `conit.webp` |
| Foto do Leonardo Daumas | avatar do depoimento | `depoimentos/leonardo-daumas.jpg` |
| Foto do Rafael Gualberto | avatar do depoimento | `depoimentos/rafael-gualberto.webp` |
| Foto do Dr. Pedro Baches | avatar do depoimento | `depoimentos/pedro-baches.png` |
| Capas dos 3 posts do blog | `Blog.jsx`, campo `cover` de cada post | `blog/plataforma-de-telemedicina.webp`, `blog/campanhas-preventivas.webp`, `blog/fluxo-de-caixa.webp` |
| Redes sociais | rodapé | Instagram, Facebook, YouTube e TikTok |
| Cores da marca | `tokens.css` | `#008872`, `#01A98E`, `#1E282E`, `#FAAB1C` |
| Preços dos planos | `content.js` | R$ 89 / R$ 119 / R$ 169 por profissional |
| Imagem de compartilhamento | `public/og.png`, via `npm run og` | 1200×630 |

Os onze clientes do carrossel real (conferido pela sequência de wp-image IDs
125303–125311, sem lacuna): **MedNil**, **NitMed Centro Médico**, **Clínica
Médica Itacibá**, **Clínica Icaraí**, **Clínica SOU**, **Oftalmologia SEO**,
**Otto Sinus**, **Genutarso**, **DoutorTem**, **De Luca** e **Conit**.

> **Correção:** a lista anterior tinha 12 nomes, incluindo "Clínica do Sono"
> além de "Clínica SOU". O carrossel real do site só tem 11 logos — não há
> nenhuma "Clínica do Sono" publicada. Era provavelmente uma duplicata
> equivocada de "Clínica SOU"; removida por falta de evidência.

### Otimização aplicada

`blog/campanhas-preventivas.png` veio do site com 886 kB (PNG de 960×540).
Recomprimido para WebP a 80% de qualidade — 22 kB, mesma resolução. O mesmo
tratamento (resize + WebP 80%) foi aplicado às outras duas capas de blog e ao
logo da Conit (`clientes/conit.png`, 106 kB → `conit.webp`, 11 kB), que também
veio pesado para o tamanho de exibição.

## Ainda pendente

### 1. Logo oficial — arquivo já baixado, integração não feita

`public/images/logo-conclinica.svg` (variante branca, para fundo escuro — o
arquivo do site chama-se "Dark.svg" porque é para *usar sobre* fundo escuro)
e `public/images/logo-conclinica.png` (lockup colorido completo, 703×99, para
fundo claro) já estão salvos.

**Por que não trocou sozinho:** substituir o `<svg>` desenhado à mão em
`src/components/Logo.jsx` muda a identidade visual do cabeçalho e do rodapé.
O próprio checklist original pede, junto disso, reconferir contraste
(`npm run check`) e atualizar `public/favicon.svg` e `scripts/make-og.mjs` —
um pacote de mudanças maior que baixar uma imagem. Ficou pronto para quem
quiser aplicar.

### 2. Capturas das telas do produto — investigado, sem imagem solta disponível

| Bloco | Página de origem | O que tem lá |
| --- | --- | --- |
| 08h — Agenda | `/agenda-medica/` | `og:image` é uma foto de marketing (médica segurando tablet) com um recorte da agenda sobreposto — não é um screenshot limpo |
| 10h — Prontuário | `/software-medico-clinica/` | `og:image` é foto de banco de imagens (médica no laptop), sem nenhuma UI visível |
| 17h — Financeiro | `/gestao-clinicas/controle-financeiro/` | `og:image` é foto de banco de imagens (mãos com laptops e papel), sem UI visível |

Nenhuma das três páginas tem um screenshot isolado da interface — só fotos de
divulgação. Encaixar essas fotos nos blocos de "Um dia na clínica" pioraria a
consistência visual (proporção, moldura, presença de pessoas/objetos
estranhos ao card). `DayScreen.jsx` (a reconstrução em HTML/CSS, fiel aos
rótulos e dados reais) segue sendo a melhor opção até existir um screenshot
de fato limpo da interface.

### 3. URLs de 11 links do rodapé

Sem mudança nesta sessão — seguem marcados com `pending: true` em
`src/content.js` (colunas Soluções, Suporte, Conteúdo e Contato).

### 4. og:image com URL absoluta, na hora de publicar

`public/og.png` já existe e as meta tags estão no `index.html`, mas o
`og:image` aponta para um caminho relativo. Trocar pelo domínio final ao
publicar.

---

## Dados a confirmar com a empresa

- **Preço do plano Enterprise.** Os outros três estão publicados; o Enterprise
  entra como faixa "Falar com a equipe".
- **Periodicidade do preço.** A página diz "por profissional de saúde" sem
  dizer se é mensal ou anual.
- **Tempo de mercado.** Não aparece no site.
- **Título e resumo do post "Campanhas preventivas".** O site já renomeou
  esse post para "Campanhas Preventivas em Clínicas: Como Organizar Sem
  Caos" (og:title atual); `content.js` mantém o título mais antigo. A URL
  (`/campanhas-preventivas-em-clinicas/`) continua a mesma, então o link e a
  capa estão corretos — só o título/resumo do card ficaram desatualizados.

## Cuidado com os números da faixa escura

Os valores em uso — **12M+ marcações, 3M+ pacientes, 10K+ médicos, 500+
clientes ativos** — vieram de um screenshot da home em que os contadores já
haviam terminado de animar. Não confirmados novamente nesta sessão.
