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
>
> Parte da lista original já foi resolvida com os screenshots do site que
> você mandou. O que estava pendente e **foi resolvido**: cores da marca,
> desenho do logo, números reais da home e a autoria do primeiro depoimento.

---

## 1. Arquivo vetorial do logo

**Onde:** cabeçalho de qualquer página, ex.: https://conclinica.com.br/

**O que pegar:** o SVG do logo (ou PNG em alta) e o favicon oficial.

**Por que importa:** as **cores** já estão certas — amostradas dos seus
screenshots e registradas em `src/styles/tokens.css`:

| Papel | Hex | Onde aparece |
| --- | --- | --- |
| Verde da marca | `#008872` | símbolo, "con", textos e links do site |
| Verde claro do símbolo | `#01A98E` | versão sobre fundo escuro |
| Ardósia do wordmark | `#1E282E` | o "clínica" |
| Âmbar dos CTAs | `#FAAB1C` | botão "Testar grátis", estrelas, ícones |

O que ainda é aproximação é o **desenho** do símbolo: o `Logo.jsx` e o
`public/favicon.svg` reconstroem o laço de infinito à mão, a partir do
screenshot. Fica bem parecido em tamanho pequeno, mas o traço interno e os
dois pontinhos do original não estão fiéis. Trocar pelo arquivo oficial é
substituir um `<svg>` em `src/components/Logo.jsx`.

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

## 4. Slides 2 e 3 do carrossel de depoimentos — e as fotos

**Onde:** seção "O que os gestores e médicos dizem sobre nosso sistema" da
home, https://conclinica.com.br/

**O que pegar:** um screenshot dos slides 2 e 3 (o carrossel tem três
bolinhas) e a foto de cada pessoa citada.

**Por que importa:** o slide 1 está conferido e corrigido na página —
**Rafael Gualberto, ortopedia e traumatologia**, com as cinco estrelas. A
versão anterior deste projeto atribuía essa mesma citação a uma "Dra. Marina
Costa", que não existe no site; já foi removida.

Ainda falta resolver o segundo depoimento: a citação sobre integrar cinco
clínicas é real, mas **o autor não foi conferido** (está nos slides 2 ou 3,
que não foram capturados). Por isso ela aparece sem nome, atribuída apenas a
"Gestor de rede — clínica geral, 5 unidades", com um avatar genérico em vez
de iniciais inventadas. Com o slide certo em mãos é uma linha em
`src/content.js`.

As fotos de rosto substituiriam os avatares de iniciais e aumentariam bastante
a credibilidade da seção.

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
- **Tempo de mercado.** Não aparece no site. Os demais números da faixa
  escura já são os oficiais da home (12M+ marcações agendadas, 3M+ pacientes
  atendidos, 10K+ médicos cadastrados, 500+ clientes ativos).
- **Se o teste grátis é de 7 ou 14 dias.** A página usa **7 dias**, que é o
  que aparece no material público da Conclínica (a versão anterior deste
  projeto dizia 14, o que estava errado).
