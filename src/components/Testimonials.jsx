import { motion } from 'framer-motion';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion.js';
import { VIEWPORT_SOFT, cardUp, fadeUp, reveal, stagger } from '../lib/motion.js';
import { TESTIMONIALS, TRUST_CARD } from '../content.js';
import './Testimonials.css';

export default function Testimonials() {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <section id="depoimentos">
      <div className="wrap">
        <motion.div className="section-head" {...reveal(reduceMotion, fadeUp)}>
          <p className="eyebrow">Quem usa</p>
          <h2>Clínica pequena não tem margem para retrabalho</h2>
          <p>
            Consultórios de um profissional e clínicas com poucas salas usam o mesmo
            sistema, sem precisar de um time de TI para manter de pé.
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
              variants={cardUp}
            >
              <span className="quote-mark" aria-hidden="true">
                &ldquo;
              </span>
              <blockquote>{testi.quote}</blockquote>

              <p className="stars" aria-label={`${testi.rating} de 5 estrelas`}>
                {Array.from({ length: testi.rating }, (_, i) => (
                  <svg key={i} viewBox="0 0 20 20" aria-hidden="true">
                    <path d="m10 1.6 2.6 5.3 5.8.8-4.2 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8L1.6 7.7l5.8-.8L10 1.6Z" />
                  </svg>
                ))}
              </p>

              <figcaption className="who">
                <span className="avatar" aria-hidden="true">
                  {testi.photo ? (
                    <img
                      src={testi.photo}
                      alt=""
                      width="42"
                      height="42"
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    testi.initials ?? (
                      <svg viewBox="0 0 20 20" fill="none">
                        <path
                          d="M3 17V8.2l4.5-3 4.5 3V17M12 17v-5.4l3-2 2 1.4V17M3 17h14"
                          stroke="currentColor"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )
                  )}
                </span>
                <span>
                  <span className="name">{testi.name}</span>
                  <span className="role">{testi.role}</span>
                </span>
              </figcaption>
            </motion.figure>
          ))}

        </motion.div>

        <motion.div className="trust-band" {...reveal(reduceMotion, fadeUp)}>
          <div className="trust-head">
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
            <div>
              <h3>{TRUST_CARD.title}</h3>
              <p className="trust-intro">{TRUST_CARD.intro}</p>
            </div>
          </div>

          <ul className="trust-items">
            {TRUST_CARD.items.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
