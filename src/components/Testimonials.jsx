import { motion } from 'framer-motion';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion.js';
import './Testimonials.css';

const TESTIMONIALS = [
  {
    quote: '"Consegui integrar as cinco unidades da minha rede num painel só. Hoje acompanho tudo remotamente, com muito mais transparência do que quando cada clínica tinha sua própria planilha."',
    initials: 'PB',
    name: 'Dr. Pedro Baches',
    role: 'Clínica geral, rede de 5 unidades',
  },
  {
    quote: '"O que mais mudou foi o fim do papel. A secretária não perde mais tempo procurando ficha e o histórico do paciente está sempre completo, mesmo trocando de profissional."',
    initials: 'MC',
    name: 'Dra. Marina Costa',
    role: 'Odontologia',
  },
  {
    quote: '"A confirmação automática por WhatsApp derrubou nossas faltas quase pela metade. Isso sozinho já pagou o sistema no primeiro mês."',
    initials: 'RT',
    name: 'Rafael Torres',
    role: 'Gestor administrativo, fisioterapia',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Testimonials() {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <section id="depoimentos">
      <div className="wrap">
        <div className="day-header">
          <div className="eyebrow">Depoimentos</div>
          <h2>Quem administra uma clínica, sente a diferença</h2>
        </div>

        <div className="testi-grid">
          {TESTIMONIALS.map((testi) => (
            <motion.div
              className="testi"
              key={testi.name}
              initial={reduceMotion ? false : 'hidden'}
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              variants={cardVariants}
              whileHover={reduceMotion ? undefined : {
                y: -4,
                scale: 1.015,
                transition: { type: 'spring', stiffness: 300, damping: 20 },
              }}
            >
              <p>{testi.quote}</p>
              <div className="who">
                <div className="avatar">{testi.initials}</div>
                <div>
                  <div className="name">{testi.name}</div>
                  <div className="role">{testi.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
