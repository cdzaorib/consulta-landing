import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import useCountUp from '../hooks/useCountUp.js';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion.js';
import { DUR, EASE_OUT } from '../lib/motion.js';
import { METRICS } from '../content.js';
import './Metrics.css';

/** Escalonamento entre um card e o seguinte, em ms. */
const COUNT_STAGGER = 130;

function MetricItem({ prefix, target, suffix, staticValue, caption, index }) {
  const ref = useRef(null);
  // once: true — conta uma vez ao entrar na tela e não repete no scroll
  const isInView = useInView(ref, { once: true, amount: 0.4 });
  const reduceMotion = usePrefersReducedMotion();

  const value = useCountUp(target ?? 0, {
    isInView: isInView && target !== undefined,
    delay: index * COUNT_STAGGER,
    reduceMotion,
  });

  /* O sufixo ("M+", "K+") fica parado enquanto o número cresce: a caixa do
     número já nasce com a largura do valor final, medida em `ch` sobre
     figuras tabulares. Sem isso o sufixo escorregaria a cada dígito novo. */
  const digits = target === undefined ? 0 : String(Math.round(target)).length;

  return (
    <motion.li
      className="metric"
      ref={ref}
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      animate={isInView || reduceMotion ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: DUR.base, delay: index * 0.08, ease: EASE_OUT }}
    >
      <p className="num">
        {prefix && <span className="prefix">{prefix}</span>}
        <span className="value" style={digits ? { minWidth: `${digits}ch` } : undefined}>
          {staticValue ?? Math.round(value)}
        </span>
        {suffix && <span className="suffix">{suffix}</span>}
      </p>
      <p className="cap">{caption}</p>
    </motion.li>
  );
}

export default function Metrics() {
  return (
    <section id="numeros" className="metrics-section">
      <div className="wrap">
        <div className="metrics surface-dark">
          <div className="metrics-glow" aria-hidden="true" />
          <p className="eyebrow on-dark">Números do Conclínica</p>
          <ul className="metrics-grid">
            {METRICS.map((metric, index) => (
              <MetricItem key={metric.id} index={index} {...metric} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
