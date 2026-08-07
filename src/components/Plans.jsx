import { motion } from 'framer-motion';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion.js';
import './Plans.css';

const PLANS = [
  {
    badge: 'Consultório',
    name: 'Individual',
    price: 'R$ 89',
    period: '/mês',
    features: ['Agenda online', 'Prontuário eletrônico', 'Confirmação via WhatsApp', '1 profissional'],
    cta: 'Começar teste grátis',
    variant: 'ghost',
  },
  {
    badge: 'Mais escolhido',
    name: 'Clínica',
    price: 'R$ 249',
    period: '/mês',
    features: ['Tudo do plano Individual', 'Faturamento TISS', 'Controle financeiro completo', 'Até 10 profissionais'],
    cta: 'Começar teste grátis',
    variant: 'primary',
    featured: true,
  },
  {
    badge: 'Rede',
    name: 'Enterprise',
    price: 'Sob consulta',
    features: ['Multiunidades', 'Integração via API', 'Gestão remota centralizada', 'Suporte dedicado'],
    cta: 'Falar com consultor',
    variant: 'ghost',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Plans() {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <section id="planos">
      <div className="wrap">
        <div className="day-header">
          <div className="eyebrow">Planos</div>
          <h2>Um plano para cada tamanho de clínica</h2>
        </div>

        <div className="plans-grid">
          {PLANS.map((plan) => (
            <motion.div
              className={`plan${plan.featured ? ' featured' : ''}`}
              key={plan.name}
              initial={reduceMotion ? false : 'hidden'}
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              variants={cardVariants}
              whileHover={reduceMotion ? undefined : {
                y: -4,
                scale: 1.015,
                transition: { type: 'spring', stiffness: 300, damping: 20 },
              }}
            >
              <div className="badge">{plan.badge}</div>
              <h3>{plan.name}</h3>
              <div className="price">
                {plan.price}
                {plan.period && <span>{plan.period}</span>}
              </div>
              <ul>
                {plan.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <a href="#" className={`btn btn-${plan.variant}`}>{plan.cta}</a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
