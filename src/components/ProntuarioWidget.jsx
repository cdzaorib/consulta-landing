import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion.js';
import { IconStethoscope } from './Icons.jsx';
import './ProntuarioWidget.css';

const FIELDS = [
  {
    label: 'Queixa principal',
    text: 'Dor lombar há 3 semanas, piora ao fim do dia.',
  },
  {
    label: 'Exame físico',
    text: 'Mobilidade preservada. Dor à palpação em L4-L5.',
  },
  {
    label: 'Conduta',
    text: 'Anti-inflamatório 7 dias + fisioterapia 2x/semana.',
  },
];

const CHAR_MS = 26;
const FIELD_PAUSE_MS = 700;
const RESTART_PAUSE_MS = 3200;

const FULL_LENGTH = FIELDS.reduce((sum, f) => sum + f.text.length, 0);

/**
 * Digita os campos em sequência, como se a consulta estivesse virando
 * registro em tempo real. `progress` é a contagem de caracteres já
 * "digitados" somando todos os campos, o que mantém um único timer.
 */
export default function ProntuarioWidget() {
  const reduceMotion = usePrefersReducedMotion();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.4 });
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Fora da tela ou com movimento reduzido: mostra o registro pronto.
    // O conteúdo é o mesmo — só não é encenado.
    if (reduceMotion || !isInView) {
      setProgress(FULL_LENGTH);
      return undefined;
    }

    setProgress(0);
    let charCount = 0;
    let timeoutId;

    function step() {
      charCount += 1;

      if (charCount > FULL_LENGTH) {
        timeoutId = setTimeout(() => {
          charCount = 0;
          setProgress(0);
          timeoutId = setTimeout(step, CHAR_MS);
        }, RESTART_PAUSE_MS);
        return;
      }

      setProgress(charCount);

      // Pausa maior ao terminar um campo, antes de começar o próximo
      let consumed = 0;
      let atFieldEnd = false;
      for (const field of FIELDS) {
        consumed += field.text.length;
        if (charCount === consumed) {
          atFieldEnd = true;
          break;
        }
      }

      timeoutId = setTimeout(step, atFieldEnd ? FIELD_PAUSE_MS : CHAR_MS);
    }

    timeoutId = setTimeout(step, 400);
    return () => clearTimeout(timeoutId);
  }, [reduceMotion, isInView]);

  // Distribui o progresso global entre os campos
  let remaining = progress;
  const typed = FIELDS.map((field) => {
    const shown = Math.max(0, Math.min(field.text.length, remaining));
    remaining -= field.text.length;
    return shown;
  });

  const done = progress >= FULL_LENGTH;

  return (
    <div className="pront-card" ref={ref}>
      <div className="pront-head">
        <div className="pront-who">
          <span className="pront-avatar" aria-hidden="true">LM</span>
          <div>
            <div className="title">Larissa Moraes, 34</div>
            <div className="date mono">Retorno · 08:00</div>
          </div>
        </div>
        <IconStethoscope className="icon pront-badge" />
      </div>

      {/* aria-live="polite": leitores de tela recebem o texto final,
          não cada caractere digitado */}
      <div className="pront-body" aria-live="polite" aria-atomic="true">
        {FIELDS.map((field, i) => (
          <div className="pront-field" key={field.label}>
            <div className="pront-label mono">{field.label}</div>
            <p className="pront-text">
              {field.text.slice(0, typed[i])}
              {!done && typed[i] > 0 && typed[i] < field.text.length && (
                <span className="pront-caret" aria-hidden="true" />
              )}
            </p>
          </div>
        ))}
      </div>

      <div className={`pront-foot${done ? ' is-done' : ''}`}>
        <span className="pront-status">
          {done ? 'Registro salvo e assinado' : 'Escrevendo durante o atendimento…'}
        </span>
        <span className="mono">CID M54.5</span>
      </div>
    </div>
  );
}
