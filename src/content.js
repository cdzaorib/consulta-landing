/**
 * Conteúdo da landing page.
 *
 * Os textos, funcionalidades e números vêm do material público da própria
 * Conclínica. As URLs de origem estão anotadas em cada bloco para facilitar a
 * conferência antes da apresentação.
 */

export const SITE = {
  name: 'Conclínica',
  trialUrl: 'https://app.conclinica.com.br/cliente/cadastro/novo',
  demoUrl: 'https://conclinica.com.br/demonstracao-software-medico/',
  loginUrl: 'https://app.conclinica.com.br/',
  plansUrl: 'https://conclinica.com.br/planos/',
  helpUrl: 'https://help.conclinica.com.br/pt-BR',
};

export const NAV = [
  { href: '#mudanca', label: 'O que muda' },
  { href: '#dia', label: 'Um dia na clínica' },
  { href: '#numeros', label: 'Números' },
  { href: '#planos', label: 'Planos' },
];

/* -------------------------------------------------------------------------
   Hero
   Fonte: conclinica.com.br — "prontuário com IA, faturamento TISS e agenda
   online"; teste grátis de 7 dias.
   ------------------------------------------------------------------------- */

export const HERO = {
  eyebrow: 'Sistema de gestão para clínicas',
  titleStart: 'A agenda, o prontuário e o caixa da sua clínica ',
  titleEm: 'num lugar só',
  titleEnd: '.',
  lead:
    'Agenda online, prontuário eletrônico com IA, faturamento TISS e financeiro integrados. ' +
    'Feito para clínicas e consultórios que não têm um time de TI para chamar de seu.',
  primaryCta: 'Começar teste grátis de 7 dias',
  secondaryCta: 'Ver como funciona',
  note: 'Tudo na nuvem, em conformidade com a LGPD e as normas do CFM.',
};

/* -------------------------------------------------------------------------
   Antes × depois — o argumento central para uma clínica pequena
   Fonte: páginas de agenda médica, no-show, gestão de filas e controle
   financeiro do site da Conclínica.
   ------------------------------------------------------------------------- */

export const SHIFTS = [
  {
    id: 'papel',
    theme: 'Papel',
    before: 'Ficha de papel na gaveta, agenda de caderno e o histórico do paciente espalhado entre pastas.',
    after:
      'Prontuário eletrônico único, com a conversa da consulta virando registro estruturado automaticamente.',
    chip: 'zero ficha de papel',
  },
  {
    id: 'faltas',
    theme: 'Faltas',
    before: 'O paciente esquece a consulta, ninguém avisa, e o horário vazio vira prejuízo do dia.',
    after:
      'Confirmação automática por WhatsApp, SMS ou e-mail, com fila de espera para encaixar quem estava aguardando.',
    chip: 'até 40% menos faltas',
  },
  {
    id: 'planilha',
    theme: 'Planilha',
    before: 'A secretária remarca por telefone, confere planilha e ainda assim dois pacientes caem no mesmo horário.',
    after:
      'Agendamento online aberto 24 horas, bloqueio de horário que evita sobreposição e encaixe em poucos cliques.',
    chip: 'agenda aberta 24h',
  },
  {
    id: 'financeiro',
    theme: 'Financeiro',
    before: 'Fechar o mês no domingo, somando recibo por recibo para descobrir quanto sobrou.',
    after:
      'Contas a pagar e a receber, repasse por profissional e relatórios que se atualizam sozinhos.',
    chip: 'um painel financeiro',
  },
];

/* -------------------------------------------------------------------------
   Prova social
   Título e lista de clientes vêm do carrossel "Clínicas e consultórios que
   confiam em nossos serviços" da home.

   São doze clientes. Os quatro cujo arquivo de logo foi extraído do PDF de
   referência aparecem como imagem; os outros oito entram como texto, porque
   desenhar um logo de memória seria inventar a marca de outra empresa. Basta
   salvar o arquivo em public/images/clientes/ e mover o nome de `others`
   para `logos`.
   ------------------------------------------------------------------------- */

