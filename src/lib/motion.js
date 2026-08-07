/**
 * Variantes compartilhadas do Framer Motion.
 *
 * A regra da página: movimento curto, com easing de saída (nada de "bounce"),
 * e sempre desligável. Quando `prefers-reduced-motion` está ativo os
 * componentes passam `initial={false}`, então nenhuma variante `hidden` é
 * aplicada e o conteúdo aparece direto no estado final.
 */

export const EASE_OUT = [0.16, 1, 0.3, 1];

/** Viewport padrão: revela uma vez só — reanimar a cada scroll cansa. */
export const VIEWPORT = { once: true, amount: 0.25 };
export const VIEWPORT_SOFT = { once: true, amount: 0.15 };

export const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE_OUT } },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: EASE_OUT } },
};

/** Container que escalona os filhos. */
export function stagger(children = 0.08, delay = 0.04) {
  return {
    hidden: {},
    visible: { transition: { staggerChildren: children, delayChildren: delay } },
  };
}

/** Elevação sutil no hover — usada em cards clicáveis. */
export const lift = {
  y: -3,
  transition: { type: 'spring', stiffness: 320, damping: 24 },
};

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
