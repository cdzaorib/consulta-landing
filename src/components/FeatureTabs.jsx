import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import DayScreen from './DayScreen.jsx';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion.js';
import { DUR, EASE_OUT, STAGGER, VIEWPORT_SOFT, fadeUp, itemUp, reveal, stagger } from '../lib/motion.js';
import { FEATURE_TABS } from '../content.js';
import './FeatureTabs.css';

/**
 * Abas de funcionalidades no padrão WAI-ARIA (ativação automática: a seleção
 * segue o foco, que é o recomendado quando trocar de painel é barato).
 *
 * Os três painéis ficam sempre montados, empilhados na mesma célula do grid:
 * a seção assume a altura do painel mais alto e a troca de aba não empurra o
 * resto da página. Os inativos saem com `visibility: hidden`, que também os
 * tira da árvore de acessibilidade e da ordem de tabulação.
 */
export default function FeatureTabs() {
  const reduceMotion = usePrefersReducedMotion();
  const [active, setActive] = useState(0);
  const tabRefs = useRef([]);

  const { tabs } = FEATURE_TABS;
  const last = tabs.length - 1;

  function focusTab(index) {
    setActive(index);
    const el = tabRefs.current[index];
    el?.focus();
    // Na lista com rolagem horizontal do mobile, a aba focada precisa
    // entrar em campo sozinha.
    el?.scrollIntoView({
      inline: 'nearest',
      block: 'nearest',
      behavior: reduceMotion ? 'auto' : 'smooth',
    });
  }

  function onKeyDown(event) {
    const moves = {
      ArrowRight: active === last ? 0 : active + 1,
      ArrowLeft: active === 0 ? last : active - 1,
      Home: 0,
      End: last,
    };

    const next = moves[event.key];
    if (next === undefined) return;

    event.preventDefault();
    focusTab(next);
  }

  return (
    <section id="funcionalidades" className="feature-tabs band-warm">
      <div className="wrap">
        <motion.div className="section-head center" {...reveal(reduceMotion, fadeUp)}>
          <p className="eyebrow">{FEATURE_TABS.eyebrow}</p>
          <h2>{FEATURE_TABS.title}</h2>
          <p>{FEATURE_TABS.lead}</p>
        </motion.div>

        <motion.div className="tabs" {...reveal(reduceMotion, fadeUp, VIEWPORT_SOFT)}>
          <div className="tab-list-scroll">
            <div
              className="tab-list"
              role="tablist"
              aria-label="Frentes de uso do sistema"
              onKeyDown={onKeyDown}
            >
              {tabs.map((tab, index) => {
                const selected = index === active;

                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    id={`aba-${tab.id}`}
                    className={`tab${selected ? ' is-active' : ''}`}
                    aria-selected={selected}
                    aria-controls={`painel-${tab.id}`}
                    tabIndex={selected ? 0 : -1}
                    ref={(el) => {
                      tabRefs.current[index] = el;
                    }}
                    onClick={() => setActive(index)}
                  >
                    {tab.label}
                    {selected && (
                      /* `layoutId` faz a barra deslizar da aba anterior para
                         esta em vez de sumir e reaparecer. */
                      <motion.span
                        className="tab-underline"
                        layoutId={reduceMotion ? undefined : 'aba-ativa'}
                        transition={{ duration: DUR.micro, ease: EASE_OUT }}
                        aria-hidden="true"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="tab-stack">
            {tabs.map((tab, index) => {
              const selected = index === active;

              return (
                <div
                  key={tab.id}
                  id={`painel-${tab.id}`}
                  role="tabpanel"
                  aria-labelledby={`aba-${tab.id}`}
                  tabIndex={0}
                  className={`tab-panel${selected ? ' is-active' : ''}`}
                >
                  <motion.div
                    className="tab-panel-inner"
                    animate={
                      reduceMotion
                        ? { opacity: selected ? 1 : 0 }
                        : { opacity: selected ? 1 : 0, y: selected ? 0 : 10 }
                    }
                    transition={
                      reduceMotion ? { duration: 0 } : { duration: DUR.micro, ease: EASE_OUT }
                    }
                  >
                    <div className="tab-copy">
                      <h3>{tab.title}</h3>
                      <p className="tab-desc">{tab.description}</p>

                      <motion.ul
                        className="tab-items"
                        variants={stagger(STAGGER, 0.06)}
                        initial={false}
                        animate={selected || reduceMotion ? 'visible' : 'hidden'}
                      >
                        {tab.items.map((item) => (
                          <motion.li key={item.name} variants={reduceMotion ? undefined : itemUp}>
                            <span className="tick" aria-hidden="true">
                              <svg viewBox="0 0 12 12" fill="none">
                                <path
                                  d="M2.5 6.2 4.8 8.5 9.5 3.5"
                                  stroke="currentColor"
                                  strokeWidth="1.8"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </span>
                            <span>
                              <span className="name">{item.name}</span>
                              <span className="sub">{item.sub}</span>
                            </span>
                          </motion.li>
                        ))}
                      </motion.ul>
                    </div>

                    <div className="tab-screen">
                      <DayScreen screen={tab.screen} />
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
