import { useEffect, useRef, useState } from 'react';

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

export default function useCountUp(target, { isInView, duration = 1200, reduceMotion = false } = {}) {
  const [value, setValue] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!isInView) return undefined;

    if (reduceMotion) {
      setValue(target);
      return undefined;
    }

    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      setValue(target * easeOutCubic(progress));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isInView, target, duration, reduceMotion]);

  return value;
}
