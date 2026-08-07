# Imagens e assets reais que faltam

Hoje tudo na página é resolvido com CSS e SVG. A lista abaixo está em ordem
de impacto: os itens 1 e 2 mudam mais a percepção da página do que todo o
resto somado.

> **Nota:** o domínio `conclinica.com.br` está bloqueado pela política de
> saída de rede desta sessão, então não foi possível abrir o site e copiar a
> URL exata de cada arquivo. As URLs abaixo são as **páginas** onde cada
> imagem está publicada — confirmadas como reais — e não o caminho direto do
> arquivo. Para pegar o link do arquivo: abrir a página, clicar com o botão
> direito na imagem e escolher "Copiar endereço da imagem".

---

## 1. Logo oficial e cor da marca — bloqueador

**Onde:** cabeçalho e rodapé de qualquer página, ex.: https://conclinica.com.br/

**O que pegar:** o arquivo do logo (SVG de preferência, ou PNG em alta) e o
favicon oficial.

**Por que importa:** o `Logo.jsx` e o `public/favicon.svg` usam hoje uma marca
desenhada por mim — um "C" aberto com um ponto terracota. Ela é um
substituto, não a marca real.

**Atenção:** o pedido era trocar o favicon pela cor real da Conclínica. Sem
acesso ao site não deu para ler o hexadecimal da marca, então o favicon está
no verde sálvia do próprio design (`#1E3327`) com o ponto terracota
(`#C4735A`). Isso resolve o problema do roxo `#863bff` que não combinava com
nada, mas **não é a cor oficial**. Com o SVG do logo em mãos, é uma troca de
dois valores em `public/favicon.svg` e `src/components/Logo.jsx`.

## 2. Captura de tela da agenda real

**Onde:** https://conclinica.com.br/agenda-medica/

**O que pegar:** a captura da tela de agenda do sistema (a visão de semana com
os horários preenchidos).

**Por que importa:** é o objeto central do hero. Hoje o `AgendaWidget.jsx`
reconstrói uma agenda em HTML/CSS, com animação de confirmação e encaixe. Ela
funciona bem e é interativa, então vale manter — mas uma captura real ao lado
(ou alternando com ela) prova que o produto existe. É a imagem que mais
converte numa landing de software.

## 3. Capturas das outras três telas do produto

Uma para cada bloco da seção "Um dia na clínica":

| Bloco | Tela | Página de origem |
| --- | --- | --- |
| 08h — Abertura | Agenda / fila de espera | https://conclinica.com.br/agenda-medica/ |
| 10h — Consulta | Prontuário eletrônico com IA | https://conclinica.com.br/software-medico-clinica/ |
| 17h — Fechamento | Painel financeiro / fluxo de caixa | https://conclinica.com.br/gestao-clinicas/controle-financeiro/ |

**Por que importa:** hoje cada bloco mostra só quatro cartões de texto. Uma
captura por bloco transforma a seção em demonstração.

Vale também a tela de laudos, se a seção crescer:
https://conclinica.com.br/laudos-e-exames/

## 4. Fotos dos clientes dos depoimentos

**Onde:** seção de depoimentos da home, https://conclinica.com.br/

**O que pegar:** a foto de cada pessoa citada e a confirmação do nome e do
cargo.

**Por que importa:** os avatares são iniciais dentro de um círculo
(`PB`, `MC`). Foto real de rosto aumenta muito a credibilidade de depoimento.

**Atenção:** as duas citações em `src/content.js` vêm do material público da
Conclínica, mas os **nomes** ("Dr. Pedro Baches", "Dra. Marina Costa") vieram
da versão anterior deste projeto e não deu para conferir contra o site.
Confirmar antes da apresentação.

## 5. Logos de clínicas clientes

**Onde:** home, https://conclinica.com.br/ — se houver uma faixa de clientes

**O que pegar:** os logos, com autorização de uso.

**Por que importa:** a faixa hoje lista especialidades em texto ("Clínica
geral", "Odontologia"...). Logos reais de clínicas clientes seriam prova
social de verdade no lugar de uma lista genérica.

## 6. Imagem de compartilhamento (Open Graph)

**O que fazer:** gerar uma imagem 1200×630 com o logo oficial e a headline.

**Por que importa:** a página ainda não tem `og:image`. Quando o link for
colado no WhatsApp ou no Slack durante a apresentação, aparece sem prévia.

---

## Dados a confirmar com a empresa

Coisas que ficaram de fora por não estarem publicadas:

- **Preços dos planos.** O site lista os quatro planos (Essencial, Gestão,
  Performance, Enterprise) mas não publica valores. A seção de planos está
  sem preço, com um link para a página oficial. Se a Conclínica quiser os
  valores na página, é só preencher.
- **Tempo de mercado e número de clínicas atendidas.** Números desse tipo dão
  peso à faixa escura de métricas, mas não foram encontrados publicamente.
- **Se o teste grátis é de 7 ou 14 dias.** A página usa **7 dias**, que é o
  que aparece no material público da Conclínica (a versão anterior deste
  projeto dizia 14, o que estava errado).
