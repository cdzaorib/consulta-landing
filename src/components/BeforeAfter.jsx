import { motion } from 'framer-motion';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion.js';
import { VIEWPORT_SOFT, cardUp, fadeUp, reveal, stagger } from '../lib/motion.js';
import { SHIFTS } from '../content.js';
import './BeforeAfter.css';

export default function BeforeAfter() {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <section id="mudanca" className="band-alt">
      <div className="wrap">
        <motion.div className="section-head center" {...reveal(reduceMotion, fadeUp)}>
          <p className="eyebrow">Antes × depois</p>
          <h2>O que muda numa clínica pequena logo na primeira semana</h2>
          <p>
            Menos papel, menos horário vazio, menos domingo fechando planilha. E o dinheiro
            da clínica visível sem precisar somar recibo.
          </p>
        </motion.div>

        <div className="shift-legend" aria-hidden="true">
          <span className="legend-before">Como é hoje</span>
          <span className="legend-after">Com o Conclínica</span>
        </div>

        <motion.ol
          className="shift-list"
          variants={stagger()}
          initial={reduceMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={VIEWPORT_SOFT}
        >
          {SHIFTS.map((shift) => (
            <motion.li className="shift" key={shift.id} variants={cardUp}>
              <p className="shift-theme mono">{shift.theme}</p>

              <div className="shift-before">
                <span className="shift-mark before" aria-hidden="true">
                  <svg viewBox="0 0 16 16" fill="none">
                    <path
                      d="M4.5 4.5 11.5 11.5M11.5 4.5 4.5 11.5"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                <span className="visually-hidden">Antes: </span>
                {shift.before}
              </div>

              <span className="shift-arrow" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M4 12h15m0 0-5.5-5.5M19 12l-5.5 5.5"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>

              <div className="shift-after">
                <span className="shift-mark after" aria-hidden="true">
                  <svg viewBox="0 0 16 16" fill="none">
                    <path
                      d="M3.6 8.3 6.5 11.2l5.9-6.4"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span>
                  <span className="visually-hidden">Depois: </span>
                  {shift.after}
                </span>
                <span className="chip chip-sage shift-chip">{shift.chip}</span>
              </div>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
