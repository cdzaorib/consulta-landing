import { motion } from 'framer-motion';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion.js';
import './Testimonials.css';

/**
 * Depoimentos ilustrativos. O detalhe do porte ("2 dentistas e uma
 * secretária") é proposital: é o que faz o leitor se reconhecer, em vez
 * de ler mais um case de rede grande.
 */
const TESTIMONIALS = [
  {
    quote:
      'A gente perdia uns três horários por semana com paciente que simplesmente não aparecia. Depois que a confirmação passou a sair sozinha na véspera, isso praticamente acabou. Não precisei contratar ninguém pra isso.',
    initials: 'MC',
    name: 'Dra. Marina Costa',
    role: 'Odontologia',
    size: '2 dentistas · 1 secretária',
  },
  {
    quote:
      'O que mudou mesmo foi o fim da gaveta de fichas. Antes, se o paciente trocasse de profissional, o histórico ficava pela metade. Hoje qualquer um abre e vê tudo o que já foi feito.',
    initials: 'PB',
    name: 'Dr. Pedro Baches',
    role: 'Clínica geral',
    size: 'Consultório com 4 salas',
  },
  {
    quote:
      'Eu cuido da parte administrativa sozinho. Antes eu fechava o caixa no sábado, na planilha. Agora abro o relatório na segunda de manhã e já sei quem está devendo e quanto entrou na semana.',
    initials: 'RT',
    name: 'Rafael Torres',
    role: 'Gestor administrativo, fisioterapia',
    size: '3 fisioterapeutas',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function Testimonials() {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <section id="depoimentos">
      <div className="wrap">
        <div className="day-header">
          <div className="eyebrow">Depoimentos</div>
          <h2>Quem cuida de uma clínica pequena sente primeiro</h2>
          <p>Consultórios de 1 a 10 profissionais — o mesmo porte da sua.</p>
        </div>

        <motion.div
          className="testi-grid"
          initial={reduceMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={gridVariants}
        >
          {TESTIMONIALS.map((testi) => (
            <motion.figure
              className="testi"
              key={testi.name}
              variants={cardVariants}
              whileHover={reduceMotion ? undefined : { y: -3 }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
            >
              <blockquote>{testi.quote}</blockquote>
              <figcaption className="who">
                <span className="avatar" aria-hidden="true">{testi.initials}</span>
                <span>
                  <span className="name">{testi.name}</span>
                  <span className="role">{testi.role}</span>
                  <span className="size mono">{testi.size}</span>
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
