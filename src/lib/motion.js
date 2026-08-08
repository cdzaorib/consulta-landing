/**
 * Variantes compartilhadas do Framer Motion.
 *
 * A regra da página: movimento curto, com easing de saída (nada de "bounce"),
 * e sempre desligável. Quando `prefers-reduced-motion` está ativo os
 * componentes passam `initial={false}`, então nenhuma variante `hidden` é
 * aplicada e o conteúdo aparece direto no estado final.
 *
 * Tudo que revela conteúdo usa DUR.base + EASE_OUT. Antes cada seção
 * declarava sua própria duração (0.42, 0.5, 0.55…) e três delas nem
 * passavam o easing, caindo no padrão do Framer — o resultado era uma
 * seção entrando com um ritmo e a seguinte com outro.
 */

export const EASE_OUT = [0.16, 1, 0.3, 1];

/** Escala de duração, em segundos. Espelha --dur-* em tokens.css. */
export const DUR = {
  /** trocas curtas: painel do menu, linha do feed da agenda */
  micro: 0.24,
  /** revelação padrão de qualquer bloco ou card */
  base: 0.5,
  /** entrada do hero — única coisa que pode respirar mais */
  entrance: 0.62,
};

/** Viewport padrão: revela uma vez só — reanimar a cada scroll cansa. */
export const VIEWPORT = { once: true, amount: 0.25 };
export const VIEWPORT_SOFT = { once: true, amount: 0.15 };

const transition = { duration: DUR.base, ease: EASE_OUT };

export const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition },
};

/** Card em grade — mesma curva do fadeUp, deslocamento um pouco maior. */
export const cardUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition },
};

/** Item pequeno dentro de um container escalonado. */
export const itemUp = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: DUR.micro * 1.75, ease: EASE_OUT } },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition },
};

/** Container que escalona os filhos. */
export function stagger(children = 0.08, delay = 0.04) {
  return {
    hidden: {},
    visible: { transition: { staggerChildren: children, delayChildren: delay } },
  };
}

/**
 * Props de revelação por scroll. `reduceMotion` desliga tudo.
 */
export function reveal(reduceMotion, variants = fadeUp, viewport = VIEWPORT) {
  if (reduceMotion) return {};
  return {
    variants,
    initial: 'hidden',
    whileInView: 'visible',
    viewport,
  };
}
