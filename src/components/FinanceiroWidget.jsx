import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion.js';
import { IconWallet } from './Icons.jsx';
import './FinanceiroWidget.css';

/** Semana fictícia de demonstração — recebido vs. a receber, por dia. */
const DAYS = [
  { day: 'Seg', recebido: 1840, aberto: 320 },
  { day: 'Ter', recebido: 2260, aberto: 180 },
  { day: 'Qua', recebido: 1490, aberto: 640 },
  { day: 'Qui', recebido: 2980, aberto: 240 },
  { day: 'Sex', recebido: 2410, aberto: 520 },
];

const MAX = Math.max(...DAYS.map((d) => d.recebido + d.aberto));

const brl = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  maximumFractionDigits: 0,
});

const totalRecebido = DAYS.reduce((sum, d) => sum + d.recebido, 0);
const totalAberto = DAYS.reduce((sum, d) => sum + d.aberto, 0);

export default function FinanceiroWidget() {
  const reduceMotion = usePrefersReducedMotion();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.4 });

  return (
    <div className="fin-card" ref={ref}>
      <div className="fin-head">
        <div>
          <div className="title">Semana atual</div>
          <div className="date mono">04 a 08 de agosto</div>
        </div>
        <IconWallet className="icon fin-badge" />
      </div>

      <div className="fin-totals">
        <div className="fin-total">
          <div className="fin-total-label">Recebido</div>
          <div className="fin-total-value mono">{brl.format(totalRecebido)}</div>
        </div>
        <div className="fin-total">
          <div className="fin-total-label">A receber</div>
          <div className="fin-total-value mono is-open">{brl.format(totalAberto)}</div>
        </div>
      </div>

      {/* O gráfico é decorativo-ilustrativo; o resumo textual acima já carrega
          o dado, então o SVG fica fora da árvore de acessibilidade. */}
      <div className="fin-chart" aria-hidden="true">
        {DAYS.map((d, i) => {
          const hRecebido = (d.recebido / MAX) * 100;
          const hAberto = (d.aberto / MAX) * 100;
          return (
            <div className="fin-col" key={d.day}>
              <div className="fin-bars">
                <motion.div
                  className="fin-bar is-open"
                  initial={reduceMotion ? false : { height: 0 }}
                  animate={{ height: isInView || reduceMotion ? `${hAberto}%` : 0 }}
                  transition={{ duration: 0.5, delay: 0.05 * i + 0.15, ease: [0.16, 1, 0.3, 1] }}
                />
                <motion.div
                  className="fin-bar"
                  initial={reduceMotion ? false : { height: 0 }}
                  animate={{ height: isInView || reduceMotion ? `${hRecebido}%` : 0 }}
                  transition={{ duration: 0.5, delay: 0.05 * i, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
              <div className="fin-day mono">{d.day}</div>
            </div>
          );
        })}
      </div>

      <div className="fin-legend">
        {/* Hachura + rótulo: o significado não depende só da cor */}
        <span className="fin-key"><i className="fin-swatch" />Recebido</span>
        <span className="fin-key"><i className="fin-swatch is-open" />A receber</span>
      </div>
    </div>
  );
}
