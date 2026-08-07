import { motion } from 'framer-motion';
import AgendaWidget from './AgendaWidget.jsx';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion.js';
import './Hero.css';

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

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
          <motion.div className="eyebrow" variants={item}>Sistema de gestão para clínicas</motion.div>
          <motion.h1 variants={item}>
            A agenda, o prontuário e o financeiro da sua clínica, <em>sincronizados</em>.
          </motion.h1>
          <motion.p className="lead" variants={item}>
            O Consulta organiza o dia inteiro do consultório — do check-in do paciente ao fechamento do caixa —
            para que sua equipe pare de correr atrás de papel e planilha.
          </motion.p>
          <motion.div className="hero-actions" variants={item}>
            <a href="#planos" className="btn btn-primary">Começar teste grátis</a>
            <a href="#dia" className="btn btn-ghost">Ver como funciona</a>
          </motion.div>
          <motion.div className="hero-note" variants={item}>
            <div className="avatars"><span /><span /><span /></div>
            Usado por clínicas e consultórios em todo o Brasil
          </motion.div>
        </motion.div>

        <AgendaWidget />
      </div>
    </section>
  );
}
