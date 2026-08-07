import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import BeforeAfter from './components/BeforeAfter.jsx';
import Metrics from './components/Metrics.jsx';
import LogosStrip from './components/LogosStrip.jsx';
import DaySection from './components/DaySection.jsx';
import LiveProduct from './components/LiveProduct.jsx';
import Testimonials from './components/Testimonials.jsx';
import Plans from './components/Plans.jsx';
import FinalCta from './components/FinalCta.jsx';
import Footer from './components/Footer.jsx';

const DAY_BLOCKS = [
  {
    hour: '08h',
    label: 'Abertura',
    title: 'O paciente chega e a recepção já sabe quem é',
    description: 'A confirmação sai por WhatsApp na véspera, o paciente faz check-in por QR Code e entra sozinho na fila — sem ficha de papel e sem alguém reescrevendo a tabela de horários.',
    features: [
      { name: 'Agenda online', sub: 'Confirmação automática via WhatsApp' },
      { name: 'Fila inteligente', sub: 'Encaixes e reordenação em tempo real' },
      { name: 'Telemedicina', sub: 'Link de chamada gerado automaticamente' },
      { name: 'Agendamento seriado', sub: 'Sessões recorrentes em um único passo' },
    ],
  },
  {
    hour: '10h',
    label: 'Consulta',
    title: 'O prontuário se escreve enquanto o médico atende',
    description: 'A conversa da consulta vira documentação clínica estruturada no modelo de registro de cada especialidade — o profissional olha para o paciente, não para o teclado.',
    features: [
      { name: 'Prontuário eletrônico', sub: 'Modelos por especialidade' },
      { name: 'Transcrição assistida', sub: 'Conversa vira registro estruturado' },
      { name: 'Histórico centralizado', sub: 'Todo o histórico do paciente em um lugar' },
      { name: 'Laudos e exames', sub: 'Anexos e resultados vinculados ao caso' },
    ],
  },
  {
    hour: '17h',
    label: 'Fechamento',
    title: 'O caixa fecha sozinho, com os números certos',
    description: 'Cobranças, convênios e repasses são lançados direto na agenda. No fim do dia os relatórios já mostram o que entrou, o que falta receber e onde está a inadimplência.',
    features: [
      { name: 'Cobrança recorrente', sub: 'Boletos automáticos, pontuais ou fixos' },
      { name: 'Controle financeiro', sub: 'Entradas, saídas e repasses por profissional' },
      { name: 'Faturamento TISS', sub: 'Guias de convênio sem retrabalho' },
      { name: 'Relatórios gerenciais', sub: 'Visão da clínica em tempo real' },
    ],
  },
];

export default function App() {
  return (
    <>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <Header />

      <main id="conteudo">
        <Hero />

        {/* O "antes x depois" vem logo após o hero: é a primeira coisa
            depois da promessa, não um detalhe no fim da página. */}
        <BeforeAfter />
        <Metrics />

        <LogosStrip />

        <section id="dia">
          <div className="wrap">
            <div className="day-header">
              <div className="eyebrow">Como funciona</div>
              <h2>Um sistema, o dia inteiro da clínica</h2>
              <p>Em vez de módulos soltos, o Consulta acompanha o fluxo real de um dia de atendimento — da chegada do primeiro paciente ao fechamento do caixa.</p>
            </div>

            {DAY_BLOCKS.map((block) => (
              <DaySection key={block.hour} {...block} />
            ))}
          </div>
        </section>

        <LiveProduct />
        <Testimonials />
        <Plans />
        <FinalCta />
      </main>

      <Footer />
    </>
  );
}
