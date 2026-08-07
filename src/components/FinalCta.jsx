import { motion } from 'framer-motion';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion.js';
import { IconCheck } from './Icons.jsx';
import './FinalCta.css';

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

/* Objeções reais de quem toca uma clínica pequena e não tem TI */
const REASSURANCE = [
  'A gente transfere sua agenda e seus pacientes por você',
  'Sua secretária aprende a usar no mesmo dia',
  'Cancele quando quiser, sem multa nem fidelidade',
];

export default function FinalCta() {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <section className="final-section">
      <div className="wrap">
        <motion.div
          className="final-cta"
          initial={reduceMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={container}
        >
          <motion.h2 variants={item}>
            Se a clínica só funciona porque você lembra de tudo, o problema não é sua memória.
          </motion.h2>

          <motion.p variants={item}>
            Quem administra consultório pequeno acumula agenda, cobrança, prontuário e paciente
            no WhatsApp ao mesmo tempo. O Consulta assume essa parte para você voltar a cuidar
            da clínica — e não da papelada dela.
          </motion.p>

          <motion.ul className="final-list" variants={item}>
            {REASSURANCE.map((text) => (
              <li key={text}>
                <IconCheck className="icon final-check" />
                {text}
              </li>
            ))}
          </motion.ul>

          <motion.div className="hero-actions final-actions" variants={item}>
            <a href="#planos" className="btn btn-primary btn-lg">
              Quero testar com a agenda da minha clínica
            </a>
          </motion.div>

          <motion.p className="final-note" variants={item}>
            14 dias grátis, sem cartão de crédito. Se não servir, é só parar de usar.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
