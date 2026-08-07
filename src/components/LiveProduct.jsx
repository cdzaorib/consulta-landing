import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion.js';
import AgendaWidget from './AgendaWidget.jsx';
import ProntuarioWidget from './ProntuarioWidget.jsx';
import FinanceiroWidget from './FinanceiroWidget.jsx';
import './LiveProduct.css';

const TABS = [
  {
    id: 'agenda',
    label: 'A agenda',
    headline: 'A recepção para de remarcar no papel',
    blurb:
      'Cada confirmação que chega pelo WhatsApp aparece aqui na hora. Encaixe de última hora entra na fila sem ninguém redesenhar a tabela do dia.',
    Widget: AgendaWidget,
  },
  {
    id: 'prontuario',
    label: 'O prontuário',
    headline: 'O registro fica pronto antes do paciente sair',
    blurb:
      'O que foi dito na consulta vira documentação estruturada no modelo da especialidade. Ninguém precisa "passar a limpo" depois do expediente.',
    Widget: ProntuarioWidget,
  },
  {
    id: 'financeiro',
    label: 'O financeiro',
    headline: 'Você sabe quanto entrou sem abrir planilha',
    blurb:
      'Cada atendimento já nasce lançado. O que foi pago e o que ficou em aberto aparecem separados, todo dia — não só no fechamento do mês.',
    Widget: FinanceiroWidget,
  },
];

export default function LiveProduct() {
  const reduceMotion = usePrefersReducedMotion();
  const [active, setActive] = useState(0);
  const tabRefs = useRef([]);

  /* Navegação por setas conforme o padrão de abas do WAI-ARIA */
  function handleKeyDown(event) {
    const last = TABS.length - 1;
    let next = null;

    if (event.key === 'ArrowRight') next = active === last ? 0 : active + 1;
    if (event.key === 'ArrowLeft') next = active === 0 ? last : active - 1;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = last;

    if (next !== null) {
      event.preventDefault();
      setActive(next);
      tabRefs.current[next]?.focus();
    }
  }

  const current = TABS[active];
  const { Widget } = current;

  return (
    <section id="produto" className="live-section">
      <div className="wrap">
        <div className="day-header">
          <div className="eyebrow">O sistema por dentro</div>
          <h2>Não é screenshot — é o produto funcionando</h2>
          <p>
            Três telas que a sua equipe vai abrir todo dia. Passe por elas antes de decidir
            se vale um teste.
          </p>
        </div>

        <div className="live-panel">
          <div
            className="live-tabs"
            role="tablist"
            aria-label="Áreas do sistema"
            onKeyDown={handleKeyDown}
          >
            {TABS.map((tab, i) => (
              <button
                key={tab.id}
                ref={(el) => { tabRefs.current[i] = el; }}
                id={`tab-${tab.id}`}
                type="button"
                role="tab"
                aria-selected={i === active}
                aria-controls={`panel-${tab.id}`}
                tabIndex={i === active ? 0 : -1}
                className={`live-tab${i === active ? ' is-active' : ''}`}
                onClick={() => setActive(i)}
              >
                {tab.label}
                {i === active && (
                  <motion.span
                    className="live-tab-underline"
                    layoutId="live-tab-underline"
                    transition={
                      reduceMotion
                        ? { duration: 0 }
                        : { type: 'spring', stiffness: 420, damping: 34 }
                    }
                  />
                )}
              </button>
            ))}
          </div>

          <div
            id={`panel-${current.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${current.id}`}
            tabIndex={0}
            className="live-body"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={current.id}
                className="live-grid"
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
                transition={{ duration: reduceMotion ? 0 : 0.28, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="live-copy">
                  <h3>{current.headline}</h3>
                  <p>{current.blurb}</p>
                </div>
                <div className="live-widget">
                  <Widget />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
