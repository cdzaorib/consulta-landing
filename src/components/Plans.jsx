import { motion } from 'framer-motion';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion.js';
import { VIEWPORT_SOFT, cardUp, fadeUp, reveal, stagger } from '../lib/motion.js';
import { ENTERPRISE, PLANS, SITE } from '../content.js';
import './Plans.css';

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
          variants={stagger()}
          initial={reduceMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={VIEWPORT_SOFT}
        >
          {PLANS.map((plan) => (
            <motion.li
              className={`plan${plan.featured ? ' featured' : ''}`}
              key={plan.name}
              variants={cardUp}
            >
              {plan.badge && <p className="badge badge-featured">{plan.badge}</p>}
              <h3>{plan.name}</h3>

              <p className="price">
                <span className="amount">{plan.price}</span>
                <span className="unit">{plan.unit}</span>
              </p>

              <p className="pitch">{plan.pitch}</p>

              {plan.inherits && (
                <p className="inherits">Todos os recursos do plano {plan.inherits} +</p>
              )}

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
          O valor é por profissional de saúde: um consultório de uma pessoa paga por uma.
          Condições completas na <a href={SITE.plansUrl}>página de planos</a>.
        </p>
      </div>
    </section>
  );
}
