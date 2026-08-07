import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion.js';
import { IconCheck, IconMessage } from './Icons.jsx';
import './AgendaWidget.css';

const SLOTS = [
  { time: '08:00', label: 'Larissa M. — Retorno', tone: 'sage', status: 'confirmado' },
  { time: '09:00', label: 'Rafael T. — 1ª consulta', tone: 'brick', status: 'confirmado' },
  { time: '10:00', label: 'Bloco de exames', tone: 'sage', status: null },
  { time: '11:00', label: 'Dona Iracema — Retorno', tone: 'brick', status: 'confirmado' },
  { time: '14:00', label: 'Telemedicina — vídeo', tone: 'sage', status: null },
];

const LOOP_INTERVAL_MS = 9000;

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.38, delayChildren: 0.15 } },
};

const fillVariants = {
  hidden: { opacity: 0, x: -8 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
};

export default function AgendaWidget() {
  const reduceMotion = usePrefersReducedMotion();
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.3 });

  // Incrementar "cycle" remonta a lista e repete o stagger, dando a
  // sensação de agenda se preenchendo ao vivo.
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    // Só anima o loop enquanto o card está visível — fora da tela é
    // trabalho de renderização jogado fora.
    if (reduceMotion || !isInView) return undefined;
    const id = setInterval(() => setCycle((c) => c + 1), LOOP_INTERVAL_MS);
    return () => clearInterval(id);
  }, [reduceMotion, isInView]);

  const confirmados = SLOTS.filter((s) => s.status === 'confirmado').length;

  return (
    <div className="agenda-card" ref={ref}>
      <div className="agenda-head">
        <div>
          <div className="title">Agenda de hoje</div>
          <div className="date mono">Qui, 07 de agosto</div>
        </div>
        <div className="agenda-live">
          <span className="pulse" aria-hidden="true" />ao vivo
        </div>
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
              <motion.div className={`slot-fill ${slot.tone}`} variants={fillVariants}>
                <span className="slot-label">{slot.label}</span>
                {slot.status === 'confirmado' && (
                  <span className="slot-badge" title="Confirmado pelo paciente no WhatsApp">
                    <IconCheck className="icon slot-badge-icon" />
                  </span>
                )}
              </motion.div>
            </div>
          </div>
        ))}
      </motion.div>

      <div className="agenda-foot">
        <span className="agenda-foot-item">
          <IconMessage className="icon agenda-foot-icon" />
          {confirmados} confirmadas no WhatsApp
        </span>
        <span>2 vagas livres</span>
      </div>
    </div>
  );
}
