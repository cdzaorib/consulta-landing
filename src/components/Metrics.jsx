import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import useCountUp from '../hooks/useCountUp.js';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion.js';
import { DUR, EASE_OUT, STAGGER } from '../lib/motion.js';
import { METRICS } from '../content.js';
import './Metrics.css';

/**
 * Escalonamento entre o início de uma contagem e a seguinte, em ms.
 * Fica acima do stagger de entrada porque a contagem dura bem mais: se os
 * quatro começassem juntos, a faixa viraria um borrão de dígitos.
 */
const COUNT_STAGGER = 90;

function MetricItem({ prefix, target, suffix, staticValue, caption, index }) {
  const ref = useRef(null);
  // once: true — conta uma vez ao entrar na tela e não repete no scroll
  const isInView = useInView(ref, { once: true, amount: 0.4 });
  const reduceMotion = usePrefersReducedMotion();

  const value = useCountUp(target ?? 0, {
    isInView: isInView && target !== undefined,
    duration: DUR.count * 1000,
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
      transition={{ duration: DUR.base, delay: index * STAGGER, ease: EASE_OUT }}
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
