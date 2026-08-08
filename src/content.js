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
      'Confirmação automática por WhatsApp, SMS ou e-mail — e fila de espera para encaixar quem estava aguardando.',
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
   Especialidades
   ------------------------------------------------------------------------- */

export const SPECIALTIES = [
  'Clínica geral',
  'Odontologia',
  'Fisioterapia',
  'Psicologia',
  'Dermatologia',
  'Nutrição',
];

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
      'A recepção confirma as consultas do dia automaticamente, remaneja quem cancelou usando a fila de espera e mantém a agenda cheia — sem ficha de papel e sem planilha de horários.',
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
      'O prontuário com IA transcreve a conversa da consulta e organiza um registro fiel ao atendimento. O profissional olha para o paciente, não para o teclado.',
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
   Fonte: faixa de estatísticas da home da Conclínica (conferida em
   screenshot do site): 12M+ marcações agendadas, 3M+ pacientes atendidos,
   10K+ médicos cadastrados e 500+ clientes ativos.

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
    role: 'Ortopedia e traumatologia — 5 unidades',
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
   o selo "Mais vendido" e o CTA são os do site, conferidos em screenshot.
   O preço é por profissional de saúde, não por clínica.
   ------------------------------------------------------------------------- */

export const PLANS = [
  {
    name: 'Essencial',
    price: 'R$ 89',
    unit: 'por profissional de saúde',
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
    unit: 'por profissional de saúde',
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
    unit: 'por profissional de saúde',
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
];

export const ENTERPRISE = {
  name: 'Enterprise',
  pitch: 'Integração via API e gestão multiunidades para redes que estão em expansão.',
  cta: 'Falar com a equipe',
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

/* As colunas seguem a arquitetura do rodapé oficial (Soluções, Conteúdo,
   Suporte e Contato). */

export const FOOTER_COLUMNS = [
  {
    title: 'Soluções',
    links: [
      { label: 'Agenda médica', href: 'https://conclinica.com.br/agenda-medica/' },
      { label: 'Prontuário eletrônico', href: 'https://conclinica.com.br/software-medico-clinica/' },
      { label: 'Laudos e exames', href: 'https://conclinica.com.br/laudos-e-exames/' },
      { label: 'Controle financeiro', href: 'https://conclinica.com.br/gestao-clinicas/controle-financeiro/' },
    ],
  },
  {
    title: 'Conteúdo',
    links: [
      { label: 'Gestão de clínicas', href: 'https://conclinica.com.br/gestao-clinicas/' },
      { label: 'Planos', href: 'https://conclinica.com.br/planos/' },
      { label: 'Blog', href: 'https://conclinica.com.br/blog/' },
      { label: 'Demonstração', href: 'https://conclinica.com.br/demonstracao-software-medico/' },
    ],
  },
  {
    title: 'Suporte',
    links: [
      { label: 'Central de ajuda', href: 'https://help.conclinica.com.br/pt-BR' },
      { label: 'Área do cliente', href: 'https://app.conclinica.com.br/' },
      { label: 'Teste grátis', href: 'https://conclinica.com.br/ativar-teste-gratuito/' },
    ],
  },
];

/* Contatos conferidos no rodapé do site. */

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
