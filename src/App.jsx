import { motion } from 'framer-motion';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import BeforeAfter from './components/BeforeAfter.jsx';
import LogosStrip from './components/LogosStrip.jsx';
import DaySection from './components/DaySection.jsx';
import Metrics from './components/Metrics.jsx';
import Testimonials from './components/Testimonials.jsx';
import Plans from './components/Plans.jsx';
import FinalCta from './components/FinalCta.jsx';
import Blog from './components/Blog.jsx';
import Footer from './components/Footer.jsx';
import usePrefersReducedMotion from './hooks/usePrefersReducedMotion.js';
import { fadeUp, reveal } from './lib/motion.js';
import { DAY_BLOCKS } from './content.js';

export default function App() {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <>
      <Header />

      <main id="conteudo">
        <Hero />
        <LogosStrip />
        <BeforeAfter />

        <section id="dia">
          <div className="wrap">
            <motion.div className="section-head" {...reveal(reduceMotion, fadeUp)}>
              <p className="eyebrow">Como funciona</p>
              <h2>Um sistema, o dia inteiro da clínica</h2>
              <p>
                Em vez de módulos soltos, o Conclínica acompanha o fluxo real de um dia de
                atendimento — da chegada do primeiro paciente ao fechamento do caixa.
              </p>
            </motion.div>

            {DAY_BLOCKS.map((block) => (
              <DaySection key={block.hour} {...block} />
            ))}
          </div>
        </section>

        <Metrics />
        <Testimonials />
        <Plans />
        <FinalCta />
        <Blog />
      </main>

      <Footer />
    </>
  );
}
