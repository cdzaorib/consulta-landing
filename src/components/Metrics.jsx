import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import useCountUp from '../hooks/useCountUp.js';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion.js';
import './Metrics.css';

const METRICS = [
  { target: 5, format: (v) => `${Math.round(v)}`, caption: 'clínicas gerenciadas remotamente por um mesmo grupo, em média' },
  { target: -38, format: (v) => `${Math.round(v)}%`, caption: 'de faltas com confirmação automática de consulta' },
  { target: 0, format: (v) => `${Math.round(v)}`, caption: 'fichas de papel — tudo centralizado no prontuário' },
  { staticValue: '24/7', caption: 'agendamento online disponível para o paciente' },
];

function MetricItem({ target, format, staticValue, caption }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });
  const reduceMotion = usePrefersReducedMotion();
  const value = useCountUp(target ?? 0, {
    isInView: isInView && target !== undefined,
    reduceMotion,
  });

  return (
    <motion.div
      className="metric"
      ref={ref}
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: isInView || reduceMotion ? 1 : 0, y: isInView || reduceMotion ? 0 : 20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="num">{staticValue ?? format(value)}</div>
      <div className="cap">{caption}</div>
    </motion.div>
  );
}

export default function Metrics() {
  return (
    <section id="numeros">
      <div className="metrics wrap" style={{ maxWidth: 1120, marginLeft: 'auto', marginRight: 'auto' }}>
        {METRICS.map((metric) => (
          <MetricItem key={metric.caption} {...metric} />
        ))}
      </div>
    </section>
  );
}