export const CLIENTS = {
  title: 'Clínicas e consultórios que confiam em nossos serviços',
  logos: [
    { name: 'MedNil — Centro de Especialidades Integradas de Nilópolis', src: '/images/clientes/mednil.webp', w: 440, h: 203 },
    { name: 'NitMed Centro Médico', src: '/images/clientes/nitmed.webp', w: 384, h: 96 },
    { name: 'Clínica Médica Itacibá', src: '/images/clientes/itaciba.webp', w: 276, h: 160 },
    { name: 'Clínica Icaraí', src: '/images/clientes/icarai.webp', w: 220, h: 85 },
  ],
  others: [
    'Clínica SOU',
    'Oftalmologia SEO',
    'Otto Sinus',
    'Genutarso',
    'DoutorTem',
    'De Luca',
    'Conit',
    'Clínica do Sono',
  ],
};

/* -------------------------------------------------------------------------
   Um dia na clínica
   Fonte: páginas de agenda médica, prontuário com IA, faturamento TISS,
   controle financeiro e estoque da Conclínica.

   O campo `screen` reconstrói em HTML/CSS o recorte da tela real que aparece
   nos screenshots do produto — mesmos rótulos, mesmos status e mesma ordem
   dos campos. Não é captura: é uma reconstrução, para dar ideia da interface
   enquanto as imagens oficiais não entram no repositório.
   ------------------------------------------------------------------------- */

export const DAY_BLOCKS = [
  {
    hour: '08h',
    label: 'Abertura',
    title: 'O paciente chega e o sistema já sabe quem é',
    description:
      'A recepção confirma as consultas do dia automaticamente, remaneja quem cancelou usando a fila de espera e mantém a agenda cheia, sem ficha de papel e sem planilha de horários.',
    features: [
      { name: 'Agenda online', sub: 'Confirmação automática por WhatsApp, SMS ou e-mail' },
      { name: 'Fila de espera', sub: 'Encaixe rápido quando alguém cancela' },
      { name: 'Bloqueio de horários', sub: 'Evita sobreposição e marcação indesejada' },
      { name: 'Telemedicina', sub: 'Videochamada de onde estiver, com assinatura digital' },
    ],
    screen: {
      kind: 'agenda',
      title: 'Agenda do dia',
      caption: 'Seg | 27/07',
      rows: [
        { time: '09:00', status: 'Em atendimento', tone: 'live', name: 'João Silva', tag: 'Particular · Consulta' },
        { time: '09:30', status: 'Não confirmado', tone: 'pending', name: 'Gustavo Freitas', tag: 'Amil · Consulta' },
        { time: '09:30', status: 'Em espera', tone: 'waiting', name: 'Carlos Gomes', tag: 'Particular · Consulta' },
        { time: '10:00', status: 'Livre', tone: 'free' },
        { time: '10:00', status: 'Não confirmado', tone: 'pending', name: 'Eliana Gonçalves', tag: 'Bradesco · Cirurgia' },
      ],
    },
  },
  {
    hour: '10h',
    label: 'Consulta',
    title: 'O prontuário se escreve enquanto o profissional atende',
    description:
      'O prontuário com IA transcreve a conversa da consulta e organiza um registro fiel ao atendimento. A digitação sai do meio da consulta.',
    features: [
      { name: 'Assistente IA', sub: 'Anotações completas em segundos, sem digitar' },
      { name: 'Prontuário configurável', sub: 'Anamnese, prescrição e pedidos do seu jeito' },
      { name: 'Laudos e exames', sub: 'Resultados e anexos vinculados ao paciente' },
      { name: 'Assinatura digital', sub: 'Receitas e documentos com validade legal' },
    ],
    screen: {
      kind: 'prontuario',
      title: 'Prontuário do paciente',
      caption: '24 de junho de 2026',
      fields: [
        { label: 'Profissional', value: 'Dr. Luiz Gustavo' },
        { label: 'Especialidade', value: 'Cardiologia' },
        { label: 'Queixa principal', value: 'Dores leves no peito' },
      ],
      groupTitle: 'Detalhes do histórico',
      group: ['Anamnese', 'Prescrição', 'Pedidos de exames'],
    },
  },
  {
    hour: '17h',
    label: 'Fechamento',
    title: 'O caixa fecha sozinho, com os números certos',
    description:
      'Cobranças, convênios e repasses são lançados junto com o atendimento. No fim do dia os relatórios já mostram o que entrou, o que falta receber e onde está a glosa.',
    features: [
      { name: 'Cobrança online', sub: 'Cartão, boleto ou pix, com cobrança recorrente' },
      { name: 'Contas a pagar e receber', sub: 'Fluxo de caixa da clínica em tempo real' },
      { name: 'Repasse por profissional', sub: 'Quanto cabe a cada um, calculado automaticamente' },
      { name: 'Faturamento TISS', sub: 'Guias às operadoras e controle de glosas' },
    ],
    screen: {
      kind: 'boleto',
      title: 'Adicionar novo boleto',
      caption: 'Cobrança inteligente',
      fields: [
        { label: 'Cobrança', value: 'Maria dos Santos' },
        { label: 'Descrição', value: 'Consulta' },
      ],
      pair: [
        { label: 'Data', value: '12/06/2026' },
        { label: 'Valor', value: 'R$ 290,00' },
      ],
      actions: ['Cancelar', 'Gerar boleto'],
    },
  },
];

