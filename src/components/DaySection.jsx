import { motion } from 'framer-motion';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion.js';
import './DaySection.css';

const blockVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

const featureContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};

const featureVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function DaySection({ hour, label, title, description, features }) {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <motion.div
      className="day-block"
      initial={reduceMotion ? false : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={blockVariants}
    >
      <div className="day-time">
        <div className="hour mono">{hour}</div>
        <div className="label">{label}</div>
      </div>

      <div className="day-content">
        <h3>{title}</h3>
        <p className="desc">{description}</p>

        <motion.div
          className="feature-row"
          initial={reduceMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={featureContainer}
        >
          {features.map((feature) => (
            <motion.div
              className="feature-item"
              key={feature.name}
              variants={featureVariants}
              whileHover={reduceMotion ? undefined : {
                y: -3,
                scale: 1.02,
                transition: { type: 'spring', stiffness: 300, damping: 20 },
              }}
            >
              <div className="name">{feature.name}</div>
              <div className="sub">{feature.sub}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
