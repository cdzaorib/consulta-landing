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
      { name: 'Telemedicina', sub: 'Link do Google Meet gerado e enviado ao paciente' },
    ],
  },
  {
    hour: '10h',
    label: 'Consulta',
    title: 'O prontuário se escreve enquanto o profissional atende',
    description:
      'O prontuário com IA transcreve a conversa da consulta e organiza um registro fiel ao atendimento. O profissional olha para o paciente, não para o teclado.',
    features: [
      { name: 'Prontuário com IA', sub: 'A conversa vira documentação clínica estruturada' },
      { name: 'Laudos e exames', sub: 'Resultados e anexos vinculados ao paciente' },
      { name: 'Assinatura digital', sub: 'Receitas e documentos com validade legal' },
      { name: 'Histórico completo', sub: 'Todo o percurso do paciente em uma tela' },
    ],
  },
  {
    hour: '17h',
    label: 'Fechamento',
    title: 'O caixa fecha sozinho, com os números certos',
    description:
      'Cobranças, convênios e repasses são lançados junto com o atendimento. No fim do dia os relatórios já mostram o que entrou, o que falta receber e onde está a glosa.',
    features: [
      { name: 'Contas a pagar e receber', sub: 'Fluxo de caixa da clínica em tempo real' },
      { name: 'Repasse por profissional', sub: 'Quanto cabe a cada um, calculado automaticamente' },
      { name: 'Faturamento TISS', sub: 'Guias enviadas direto às operadoras' },
      { name: 'Controle de glosas', sub: 'Importação de demonstrativos XML e auditoria' },
    ],
  },
];

/* -------------------------------------------------------------------------
   Números
   Fonte: conclinica.com.br — redução de faltas de até 40% com confirmação
   automática; agendamento online 24h; teste grátis de 7 dias; conformidade
   LGPD/CFM com backup diário na AWS.
   ------------------------------------------------------------------------- */

export const METRICS = [
  {
    id: 'faltas',
    prefix: 'até ',
    target: 40,
    suffix: '%',
    caption: 'menos faltas na agenda com a confirmação automática de consultas',
  },
  {
    id: 'agenda',
    staticValue: '24h',
    caption: 'de agendamento online: o paciente marca sozinho, fora do horário da recepção',
  },
  {
    id: 'teste',
    target: 7,
    suffix: ' dias',
    caption: 'de teste grátis, com a clínica rodando de verdade e sem instalar nada',
  },
  {
    id: 'conformidade',
    staticValue: 'LGPD',
    caption: 'e normas do CFM: dados criptografados na nuvem, com backup diário na AWS',
  },
];

/* -------------------------------------------------------------------------
   Depoimentos
   As duas citações vêm do material público da Conclínica. Os nomes vieram da
   versão anterior deste projeto e devem ser conferidos com a empresa antes da
   apresentação.
   ------------------------------------------------------------------------- */

export const TESTIMONIALS = [
  {
    quote:
      'O Conclínica me ajudou muito ao permitir uma integração completa das minhas 5 clínicas.',
    initials: 'PB',
    name: 'Dr. Pedro Baches',
    role: 'Clínica geral — 5 unidades',
  },
  {
    quote:
      'Houve uma otimização nos processos de atendimento aos pacientes, além de mais segurança na emissão dos documentos entregues a eles.',
    initials: 'MC',
    name: 'Dra. Marina Costa',
    role: 'Odontologia — 3 profissionais',
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
   Fonte: conclinica.com.br/planos — quatro planos (Essencial, Gestão,
   Performance e Enterprise) com as descrições da própria empresa.
   Os valores não estão publicados no site e por isso não aparecem aqui.
   ------------------------------------------------------------------------- */

export const PLANS = [
  {
    name: 'Essencial',
    pitch: 'Para quem está começando a organizar o consultório com mais praticidade e controle.',
    badge: 'Consultório',
    features: [
      'Agenda online e agendamento pelo paciente',
      'Prontuário eletrônico',
      'Cadastro e histórico de pacientes',
      'Relatórios básicos de atendimento',
    ],
    cta: 'Começar teste grátis',
    variant: 'ghost',
  },
  {
    name: 'Gestão',
    pitch: 'Assinatura digital, faturamento TISS e comunicação com o paciente para destravar a rotina.',
    badge: 'Mais escolhido por clínicas pequenas',
    features: [
      'Tudo do plano Essencial',
      'Faturamento TISS e envio de guias',
      'Assinatura digital de documentos',
      'Confirmação automática por WhatsApp, SMS e e-mail',
    ],
    cta: 'Começar teste grátis',
    variant: 'primary',
    featured: true,
  },
  {
    name: 'Performance',
    pitch: 'Gestão financeira completa, estoque e marketing para clínicas que querem crescer com estrutura.',
    badge: 'Clínica',
    features: [
      'Tudo do plano Gestão',
      'Financeiro completo, repasses e glosas',
      'Controle de estoque de materiais',
      'Campanhas de e-mail e SMS marketing',
    ],
    cta: 'Começar teste grátis',
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
    title: 'Empresa',
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
