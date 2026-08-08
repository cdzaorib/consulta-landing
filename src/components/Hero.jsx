import { motion } from 'framer-motion';
import AgendaWidget from './AgendaWidget.jsx';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion.js';
import { DUR, EASE_OUT, stagger } from '../lib/motion.js';
import { HERO, SITE } from '../content.js';
import './Hero.css';

const item = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: DUR.entrance, ease: EASE_OUT } },
};

export default function Hero() {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <section className="hero" id="topo">
      <div className="hero-glow" aria-hidden="true" />

      <div className="wrap hero-grid">
        <motion.div
          className="hero-copy"
          variants={stagger(0.1, 0.05)}
          initial={reduceMotion ? false : 'hidden'}
          animate="visible"
        >
          <motion.p className="eyebrow" variants={item}>
            {HERO.eyebrow}
          </motion.p>

          <motion.h1 variants={item}>
            {HERO.titleStart}
            <em>{HERO.titleEm}</em>
            {HERO.titleEnd}
          </motion.h1>

          <motion.p className="lead" variants={item}>
            {HERO.lead}
          </motion.p>

          <motion.div className="actions" variants={item}>
            <a href={SITE.trialUrl} className="btn btn-primary">
              {HERO.primaryCta}
              <span className="arrow" aria-hidden="true">
                →
              </span>
            </a>
            <a href="#mudanca" className="btn btn-ghost">
              {HERO.secondaryCta}
            </a>
          </motion.div>

          <motion.p className="hero-note" variants={item}>
            <span className="shield" aria-hidden="true">
              <svg viewBox="0 0 16 16" fill="none">
                <path
                  d="M8 1.5 13 3.4v4.2c0 3-2.1 5.7-5 6.9-2.9-1.2-5-3.9-5-6.9V3.4L8 1.5Z"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinejoin="round"
                />
                <path
                  d="m5.9 8 1.5 1.5 2.8-3"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            {HERO.note}
          </motion.p>
        </motion.div>

        <motion.div
          className="hero-visual"
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DUR.entrance, delay: 0.2, ease: EASE_OUT }}
        >
          <AgendaWidget />
        </motion.div>
      </div>
    </section>
  );
}
