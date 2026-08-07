import { motion } from 'framer-motion';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion.js';
import './FinalCta.css';

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function FinalCta() {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <section>
      <motion.div
        className="wrap final-cta"
        initial={reduceMotion ? false : 'hidden'}
        whileInView="visible"
        viewport={{ once: false, amount: 0.4 }}
        variants={container}
      >
        <motion.h2 variants={item}>Organize sua clínica sem sair do WhatsApp e do seu computador</motion.h2>
        <motion.p variants={item}>Teste grátis por 14 dias, sem precisar de cartão de crédito.</motion.p>
        <motion.div className="hero-actions" variants={item}>
          <a href="#" className="btn btn-primary">Começar agora</a>
        </motion.div>
      </motion.div>
    </section>
  );
}
