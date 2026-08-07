import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion.js';
import './AgendaWidget.css';

const SLOTS = [
  { time: '08:00', label: 'Larissa M. — Retorno', variant: '' },
  { time: '09:00', label: 'Rafael T. — 1ª consulta', variant: 'brick' },
  { time: '10:00', label: 'Bloco de exames', variant: '' },
  { time: '11:00', label: 'Dona Iracema — Retorno', variant: 'brick' },
  { time: '14:00', label: 'Telemedicina — Google Meet', variant: '' },
];

const LOOP_INTERVAL_MS = 8000;

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.4, delayChildren: 0.1 } },
};

const fillVariants = {
  hidden: { opacity: 0, x: -6 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function AgendaWidget() {
  const reduceMotion = usePrefersReducedMotion();
  // Incrementar "cycle" força o remount da lista e replay do stagger,
  // reproduzindo o setInterval(loopAgenda, 8000) do HTML original.
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    if (reduceMotion) return undefined;
    const id = setInterval(() => setCycle((c) => c + 1), LOOP_INTERVAL_MS);
    return () => clearInterval(id);
  }, [reduceMotion]);

  return (
    <div className="agenda-card">
      <div className="agenda-head">
        <div>
          <div className="title">Agenda de hoje</div>
          <div className="date mono">Qui, 07 de agosto</div>
        </div>
        <div className="agenda-live"><span className="pulse" />ao vivo</div>
      </div>

      <motion.div
        key={cycle}
        variants={listVariants}
        initial={reduceMotion ? false : 'hidden'}
        animate="visible"
      >
        {SLOTS.map((slot) => (
          <div className="slot" key={slot.time}>
            <time className="mono">{slot.time}</time>
            <div className="slot-block">
              <motion.div className={`slot-fill ${slot.variant}`.trim()} variants={fillVariants}>
                {slot.label}
              </motion.div>
            </div>
          </div>
        ))}
      </motion.div>

      <div className="agenda-foot">
        <span>5 consultas confirmadas</span>
        <span>2 vagas livres</span>
      </div>
    </div>
  );
}
