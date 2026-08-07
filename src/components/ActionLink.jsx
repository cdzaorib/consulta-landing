import { motion } from 'framer-motion';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion.js';

const SPRING = { type: 'spring', stiffness: 400, damping: 26, mass: 0.6 };

/**
 * Link de ação com resposta física ao toque.
 * O afundar no clique (0.97) é o que faz o botão parecer um objeto e não
 * uma área clicável — mas some inteiro com movimento reduzido.
 */
export default function ActionLink({ className = '', children, ...props }) {
  const reduceMotion = usePrefersReducedMotion();

  if (reduceMotion) {
    return <a className={className} {...props}>{children}</a>;
  }

  return (
    <motion.a
      className={className}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97, y: 0 }}
      transition={SPRING}
      {...props}
    >
      {children}
    </motion.a>
  );
}
