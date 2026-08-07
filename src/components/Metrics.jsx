import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import useCountUp from '../hooks/useCountUp.js';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion.js';
import './Metrics.css';

/**
 * Números herdados da versão anterior da página — nenhum inventado aqui.
 * `prefix` existe para o sinal do -38% não ser recalculado a cada frame
 * da contagem.
 */
const METRICS = [
  {
    target: 38,
    prefix: '−',
    suffix: '%',
    caption: 'de faltas depois da confirmação automática de consulta',
  },
  {
    staticValue: '0',
    caption: 'fichas de papel — o histórico inteiro fica no prontuário',
  },
  {
    target: 5,
    caption: 'clínicas geridas remotamente por um mesmo grupo, em média',
  },
  {
    staticValue: '24/7',
    caption: 'agendamento aberto para o paciente marcar sozinho',
  },
];

function MetricItem({ target, prefix = '', suffix = '', staticValue, caption }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const reduceMotion = usePrefersReducedMotion();
  const value = useCountUp(target ?? 0, {
    isInView: isInView && target !== undefined,
    reduceMotion,
  });

  const display = staticValue ?? `${prefix}${Math.round(value)}${suffix}`;

  return (
    <motion.li
      className="metric"
      ref={ref}
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: isInView || reduceMotion ? 1 : 0, y: isInView || reduceMotion ? 0 : 16 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="num">{display}</div>
      <div className="cap">{caption}</div>
    </motion.li>
  );
}

export default function Metrics() {
  return (
    <section id="numeros" className="metrics-section">
      <div className="wrap">
        <ul className="metrics">
          {METRICS.map((metric) => (
            <MetricItem key={metric.caption} {...metric} />
          ))}
        </ul>
      </div>
    </section>
  );
}
