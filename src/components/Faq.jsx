import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion.js';
import { DUR, EASE_OUT, VIEWPORT_SOFT, fadeUp, itemUp, reveal, stagger } from '../lib/motion.js';
import { FAQ } from '../content.js';
import './Faq.css';

/**
 * Accordion clássico: um item aberto por vez, clicar no aberto fecha.
 *
 * A região (`aria-controls`) existe sempre no DOM, aberta ou fechada — é ela
 * que o botão referencia. O que entra e sai é o conteúdo, para que a resposta
 * fechada também suma da leitura de tela, não só da tela.
 */
export default function Faq() {
  const reduceMotion = usePrefersReducedMotion();
  const [open, setOpen] = useState(FAQ.items[0].id);

  return (
    <section id="duvidas" className="faq band-warm">
      <div className="wrap">
        <motion.div className="section-head center" {...reveal(reduceMotion, fadeUp)}>
          <p className="eyebrow">{FAQ.eyebrow}</p>
          <h2>{FAQ.title}</h2>
          <p>{FAQ.lead}</p>
        </motion.div>

        <motion.ul
          className="faq-list"
          variants={stagger()}
          initial={reduceMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={VIEWPORT_SOFT}
        >
          {FAQ.items.map((item) => {
            const expanded = open === item.id;

            return (
              <motion.li
                key={item.id}
                className={`faq-item${expanded ? ' is-open' : ''}`}
                variants={itemUp}
              >
                <h3>
                  <button
                    type="button"
                    id={`pergunta-${item.id}`}
                    className="faq-trigger"
                    aria-expanded={expanded}
                    aria-controls={`resposta-${item.id}`}
                    onClick={() => setOpen(expanded ? null : item.id)}
                  >
                    <span className="faq-q">{item.q}</span>
                    <span className="faq-chevron" aria-hidden="true">
                      <svg viewBox="0 0 16 16" fill="none">
                        <path
                          d="m4 6 4 4 4-4"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </button>
                </h3>

                <div
                  id={`resposta-${item.id}`}
                  role="region"
                  aria-labelledby={`pergunta-${item.id}`}
                >
                  <AnimatePresence initial={false}>
                    {expanded && (
                      /* `height: auto` só é animável pelo Framer; sob
                         prefers-reduced-motion o painel troca de estado sem
                         percorrer a altura. */
                      <motion.div
                        className="faq-panel"
                        initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={
                          reduceMotion
                            ? { duration: 0 }
                            : { duration: DUR.micro, ease: EASE_OUT }
                        }
                      >
                        <p>{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}
