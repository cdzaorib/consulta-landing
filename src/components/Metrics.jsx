import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import useCountUp from '../hooks/useCountUp.js';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion.js';
import { DUR, EASE_OUT } from '../lib/motion.js';
import { METRICS } from '../content.js';
import './Metrics.css';

function MetricItem({ prefix, target, suffix, staticValue, caption, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });
  const reduceMotion = usePrefersReducedMotion();

  const value = useCountUp(target ?? 0, {
    isInView: isInView && target !== undefined,
    reduceMotion,
  });

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
        {staticValue ?? Math.round(value)}
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
