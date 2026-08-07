import { motion } from 'framer-motion';
import AgendaWidget from './AgendaWidget.jsx';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion.js';
import { IconPaper, IconCalendarCheck, IconWallet } from './Icons.jsx';
import './Hero.css';

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};

/* Três provas curtas, escaneáveis antes de qualquer rolagem */
const PROOFS = [
  { Icon: IconPaper, text: 'Sem ficha de papel' },
  { Icon: IconCalendarCheck, text: 'Menos faltas' },
  { Icon: IconWallet, text: 'Caixa em dia' },
];

export default function Hero() {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <section className="hero">
      <div className="wrap hero-grid">
        <motion.div
          variants={container}
          initial={reduceMotion ? false : 'hidden'}
          animate="visible"
        >
          <motion.div className="eyebrow" variants={item}>
            Sistema de gestão para clínicas
          </motion.div>

          <motion.h1 variants={item}>
            Sua clínica sem papel, sem planilha e <em>sem horário vago</em>.
          </motion.h1>

          <motion.p className="lead" variants={item}>
            Agenda, prontuário e financeiro no mesmo lugar — para a sua equipe parar de correr
            atrás de ficha, de confirmação e de pagamento em aberto.
          </motion.p>

          <motion.ul className="hero-proofs" variants={item}>
            {PROOFS.map(({ Icon, text }) => (
              <li key={text}>
                <Icon className="icon hero-proof-icon" />
                {text}
              </li>
            ))}
          </motion.ul>

          <motion.div className="hero-actions" variants={item}>
            <a href="#planos" className="btn btn-primary btn-lg">Testar 14 dias grátis</a>
            <a href="#antes-depois" className="btn btn-ghost btn-lg">Ver o que muda</a>
          </motion.div>

          <motion.p className="hero-note" variants={item}>
            Sem cartão de crédito. Leva menos de um dia para começar a usar.
          </motion.p>
        </motion.div>

        <motion.div
          className="hero-widget"
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          <AgendaWidget />
        </motion.div>
      </div>
    </section>
  );
}
