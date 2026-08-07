import { motion } from 'framer-motion';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion.js';
import {
  IconPaper,
  IconCalendarX,
  IconSpreadsheet,
  IconWallet,
  IconCheck,
  IconArrowRight,
} from './Icons.jsx';
import './BeforeAfter.css';

/**
 * Cada linha é um par: o jeito que a clínica funciona hoje (à esquerda,
 * dessaturado) e como passa a funcionar (à direita, em cor cheia).
 * O contraste de cor é o que carrega o significado — mas cada lado também
 * tem rótulo e ícone próprios, para não depender de cor sozinha.
 */
const PAIRS = [
  {
    Icon: IconPaper,
    before: 'Ficha de papel que some, rasura e só existe numa gaveta',
    after: 'Prontuário digital, com o histórico inteiro do paciente a um clique',
  },
  {
    Icon: IconCalendarX,
    before: 'Paciente que esquece e não avisa — horário perdido',
    after: 'Confirmação automática no WhatsApp na véspera da consulta',
  },
  {
    Icon: IconSpreadsheet,
    before: 'Planilha de horários que a recepção atualiza na mão',
    after: 'Agenda que se reorganiza sozinha, com encaixe e fila em tempo real',
  },
  {
    Icon: IconWallet,
    before: 'Fechamento do caixa no fim do mês, sem saber quem ficou devendo',
    after: 'Entradas, repasses e inadimplência visíveis todo dia',
  },
];

const rowVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

export default function BeforeAfter() {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <section id="antes-depois" className="ba-section">
      <div className="wrap">
        <div className="day-header">
          <div className="eyebrow">O que muda na prática</div>
          <h2>O mesmo consultório, funcionando de outro jeito</h2>
          <p>
            Não é sobre ter mais um sistema. É sobre parar de perder tempo, paciente e dinheiro
            em quatro pontos que toda clínica pequena conhece bem.
          </p>
        </div>

        <motion.div
          className="ba-table"
          initial={reduceMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={listVariants}
        >
          <div className="ba-heads" aria-hidden="true">
            <div className="ba-head before">Como costuma ser</div>
            <div className="ba-head after">Com o Consulta</div>
          </div>

          {PAIRS.map(({ Icon, before, after }) => (
            <motion.div className="ba-row" key={before} variants={rowVariants}>
              <div className="ba-cell before">
                <Icon className="icon ba-icon" />
                <span>{before}</span>
              </div>

              <div className="ba-arrow" aria-hidden="true">
                <IconArrowRight className="icon" />
              </div>

              <div className="ba-cell after">
                <IconCheck className="icon ba-icon" />
                <span>{after}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
