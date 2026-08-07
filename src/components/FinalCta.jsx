import { motion } from 'framer-motion';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion.js';
import { EASE_OUT, VIEWPORT_SOFT, stagger } from '../lib/motion.js';
import { FINAL_CTA, SITE } from '../content.js';
import './FinalCta.css';

const item = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT } },
};

export default function FinalCta() {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <section className="final-section">
      <div className="wrap">
        <motion.div
          className="final-cta surface-dark"
          variants={stagger(0.1)}
          initial={reduceMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={VIEWPORT_SOFT}
        >
          <div className="final-glow" aria-hidden="true" />

          <motion.p className="eyebrow on-dark" variants={item}>
            {FINAL_CTA.eyebrow}
          </motion.p>
          <motion.h2 variants={item}>{FINAL_CTA.title}</motion.h2>
          <motion.p className="final-lead" variants={item}>
            {FINAL_CTA.lead}
          </motion.p>

          <motion.div className="actions" variants={item}>
            <a href={SITE.trialUrl} className="btn btn-on-dark">
              {FINAL_CTA.primaryCta}
              <span className="arrow" aria-hidden="true">
                →
              </span>
            </a>
            <a href={SITE.demoUrl} className="btn btn-outline-dark">
              {FINAL_CTA.secondaryCta}
            </a>
          </motion.div>

          <motion.p className="final-note" variants={item}>
            {FINAL_CTA.note}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
