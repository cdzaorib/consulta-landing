import { useEffect, useRef, useState } from 'react';

/**
 * Desaceleração forte no fim: o número dispara, perde velocidade e "assenta"
 * no valor final, em vez de subir em ritmo constante e parar de repente.
 *
 * A referência de motion sugere curvas de mola para dar naturalidade, mas
 * mola passa do alvo e volta — num contador isso mostraria "512" antes de
 * fechar em 500. Para número, ease-out polinomial é o certo.
 */
function easeOutQuart(t) {
  return 1 - Math.pow(1 - t, 4);
}

/**
 * Conta de 0 até `target` quando o elemento entra na tela.
 *
 * - `delay` escalona o início entre cards vizinhos, para que não contem todos
 *   no mesmo instante.
 * - Com `reduceMotion` o valor final aparece direto. A checagem vem antes da
 *   de `isInView` de propósito: sem isso, quem tem a preferência ligada veria
 *   zero até rolar até a seção.
 * - Quem chama passa `isInView` de um `useInView({ once: true })`, então a
 *   contagem acontece uma vez só e não se repete a cada scroll.
 */
export default function useCountUp(
  target,
  { isInView, duration = 1100, delay = 0, reduceMotion = false } = {}
) {
  const [value, setValue] = useState(reduceMotion ? target : 0);
  const rafRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    if (reduceMotion) {
      setValue(target);
      return undefined;
    }

    if (!isInView) return undefined;

    function start() {
      const t0 = performance.now();

      function tick(now) {
        const progress = Math.min((now - t0) / duration, 1);
        if (progress < 1) {
          setValue(target * easeOutQuart(progress));
          rafRef.current = requestAnimationFrame(tick);
        } else {
          // fecha no valor exato, sem depender do arredondamento
          setValue(target);
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    }

    if (delay > 0) {
      timerRef.current = setTimeout(start, delay);
    } else {
      start();
    }

    return () => {
      cancelAnimationFrame(rafRef.current);
      clearTimeout(timerRef.current);
    };
  }, [isInView, target, duration, delay, reduceMotion]);

  return value;
}
