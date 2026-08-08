import { motion } from 'framer-motion';
import DayScreen from './DayScreen.jsx';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion.js';
import { DUR, EASE_OUT, VIEWPORT, VIEWPORT_SOFT, fadeUp, itemUp, reveal, stagger } from '../lib/motion.js';
import './DaySection.css';

export default function DaySection({ hour, label, title, description, features, screen }) {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <motion.article className="day-block" {...reveal(reduceMotion, fadeUp, VIEWPORT_SOFT)}>
      <header className="day-time">
        <p className="hour mono">{hour}</p>
        <p className="label">{label}</p>
      </header>

      <div className="day-content">
        <h3>{title}</h3>
        <p className="desc">{description}</p>

        <div className="day-split">
          <motion.ul
            className="feature-row"
            variants={stagger(undefined, 0.1)}
            initial={reduceMotion ? false : 'hidden'}
            whileInView="visible"
            viewport={VIEWPORT}
          >
            {features.map((feature) => (
              <motion.li className="feature-item" key={feature.name} variants={itemUp}>
                <p className="name">{feature.name}</p>
                <p className="sub">{feature.sub}</p>
              </motion.li>
            ))}
          </motion.ul>

          {screen && (
            <motion.div
              className="day-screen-wrap"
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT_SOFT}
              transition={{ duration: DUR.base, delay: 0.12, ease: EASE_OUT }}
            >
              <DayScreen screen={screen} />
            </motion.div>
          )}
        </div>
      </div>
    </motion.article>
  );
}