/* -------------------------------------------------------------------------
   Números
   Fonte: faixa de estatísticas da home, lida num screenshot do site em que
   os contadores já haviam terminado de animar: 12M+ marcações agendadas,
   3M+ pacientes atendidos, 10K+ médicos cadastrados e 500+ clientes ativos.

   ATENÇÃO: no PDF de referência esses mesmos contadores aparecem como
   "0M+ / 0K+ / 0+", porque a captura pegou o estado inicial da animação.
   Os zeros do PDF não são os valores reais — não substituir por eles.

   As demais promessas (até 40% menos faltas, agenda aberta 24h) ficam nos
   chips da seção "antes x depois", onde têm mais contexto.
   ------------------------------------------------------------------------- */

export const METRICS = [
  { id: 'marcacoes', target: 12, suffix: 'M+', caption: 'marcações agendadas' },
  { id: 'pacientes', target: 3, suffix: 'M+', caption: 'pacientes atendidos' },
  { id: 'medicos', target: 10, suffix: 'K+', caption: 'médicos cadastrados' },
  { id: 'clientes', target: 500, suffix: '+', caption: 'clínicas e consultórios ativos' },
];

/* -------------------------------------------------------------------------
   Depoimentos

   Os dois estão conferidos contra o carrossel "O que os gestores e médicos
   dizem sobre nosso sistema" da home: citação integral, nome, especialidade
   e as cinco estrelas são os do site.
   ------------------------------------------------------------------------- */

export const TESTIMONIALS = [
  {
    quote:
      'Através do Conclínica houve uma otimização nos processos de atendimento aos pacientes, além de mais segurança na emissão dos documentos entregues aos mesmos.',
    initials: 'RG',
    name: 'Rafael Gualberto',
    role: 'Ortopedia e traumatologia',
    rating: 5,
  },
  {
    quote:
      'O Conclínica deu mais agilidade e controle nas marcações, atendimento e nas descrições clínicas, abolindo as fichas e papéis, facilitando o trabalho do médico e das secretárias.',
    photo: '/images/depoimentos/leonardo-daumas.jpg',
    initials: 'LD',
    name: 'Leonardo Daumas',
    role: 'Pediatra, endocrino e pneumologista',
    rating: 5,
  },
  {
    quote:
      'O Conclínica me ajudou muito ao permitir uma integração completa das minhas 5 clínicas. Posso cuidar da gestão de todas remotamente, com muita facilidade e transparência.',
    initials: 'PB',
    name: 'Dr. Pedro Baches',
    role: 'Ortopedia e traumatologia · 5 unidades',
    rating: 5,
  },
];

export const TRUST_CARD = {
  title: 'Seguro por padrão',
  intro: 'Nada disso depende de um servidor na sala da clínica.',
  items: [
    'Prontuário em conformidade com CFM e LGPD',
    'Criptografia e controle de acesso por níveis',
    'Backup diário automático em servidor AWS',
    'Telemedicina dentro das normas vigentes',
  ],
};

/* -------------------------------------------------------------------------
   Planos
   Fonte: conclinica.com.br/planos — preços, descrições, listas de recursos,
   o selo "Mais vendido" e o CTA são os do site.
   O preço é por profissional de saúde e por mês, não por clínica.
   O Enterprise tem preço fixo publicado (R$ 299); não é "sob consulta".
   ------------------------------------------------------------------------- */

