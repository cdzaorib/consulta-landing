import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import LogosStrip from './components/LogosStrip.jsx';
import DaySection from './components/DaySection.jsx';
import Metrics from './components/Metrics.jsx';
import Testimonials from './components/Testimonials.jsx';
import Plans from './components/Plans.jsx';
import FinalCta from './components/FinalCta.jsx';
import Footer from './components/Footer.jsx';

const DAY_BLOCKS = [
  {
    hour: '08h',
    label: 'Abertura',
    title: 'O paciente chega, o sistema já sabe',
    description: 'A recepção confirma consultas por WhatsApp, o paciente faz check-in por QR Code e entra automaticamente na fila — sem ficha de papel, sem planilha de horários.',
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
    description: 'A conversa da consulta vira documentação clínica estruturada automaticamente, no modelo de registro de cada especialidade — o profissional foca no paciente, não no teclado.',
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
    description: 'Cobranças, convênios e repasses são lançados direto na agenda. No fim do dia, os relatórios já mostram o que entrou, o que falta receber e onde está a inadimplência.',
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
      <Header />
      <main>
        <Hero />
        <LogosStrip />

        <section id="dia">
          <div className="wrap">
            <div className="day-header">
              <div className="eyebrow">Como funciona</div>
              <h2>Um sistema, o dia inteiro da clínica</h2>
              <p>Em vez de módulos soltos, o Conclínica acompanha o fluxo real de um dia de atendimento — da chegada do primeiro paciente ao fechamento do caixa.</p>
            </div>

            {DAY_BLOCKS.map((block) => (
              <DaySection key={block.hour} {...block} />
            ))}
          </div>
        </section>

        <Metrics />
        <Testimonials />
        <Plans />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
