import { useLayoutEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import useCountUp from '../hooks/useCountUp.js';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion.js';
import { DUR, EASE_OUT, STAGGER, VIEWPORT_SOFT, fadeUp, itemUp, reveal, stagger } from '../lib/motion.js';
import { CALCULATOR, PLANS, SITE } from '../content.js';
import './PlanCalculator.css';

/**
 * Lê o preço da mesma string que a tabela mostra ("R$ 119"), em vez de manter
 * um número em paralelo: assim a calculadora não tem como divergir do card do
 * plano. Formato pt-BR, ponto de milhar e vírgula de centavos.
 */
function parsePrice(label) {
  const digits = label.replace(/[^\d.,]/g, '').replace(/\./g, '').replace(',', '.');
  return Number(digits);
}

const money = new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 0 });

/* O plano "Mais vendido" já vem escolhido. */
const DEFAULT_PLAN = Math.max(
  PLANS.findIndex((plan) => plan.featured),
  0
);

/* O slider vai de 1 a 10 e ganha uma parada a mais no fim: é por ela que se
   chega ao caso "acima de 10", que não tem preço calculado. */
const MAX_STEP = CALCULATOR.maxTeam + 1;

export default function PlanCalculator() {
  const reduceMotion = usePrefersReducedMotion();
  const [team, setTeam] = useState(4);
  const [planIndex, setPlanIndex] = useState(DEFAULT_PLAN);

  const rootRef = useRef(null);
  const isInView = useInView(rootRef, { once: true, amount: 0.3 });

  const planRefs = useRef([]);
  const featuresRef = useRef(null);
  const [featuresHeight, setFeaturesHeight] = useState(null);

  const plan = PLANS[planIndex];
  const price = parsePrice(plan.price);
  const overTeam = team > CALCULATOR.maxTeam;
  // No modo cotação o total não aparece, mas continua valendo o de 10
  // profissionais: voltar o slider não faz o número saltar.
  const total = Math.min(team, CALCULATOR.maxTeam) * price;

  /* A contagem parte do valor que está na tela, não do zero: arrastando o
     slider o número persegue o alvo em vez de zerar a cada passo. */
  const counted = useCountUp(total, {
    isInView,
    duration: DUR.base * 1000,
    reduceMotion,
    continuous: true,
  });

  /* Os planos têm de 5 a 8 recursos. Em vez de reservar a altura do maior e
     deixar um vão sob os menores, a caixa mede o conteúdo novo antes da
     pintura e anima da altura antiga para a nova. */
  useLayoutEffect(() => {
    if (!featuresRef.current) return;
    setFeaturesHeight(featuresRef.current.offsetHeight);
  }, [planIndex, overTeam]);

  function onPlanKeyDown(event) {
    const last = PLANS.length - 1;
    const moves = {
      ArrowRight: planIndex === last ? 0 : planIndex + 1,
      ArrowDown: planIndex === last ? 0 : planIndex + 1,
      ArrowLeft: planIndex === 0 ? last : planIndex - 1,
      ArrowUp: planIndex === 0 ? last : planIndex - 1,
      Home: 0,
      End: last,
    };

    const next = moves[event.key];
    if (next === undefined) return;

    event.preventDefault();
    setPlanIndex(next);
    planRefs.current[next]?.focus();
  }

  const fill = ((team - 1) / (MAX_STEP - 1)) * 100;

  return (
    <motion.div
      className="calc"
      id="calculadora"
      ref={rootRef}
      {...reveal(reduceMotion, fadeUp, VIEWPORT_SOFT)}
    >
      <div className="calc-head">
        <h3>{CALCULATOR.title}</h3>
        <p>{CALCULATOR.lead}</p>
      </div>

      <div className="calc-grid">
        <div className="calc-controls">
          <div className="calc-field">
            <div className="calc-field-head">
              <label className="calc-label" htmlFor="calc-equipe">
                {CALCULATOR.professionalsLabel}
              </label>
              <p className="calc-team" aria-hidden="true">
                {overTeam ? `${CALCULATOR.maxTeam}+` : team}
              </p>
            </div>

            <input
              id="calc-equipe"
              className="calc-range"
              type="range"
              min="1"
              max={MAX_STEP}
              step="1"
              value={team}
              style={{ '--fill': `${fill}%` }}
              aria-valuenow={team}
              aria-valuetext={
                overTeam
                  ? `mais de ${CALCULATOR.maxTeam} profissionais de saúde`
                  : `${team} ${team === 1 ? 'profissional' : 'profissionais'} de saúde`
              }
              onChange={(event) => setTeam(Number(event.target.value))}
            />

            <p className="calc-scale" aria-hidden="true">
              <span>1</span>
              <span>{CALCULATOR.maxTeam}+</span>
            </p>
          </div>

          <div className="calc-field">
            <p className="calc-label" id="calc-plano-label">
              {CALCULATOR.planLabel}
            </p>

            <div
              className="calc-plans"
              role="radiogroup"
              aria-labelledby="calc-plano-label"
              onKeyDown={onPlanKeyDown}
            >
              {PLANS.map((option, index) => {
                const checked = index === planIndex;

                return (
                  <button
                    key={option.name}
                    type="button"
                    role="radio"
                    aria-checked={checked}
                    tabIndex={checked ? 0 : -1}
                    className={`calc-plan${checked ? ' is-checked' : ''}`}
                    ref={(el) => {
                      planRefs.current[index] = el;
                    }}
                    onClick={() => setPlanIndex(index)}
                  >
                    <span className="calc-plan-name">{option.name}</span>
                    <span className="calc-plan-price">{option.price}</span>
                    {option.badge && <span className="calc-plan-badge">{option.badge}</span>}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="calc-result">
          {overTeam ? (
            <div className="calc-quote">
              <h4>{CALCULATOR.quote.title}</h4>
              <p>{CALCULATOR.quote.text}</p>
              <a href={SITE.demoUrl} className="btn btn-primary btn-block">
                {CALCULATOR.quote.cta}
                <span className="arrow" aria-hidden="true">
                  →
                </span>
              </a>
            </div>
          ) : (
            <>
              {/* O número da tela conta quadro a quadro e por isso fica fora
                  da leitura de tela: quem usa leitor ouve o valor já fechado,
                  uma vez por mudança, pela região viva abaixo. */}
              <p className="calc-total" aria-hidden="true">
                <span className="calc-currency">R$</span>
                <span className="calc-amount">{money.format(Math.round(counted))}</span>
              </p>
              <p className="visually-hidden" aria-live="polite">
                Total de R$ {money.format(total)} {CALCULATOR.totalCaption}.
              </p>
              <p className="calc-caption" aria-hidden="true">
                {CALCULATOR.totalCaption}
              </p>

              <p className="calc-math">
                {team} {team === 1 ? 'profissional' : 'profissionais'} × {plan.price}/mês
                <span className="calc-math-plan"> no plano {plan.name}</span>
              </p>

              <motion.div
                className="calc-feats"
                initial={false}
                animate={{ height: featuresHeight ?? 'auto' }}
                transition={reduceMotion ? { duration: 0 } : { duration: DUR.micro, ease: EASE_OUT }}
              >
                <div ref={featuresRef}>
                  {plan.inherits && (
                    <p className="calc-inherits">Todos os recursos do plano {plan.inherits} +</p>
                  )}

                  <motion.ul
                    key={plan.name}
                    className="calc-feat-list"
                    variants={stagger(STAGGER, 0.02)}
                    initial={reduceMotion ? false : 'hidden'}
                    animate="visible"
                  >
                    {plan.features.map((feature) => (
                      <motion.li key={feature} variants={reduceMotion ? undefined : itemUp}>
                        <span className="tick" aria-hidden="true">
                          <svg viewBox="0 0 12 12" fill="none">
                            <path
                              d="M2.5 6.2 4.8 8.5 9.5 3.5"
                              stroke="currentColor"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                        {feature}
                      </motion.li>
                    ))}
                  </motion.ul>
                </div>
              </motion.div>

              <a href={SITE.trialUrl} className="btn btn-primary btn-block calc-cta">
                {CALCULATOR.cta}
                <span className="arrow" aria-hidden="true">
                  →
                </span>
              </a>

              <p className="calc-note">{CALCULATOR.note}</p>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}