export const PLANS = [
  {
    name: 'Essencial',
    price: 'R$ 89',
    unit: 'por mês, por profissional de saúde',
    pitch:
      'Organize sua agenda e comece a digitalizar sua clínica. Reúne as funcionalidades básicas para quem está iniciando a gestão do consultório com mais praticidade e controle.',
    features: [
      'Agenda inteligente',
      'Cadastro de pacientes',
      'Prontuário eletrônico',
      'Prescrição digital',
      'Telemedicina',
      'Caixa (emissão de recibo)',
      'Relatórios simples',
      'Suporte via chat',
    ],
    cta: 'Testar agora',
    variant: 'ghost',
  },
  {
    name: 'Gestão',
    price: 'R$ 119',
    unit: 'por mês, por profissional de saúde',
    badge: 'Mais vendido',
    pitch:
      'Automatize processos e ganhe eficiência no dia a dia. Reúne assinatura digital, faturamento TISS e comunicação com o paciente para otimizar a rotina da clínica.',
    inherits: 'Essencial',
    features: [
      'Agendamento online',
      'Assinatura digital',
      'Faturamento TISS',
      'Emissão de nota fiscal (NFS-e)',
      'Confirmação via WhatsApp (Zenvia)',
      'Suporte via chat e telefone',
    ],
    cta: 'Testar agora',
    variant: 'primary',
    featured: true,
  },
  {
    name: 'Performance',
    price: 'R$ 169',
    unit: 'por mês, por profissional de saúde',
    pitch:
      'Tenha controle da operação e decida com mais estratégia. Reúne gestão financeira completa, estoque e marketing para clínicas que buscam crescimento com estrutura.',
    inherits: 'Gestão',
    features: [
      'Financeiro completo (contas a pagar e receber)',
      'Cobrança inteligente',
      'Repasse médico',
      'Gestão de estoque',
      'Campanhas (e-mail/SMS)',
      'Suporte prioritário 24/7',
    ],
    cta: 'Testar agora',
    variant: 'ghost',
  },
  {
    name: 'Enterprise',
    price: 'R$ 299',
    unit: 'por mês, por profissional de saúde',
    pitch: 'Escale sua clínica com tecnologia e integração avançada.',
    inherits: 'Performance',
    features: [
      'API de integração',
      'Suporte com gestor de conta',
      'Módulo de laboratório (grátis)',
      'Módulo de laudos de imagem (grátis)',
      'NFSe (grátis)',
    ],
    cta: 'Testar agora',
    variant: 'ghost',
  },
];

/** Linha discreta abaixo da grade de planos. */
export const PLANS_NOTE = {
  unit: 'Todos os preços são por profissional de saúde, por mês.',
  custom: 'Clínicas com mais de 10 profissionais têm planos exclusivos sob cotação.',
};

/* -------------------------------------------------------------------------
   CTA final
   ------------------------------------------------------------------------- */

export const FINAL_CTA = {
  eyebrow: 'Comece hoje',
  title: 'Você abriu a clínica para cuidar de paciente, não para fechar planilha.',
  lead:
    'Ative o teste grátis de 7 dias e veja a agenda da semana, o prontuário e o caixa da sua clínica no mesmo lugar. Sem instalar nada no computador da recepção.',
  primaryCta: 'Começar teste grátis de 7 dias',
  secondaryCta: 'Agendar uma demonstração',
  note: 'Se preferir, a gente mostra o sistema funcionando com a rotina da sua clínica.',
};

/* -------------------------------------------------------------------------
   Rodapé
   ------------------------------------------------------------------------- */

/* Colunas e rótulos são os do rodapé oficial, conferidos em screenshot com
   cada acordeão aberto.

   `pending: true` marca o link cujo endereço exato não foi capturado — ele
   aponta para a home até alguém preencher. A lista completa está em
   docs/imagens-desejadas.md. */

const HOME = 'https://conclinica.com.br/';

