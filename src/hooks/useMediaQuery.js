import { useEffect, useState } from 'react';

/**
 * Acompanha uma media query. Usado para trocar de estrutura, não só de
 * estilo — no rodapé o mobile monta um acordeão com botão e o desktop
 * monta um título simples com a lista sempre visível.
 */
export default function useMediaQuery(query) {
  const [matches, setMatches] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches
  );

  useEffect(() => {
    const mql = window.matchMedia(query);
    const handleChange = (event) => setMatches(event.matches);
    setMatches(mql.matches);
    mql.addEventListener('change', handleChange);
    return () => mql.removeEventListener('change', handleChange);
  }, [query]);

  return matches;
}
