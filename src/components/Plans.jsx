import { motion } from 'framer-motion';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion.js';
import { VIEWPORT_SOFT, fadeUp, lift, reveal, stagger } from '../lib/motion.js';
import { ENTERPRISE, PLANS, SITE } from '../content.js';
import './Plans.css';

const card = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Plans() {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <section id="planos" className="band-warm">
      <div className="wrap">
        <motion.div className="section-head center" {...reveal(reduceMotion, fadeUp)}>
          <p className="eyebrow">Planos</p>
          <h2>Comece pelo tamanho da sua clínica hoje</h2>
          <p>
            Todos os planos começam com 7 dias de teste grátis. Dá para subir de plano
            quando a clínica crescer, sem trocar de sistema.
          </p>
        </motion.div>

        <motion.ul
          className="plans-grid"
          variants={stagger(0.1)}
          initial={reduceMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={VIEWPORT_SOFT}
        >
          {PLANS.map((plan) => (
            <motion.li
              className={`plan${plan.featured ? ' featured' : ''}`}
              key={plan.name}
              variants={card}
              whileHover={reduceMotion ? undefined : lift}
            >
              <p className={`badge${plan.featured ? ' badge-featured' : ''}`}>{plan.badge}</p>
              <h3>{plan.name}</h3>
              <p className="pitch">{plan.pitch}</p>

              <ul className="plan-features">
                {plan.features.map((feature) => (
                  <li key={feature}>
                    <span className="tick" aria-hidden="true">
                      <svg viewBox="0 0 16 16" fill="none">
                        <path
                          d="M3.4 8.3 6.3 11.2l6.3-6.7"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              <a href={SITE.trialUrl} className={`btn btn-${plan.variant} btn-block`}>
                {plan.cta}
                <span className="arrow" aria-hidden="true">
                  →
                </span>
              </a>
            </motion.li>
          ))}
        </motion.ul>

        <motion.div className="plan-enterprise" {...reveal(reduceMotion, fadeUp)}>
          <div>
            <h3>{ENTERPRISE.name}</h3>
            <p>{ENTERPRISE.pitch}</p>
          </div>
          <a href={SITE.demoUrl} className="btn btn-ghost">
            {ENTERPRISE.cta}
            <span className="arrow" aria-hidden="true">
              →
            </span>
          </a>
        </motion.div>

        <p className="plans-note">
          Os valores de cada plano são apresentados na{' '}
          <a href={SITE.plansUrl}>página de planos</a>, de acordo com o número de profissionais
          da clínica.
        </p>
      </div>
    </section>
  );
}
