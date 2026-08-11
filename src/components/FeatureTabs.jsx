import { useCallback, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import DayScreen from './DayScreen.jsx';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion.js';
import { DUR, EASE_OUT, STAGGER, VIEWPORT_SOFT, fadeUp, itemUp, reveal, stagger } from '../lib/motion.js';
import { FEATURE_TABS } from '../content.js';
import './FeatureTabs.css';

/**
 * Carrossel de funcionalidades no padrão WAI-ARIA de abas (ativação
 * automática: a seleção segue o foco, o recomendado quando trocar de painel
 * é barato).
 *
 * Os três painéis ficam sempre montados, empilhados na mesma célula do grid:
 * a seção assume a altura do painel mais alto e a troca de slide não empurra
 * o resto da página. Os inativos saem com `visibility: hidden`, que também os
 * tira da árvore de acessibilidade e da ordem de tabulação.
 *
 * O avanço automático não usa timer: quem manda é a barrinha de progresso da
 * aba ativa, uma animação CSS de 4s cujo `animationend` chama o próximo
 * slide. Pausar vira então uma linha de CSS (`animation-play-state`), e a
 * barra na tela nunca sai de sincronia com o avanço — coisa que um
 * `setInterval` em paralelo não garante.
 */
export default function FeatureTabs() {
  const reduceMotion = usePrefersReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const tabRefs = useRef([]);

  const { tabs } = FEATURE_TABS;
  const last = tabs.length - 1;

  const goNext = useCallback(() => {
    setActive((current) => (current === tabs.length - 1 ? 0 : current + 1));
  }, [tabs.length]);

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
    <section id="funcionalidades" className="feature-tabs band-alt">
      <div className="wrap">
        <motion.div className="section-head center" {...reveal(reduceMotion, fadeUp)}>
          <p className="eyebrow">{FEATURE_TABS.eyebrow}</p>
          <h2>{FEATURE_TABS.title}</h2>
          <p>{FEATURE_TABS.lead}</p>
        </motion.div>

        {/* A pausa cobre mouse e teclado: `focus`/`blur` sobem porque os
            eventos nativos de foco fazem bubbling em React. */}
        <motion.div
          className={`tabs${paused ? ' is-paused' : ''}`}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          {...reveal(reduceMotion, fadeUp, VIEWPORT_SOFT)}
        >
          <div className="tab-list-scroll">
            <div
              className="tab-list"
              role="tablist"
              aria-label="Frentes de uso do sistema. Avança sozinho; use as setas para navegar."
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

                    {/* Indicador: trilha em todas as abas, preenchimento só na
                        ativa. Sem movimento, a barra da ativa fica cheia e
                        parada — o `animationend` não existe, e é o que
                        desliga o avanço automático. */}
                    <span className="tab-track" aria-hidden="true">
                      {selected &&
                        (reduceMotion ? (
                          <span className="tab-progress is-static" />
                        ) : (
                          <span
                            key={active}
                            className="tab-progress"
                            onAnimationEnd={goNext}
                          />
                        ))}
                    </span>
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
