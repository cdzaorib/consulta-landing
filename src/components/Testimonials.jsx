import { motion } from 'framer-motion';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion.js';
import { VIEWPORT_SOFT, fadeUp, lift, reveal, stagger } from '../lib/motion.js';
import { TESTIMONIALS, TRUST_CARD } from '../content.js';
import './Testimonials.css';

const card = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Testimonials() {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <section id="depoimentos">
      <div className="wrap">
        <motion.div className="section-head" {...reveal(reduceMotion, fadeUp)}>
          <p className="eyebrow">Quem usa</p>
          <h2>Clínica pequena não tem margem para retrabalho</h2>
          <p>
            Consultórios de um profissional e clínicas com poucas salas — o mesmo sistema,
            sem precisar de um time de TI para manter de pé.
          </p>
        </motion.div>

        <motion.div
          className="testi-grid"
          variants={stagger(0.1)}
          initial={reduceMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={VIEWPORT_SOFT}
        >
          {TESTIMONIALS.map((testi) => (
            <motion.figure
              className="testi"
              key={testi.name}
              variants={card}
              whileHover={reduceMotion ? undefined : lift}
            >
              <span className="quote-mark" aria-hidden="true">
                &ldquo;
              </span>
              <blockquote>{testi.quote}</blockquote>
              <figcaption className="who">
                <span className="avatar" aria-hidden="true">
                  {testi.initials}
                </span>
                <span>
                  <span className="name">{testi.name}</span>
                  <span className="role">{testi.role}</span>
                </span>
              </figcaption>
            </motion.figure>
          ))}

          <motion.div className="trust-card" variants={card}>
            <span className="trust-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2.5 20 5.6v6.1c0 4.5-3.3 8.6-8 9.8-4.7-1.2-8-5.3-8-9.8V5.6L12 2.5Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
                <path
                  d="m8.6 12.2 2.4 2.4 4.4-4.8"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <h3>{TRUST_CARD.title}</h3>
            <p className="trust-intro">{TRUST_CARD.intro}</p>
            <ul>
              {TRUST_CARD.items.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
