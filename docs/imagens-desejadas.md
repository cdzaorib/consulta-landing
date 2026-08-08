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

## 3. As três telas do produto em resolução cheia

| Bloco | Tela | Página de origem |
| --- | --- | --- |
| 08h — Abertura | Agenda do dia com os status | https://conclinica.com.br/agenda-medica/ |
| 10h — Consulta | Prontuário eletrônico com IA | https://conclinica.com.br/software-medico-clinica/ |
| 17h — Fechamento | Cobrança / novo boleto | https://conclinica.com.br/gestao-clinicas/controle-financeiro/ |

**Estado atual:** os três blocos da seção "Um dia na clínica" já mostram um
recorte de cada tela, reconstruído em HTML/CSS a partir dos seus screenshots
(`src/components/DayScreen.jsx`). Os rótulos, os status e a ordem dos campos
são os reais:

- agenda: "Em atendimento", "Não confirmado", "Em espera", "Livre", com os
  pacientes e convênios da tela (João Silva/Particular, Gustavo Freitas/Amil,
  Eliana Gonçalves/Bradesco)
- prontuário: Profissional, Especialidade, Queixa principal e o grupo
  "Detalhes do histórico" com Anamnese, Prescrição e Pedidos de exames
- cobrança: Cobrança, Descrição, Data, Valor e os botões Cancelar / Gerar
  boleto

**Por que ainda vale pegar as imagens:** é reconstrução, não captura — a
tipografia, os ícones da barra lateral e o visual real do sistema não estão
ali. Com os arquivos, cada `<DayScreen>` vira um `<img>`.

Vale também a tela de laudos, se a seção crescer:
https://conclinica.com.br/laudos-e-exames/

## 4. Fotos dos clientes dos depoimentos

**Onde:** seção "O que os gestores e médicos dizem sobre nosso sistema" da
home, https://conclinica.com.br/

**O que pegar:** a foto de rosto de **Rafael Gualberto**, **Leonardo Daumas**
e **Dr. Pedro Baches**.

**Por que importa:** os três slides do carrossel já estão na página, com a
citação integral, a especialidade e as cinco estrelas de cada um. Só os
avatares seguem como iniciais em círculo (`RG`, `LD`, `PB`). Foto real
aumenta bastante a credibilidade da seção.

**Histórico:** a versão anterior deste projeto atribuía a citação do Rafael
Gualberto a uma "Dra. Marina Costa", que não existe no site — já foi
corrigido. O "Dr. Pedro Baches", que eu havia removido por não conseguir
conferir, é real: está no slide 3.

## 5. Logos de clínicas clientes

**Onde:** home, https://conclinica.com.br/ — carrossel "Clínicas e
consultórios que confiam em nossos serviços" (aparece logo depois da grade de
recursos; um dos clientes visíveis é a Clínica Otto Sinus).

**O que pegar:** os logos, com autorização de uso.

**Por que importa:** a faixa da nossa página hoje lista especialidades em
texto ("Clínica geral", "Odontologia"...). Logos reais de clínicas clientes
seriam prova social de verdade no lugar de uma lista genérica — e o site já
tem esse carrossel pronto.

## 6. URLs de 13 links do rodapé

**Onde:** rodapé de https://conclinica.com.br/ — basta abrir cada acordeão e
copiar o endereço de cada link.

**O que falta:** os rótulos e a estrutura das quatro colunas já estão
corretos, mas 13 endereços não foram capturados. Eles estão marcados com
`pending: true` em `src/content.js` e apontam para a home até serem
preenchidos:

| Coluna | Links pendentes |
| --- | --- |
| Soluções | Cobrança inteligente, Controle de estoque, Faturamento, Relatórios gerenciais |
| Suporte | Quem somos, Termos de uso, Mapa do site, Mapa do blog |
| Conteúdo | Materiais gratuitos, Casos de sucesso, CID 10, Vídeos |
| Contato | Contato |

Os outros nove já apontam para a página certa (agenda médica, controle
financeiro, laudos e exames, prontuário eletrônico, planos, demonstração,
blog, área do cliente e central de ajuda).

## 7. Posts reais da seção "Fique por dentro"

**Onde:** https://conclinica.com.br/blog/

**O que pegar:** título, resumo, categoria, imagem de capa e URL dos três
posts que o carrossel exibe.

**Por que importa:** a seção já está na página. O primeiro card é o post real
do carrossel (telemedicina), com o resumo e a categoria do site. Os outros
dois têm título e URL reais colhidos do próprio site, mas **o resumo e a
categoria deles foram escritos aqui** a partir do tema. As capas são um
degradê da paleta, já que as fotos dos artigos não estão no repositório.

## 8. URLs das redes sociais

**Onde:** rodapé de https://conclinica.com.br/ — há ícones de Instagram,
Facebook, YouTube e TikTok.

**O que pegar:** o link de cada perfil.

**Por que importa:** o rodapé da página já traz os contatos reais (WhatsApp,
telefone e e-mail comercial), mas ficou sem as redes porque eu não tinha as
URLs e não faria sentido chutar o @ de cada perfil.

## 9. Imagem de compartilhamento (Open Graph)

**Estado atual:** já existe. `public/og.png` (1200×630) é gerado por
`npm run og`, a partir dos mesmos tokens do design system — fundo sálvia
escuro com os halos, o lockup, a headline em Fraunces e os três números
oficiais. As meta tags `og:` e `twitter:card` estão no `index.html`.

**O que ainda falta:**

1. Trocar o laço reconstruído pelo logo oficial no
   `scripts/make-og.mjs` e rodar `npm run og` de novo.
2. **Na hora de publicar**, apontar `og:image` para a URL absoluta do
   domínio final. WhatsApp e Facebook não montam o card com caminho
   relativo. Está sinalizado num comentário no `index.html`.

---

## Dados a confirmar com a empresa

Coisas que ficaram de fora por não estarem publicadas:

- **Preço do plano Enterprise.** Os outros três já estão na página com o
  valor oficial (Essencial R$ 89, Gestão R$ 119, Performance R$ 169, sempre
  por profissional de saúde). O Enterprise aparece na página de planos mas o
  screenshot cortou antes do valor — hoje ele entra como faixa "Falar com a
  equipe".
- **Periodicidade do preço.** A página de planos diz "por profissional de
  saúde" sem dizer se é mensal ou anual. A nossa página repete exatamente o
  mesmo texto, sem inventar "/mês".
- **Tempo de mercado.** Não aparece no site. Os demais números da faixa
  escura já são os oficiais da home (12M+ marcações agendadas, 3M+ pacientes
  atendidos, 10K+ médicos cadastrados, 500+ clientes ativos).
- **Se o teste grátis é de 7 ou 14 dias.** A página usa **7 dias**, que é o
  que aparece no material público da Conclínica (a versão anterior deste
  projeto dizia 14, o que estava errado).
