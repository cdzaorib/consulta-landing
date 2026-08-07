import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion.js';
import { EASE_OUT } from '../lib/motion.js';
import './AgendaWidget.css';

/**
 * A agenda "viva": um recorte do produto que continua se mexendo sozinho,
 * mostrando as automações reais do Conclínica (confirmação por WhatsApp,
 * encaixe da fila de espera, telemedicina e faturamento).
 *
 * O ciclo avança em passos; cada passo muda o estado de um horário e
 * publica um evento no rodapé. Com `prefers-reduced-motion` o widget
 * congela no último passo, sem timers e sem animação.
 */

const TOTAL_STEPS = 4;

const SLOTS = [
  { time: '08:00', name: 'Larissa M.', kind: 'Retorno', tone: 'sage', confirmedAt: 0 },
  { time: '08:40', name: 'Rafael T.', kind: '1ª consulta', tone: 'sage', confirmedAt: 1 },
  { time: '09:20', name: null, kind: 'Vaga livre', tone: 'empty', filledAt: 2 },
  { time: '10:00', name: 'Telemedicina', kind: 'Google Meet', tone: 'clay', confirmedAt: 0 },
  { time: '10:40', name: 'Bloco de exames', kind: 'Coleta', tone: 'sage', confirmedAt: 0 },
];

const EVENTS = [
  { icon: 'whats', text: 'Confirmação enviada por WhatsApp' },
  { icon: 'check', text: 'Rafael T. confirmou a consulta' },
  { icon: 'plus', text: 'Encaixe da fila de espera às 09:20' },
  { icon: 'doc', text: 'Guia TISS gerada para o convênio' },
];

const ICONS = {
  whats: 'M8 1.6a6.4 6.4 0 0 0-5.5 9.6L1.6 14.4l3.3-.85A6.4 6.4 0 1 0 8 1.6Z',
  check: 'M2.8 8.4 6 11.6l7.2-7.2',
  plus: 'M8 3v10M3 8h10',
  doc: 'M4 1.8h5l3 3v9.4H4V1.8Zm2.4 6.6h3.2M6.4 11h3.2',
};

function EventIcon({ name }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d={ICONS[name]}
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function AgendaWidget() {
  const reduceMotion = usePrefersReducedMotion();
  // Sem movimento: mostra direto o estado final do ciclo.
  const [step, setStep] = useState(reduceMotion ? TOTAL_STEPS - 1 : 0);

  useEffect(() => {
    if (reduceMotion) {
      setStep(TOTAL_STEPS - 1);
      return undefined;
    }
    const id = setInterval(() => setStep((s) => (s + 1) % TOTAL_STEPS), 3200);
    return () => clearInterval(id);
  }, [reduceMotion]);

  const slots = SLOTS.map((slot) => {
    const filled = slot.filledAt === undefined ? true : step >= slot.filledAt;
    return {
      ...slot,
      filled,
      name: filled && slot.filledAt !== undefined ? 'Dona Iracema' : slot.name,
      kind: filled && slot.filledAt !== undefined ? 'Encaixe' : slot.kind,
      tone: filled && slot.filledAt !== undefined ? 'clay' : slot.tone,
      confirmed: slot.confirmedAt !== undefined && step >= slot.confirmedAt,
    };
  });

  const booked = slots.filter((s) => s.filled).length;
  const free = slots.length - booked;
  const event = EVENTS[step];

  return (
    <figure className="agenda-card">
      <figcaption className="visually-hidden">
        Exemplo da agenda do Conclínica com {booked} horários preenchidos.
      </figcaption>

      <div className="agenda-head">
        <div>
          <p className="agenda-title">Agenda de hoje</p>
          <p className="agenda-date mono">Clínica Vida — Dra. Helena</p>
        </div>
        <span className="agenda-live">
          <span className="pulse" aria-hidden="true" />
          ao vivo
        </span>
      </div>

      <ul className="agenda-slots">
        {slots.map((slot) => (
          <li className="slot" key={slot.time}>
            <time className="mono">{slot.time}</time>

            <div className={`slot-block tone-${slot.tone}`}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={`${slot.time}-${slot.filled}`}
                  className="slot-body"
                  initial={reduceMotion ? false : { opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: 8 }}
                  transition={{ duration: 0.34, ease: EASE_OUT }}
                >
                  {slot.filled ? (
                    <>
                      <span className="slot-name">{slot.name}</span>
                      <span className="slot-kind">{slot.kind}</span>
                    </>
                  ) : (
                    <span className="slot-empty">Vaga livre</span>
                  )}
                </motion.div>
              </AnimatePresence>

              {slot.filled && slot.confirmed && (
                <motion.span
                  className="slot-check"
                  aria-label="confirmado"
                  initial={reduceMotion ? false : { scale: 0.4, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 420, damping: 22 }}
                >
                  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path
                      d="M3.4 8.4 6.4 11.4l6.2-6.6"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.span>
              )}
            </div>
          </li>
        ))}
      </ul>

      <div className="agenda-foot">
        <div className="agenda-event" aria-live="polite">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={event.text}
              className="event-line"
              initial={reduceMotion ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
              transition={{ duration: 0.3, ease: EASE_OUT }}
            >
              <span className="event-icon" aria-hidden="true">
                <EventIcon name={event.icon} />
              </span>
              {event.text}
            </motion.span>
          </AnimatePresence>
        </div>

        <div className="agenda-counts mono">
          <span>{booked} confirmadas</span>
          <span aria-hidden="true">·</span>
          <span>
            {free} {free === 1 ? 'vaga' : 'vagas'}
          </span>
        </div>
      </div>
    </figure>
  );
}
