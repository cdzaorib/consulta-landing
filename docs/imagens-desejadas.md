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
| Símbolo oficial do logo | `Logo.jsx`, `public/favicon.svg` e `scripts/make-og.mjs` | extraído de `logo-conclinica.svg` |

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

## Sobre o logo

O símbolo do lockup passou a ser o oficial: os dois caminhos com máscara
saíram direto de `public/images/logo-conclinica.svg` (o arquivo da empresa),
com o `fill` do `<g>` trocado de branco para a cor da marca. A reconstrução
à mão — dois círculos e uma barra diagonal — saiu de cena, junto com os
mesmos desenhos no `favicon.svg` e no gerador da imagem de compartilhamento.

Um detalhe que o arquivo original esconde: as máscaras são de luminância, e
o `<path>` de dentro do `<mask>` precisa continuar **branco**. Recolorir esse
path junto com o resto faz o símbolo aparecer lavado, porque a luminância
mais baixa da cor vira transparência parcial. Quem recebe a cor é só o
`<path>` de dentro do `<g>`.

A palavra continua em texto (IBM Plex Sans), não em caminho: mantém o lockup
selecionável, recolorível e na escala de tipo do resto da página.

## Ainda pendente

### 1. Capturas das telas do produto — investigado, sem imagem solta disponível

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

### 2. URLs de 11 links do rodapé

Sem mudança nesta sessão — seguem marcados com `pending: true` em
`src/content.js` (colunas Soluções, Suporte, Conteúdo e Contato).

### 3. og:image com URL absoluta, na hora de publicar

`public/og.png` já existe e as meta tags estão no `index.html`, mas o
`og:image` aponta para um caminho relativo. Trocar pelo domínio final ao
publicar.

---

## Dados a confirmar com a empresa

- **Periodicidade do preço.** A página diz "por profissional de saúde" sem
  dizer se é mensal ou anual.
- **Tempo de mercado.** Não aparece no site.
- **Resumo do post "Campanhas preventivas".** O título do card já foi
  atualizado para o og:title atual do site; o resumo segue sendo o trecho
  antigo, truncado, e vale reconferir.

## Cuidado com os números da faixa escura

Os valores em uso — **12M+ marcações, 3M+ pacientes, 10K+ médicos, 500+
clientes ativos** — vieram de um screenshot da home em que os contadores já
haviam terminado de animar. Não confirmados novamente nesta sessão.
