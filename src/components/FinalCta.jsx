import { motion } from 'framer-motion';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion.js';
import { VIEWPORT_SOFT, fadeUp, stagger } from '../lib/motion.js';
import { FINAL_CTA, SITE } from '../content.js';
import './FinalCta.css';

export default function FinalCta() {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <section className="final-section">
      <div className="wrap">
        <motion.div
          className="final-cta surface-dark"
          variants={stagger()}
          initial={reduceMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={VIEWPORT_SOFT}
        >
          <div className="final-glow" aria-hidden="true" />

          <motion.p className="eyebrow on-dark" variants={fadeUp}>
            {FINAL_CTA.eyebrow}
          </motion.p>
          <motion.h2 variants={fadeUp}>{FINAL_CTA.title}</motion.h2>
          <motion.p className="final-lead" variants={fadeUp}>
            {FINAL_CTA.lead}
          </motion.p>

          <motion.div className="actions" variants={fadeUp}>
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

          <motion.p className="final-note" variants={fadeUp}>
            {FINAL_CTA.note}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