export const FOOTER_COLUMNS = [
  {
    title: 'Soluções',
    links: [
      { label: 'Agenda médica', href: 'https://conclinica.com.br/agenda-medica/' },
      { label: 'Cobrança inteligente', href: HOME, pending: true },
      { label: 'Controle financeiro', href: 'https://conclinica.com.br/gestao-clinicas/controle-financeiro/' },
      { label: 'Controle de estoque', href: 'https://conclinica.com.br/estoque/' },
      { label: 'Laudos e exames', href: 'https://conclinica.com.br/laudos-e-exames/' },
      { label: 'Faturamento', href: HOME, pending: true },
      { label: 'Prontuário eletrônico', href: 'https://conclinica.com.br/software-medico-clinica/' },
      { label: 'Relatórios gerenciais', href: 'https://conclinica.com.br/relatorios-gerenciais/' },
    ],
  },
  {
    title: 'Suporte',
    links: [
      { label: 'Planos', href: 'https://conclinica.com.br/planos/' },
      { label: 'Quem somos', href: HOME, pending: true },
      { label: 'Termos de uso', href: HOME, pending: true },
      { label: 'Mapa do site', href: HOME, pending: true },
      { label: 'Mapa do blog', href: HOME, pending: true },
    ],
  },
  {
    title: 'Conteúdo',
    links: [
      { label: 'Demonstração', href: 'https://conclinica.com.br/demonstracao-software-medico/' },
      { label: 'Blog para médicos', href: 'https://conclinica.com.br/blog/' },
      { label: 'Materiais gratuitos', href: HOME, pending: true },
      { label: 'Casos de sucesso', href: HOME, pending: true },
      { label: 'CID 10', href: HOME, pending: true },
      { label: 'Vídeos', href: HOME, pending: true },
    ],
  },
  {
    title: 'Contato',
    links: [
      { label: 'Área do cliente', href: 'https://app.conclinica.com.br/' },
      { label: 'Contato', href: HOME, pending: true },
      { label: 'Central de ajuda', href: 'https://help.conclinica.com.br/pt-BR' },
    ],
  },
];

/* -------------------------------------------------------------------------
   Fique por dentro
   Cabeçalho, descrição e o primeiro post (título, resumo e categoria) são os
   da seção "Fique por dentro" da home. Os outros dois posts têm título e URL
   reais, colhidos do próprio site; os resumos e as categorias deles foram
   escritos aqui a partir do tema — trocar pelos originais quando puder.
   ------------------------------------------------------------------------- */

export const BLOG = {
  eyebrow: 'Conteúdo',
  title: 'Fique por dentro',
  lead:
    'Conteúdos e materiais exclusivos sobre sistema de gestão para clínicas, atendimento de pacientes e muito mais.',
  allLabel: 'Ver todos',
  allHref: 'https://conclinica.com.br/blog/',
  posts: [
    {
      tag: 'Gestão, marketing médico',
      title: 'Plataforma de telemedicina: qual a melhor plataforma para consultas online?',
      excerpt:
        'Se você está procurando a melhor plataforma de telemedicina para a sua clínica ou…',
      href: 'https://conclinica.com.br/plataforma-de-telemedicina-qual-a-melhor-plataforma-para-consultas-online/',
    },
    {
      tag: 'Marketing médico',
      title: 'Como organizar campanhas preventivas sem aumentar a carga operacional',
      excerpt:
        'Organizar campanhas preventivas faz parte da estratégia de muitas clínicas que desejam fortalecer o…',
      href: 'https://conclinica.com.br/campanhas-preventivas-em-clinicas/',
    },
    {
      // título e URL são reais; o resumo e a categoria foram escritos aqui
      tag: 'Financeiro',
      title: 'Fluxo de caixa em clínicas médicas: guia prático de gestão',
      excerpt:
        'Como acompanhar entradas, saídas e repasses sem depender de planilha no fim do mês.',
      href: 'https://conclinica.com.br/fluxo-de-caixa-clinica-medica/',
    },
  ],
};

/* Redes sociais e contatos, conferidos no rodapé do site. */

export const SOCIAL = [
  { name: 'Instagram', href: 'https://www.instagram.com/conclinica/', icon: 'instagram' },
  { name: 'Facebook', href: 'https://www.facebook.com/conclinica/', icon: 'facebook' },
  { name: 'YouTube', href: 'https://www.youtube.com/channel/UCNVNLStDqTT_OUBNM7fCfGw', icon: 'youtube' },
  { name: 'TikTok', href: 'https://www.tiktok.com/@conclinica', icon: 'tiktok' },
];

export const CONTACT = {
  title: 'Contato',
  items: [
    {
      label: 'WhatsApp',
      value: '(21) 98578-0169',
      href: 'https://wa.me/5521985780169',
    },
    {
      label: 'Telefone',
      value: '(21) 2292-8539',
      href: 'tel:+552122928539',
    },
    {
      label: 'E-mail',
      value: 'comercial@conclinica.com.br',
      href: 'mailto:comercial@conclinica.com.br',
    },
  ],
};
