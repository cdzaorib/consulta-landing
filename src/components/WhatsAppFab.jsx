import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion.js';
import { DUR, EASE_OUT } from '../lib/motion.js';
import { CONTACT } from '../content.js';
import './WhatsAppFab.css';

/* Mesmo número do rodapé — o contato é um só. */
const WHATSAPP = CONTACT.items.find((item) => item.label === 'WhatsApp');

/* Blocos cujos botões o flutuante não pode cobrir. */
const BLOCKERS = '.final-cta, footer';

export default function WhatsAppFab() {
  const reduceMotion = usePrefersReducedMotion();
  const [pastHero, setPastHero] = useState(false);
  const [blocked, setBlocked] = useState(false);

  // Só aparece depois que o hero sai de vista: na primeira dobra o CTA
  // principal já está na tela e o flutuante seria ruído.
  useEffect(() => {
    const hero = document.getElementById('topo');
    if (!hero) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => setPastHero(!entry.isIntersecting),
      { threshold: 0 }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  // O `rootMargin` recorta a raiz na faixa inferior da tela, que é onde o
  // botão fica: o CTA final e o rodapé só escondem o flutuante quando de
  // fato chegam perto dele, não assim que entram na página.
  useEffect(() => {
    const targets = document.querySelectorAll(BLOCKERS);
    if (targets.length === 0) return undefined;

    const overlapping = new Set();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) overlapping.add(entry.target);
          else overlapping.delete(entry.target);
        }
        setBlocked(overlapping.size > 0);
      },
      { rootMargin: '-72% 0px 0px 0px', threshold: 0 }
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  if (!WHATSAPP) return null;

  const visible = pastHero && !blocked;

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          className="wa-fab"
          href={WHATSAPP.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Falar com a Conclínica pelo WhatsApp, ${WHATSAPP.value}`}
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.8 }}
          animate={reduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.8 }}
          transition={reduceMotion ? { duration: 0 } : { duration: DUR.micro, ease: EASE_OUT }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.86 9.86 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.23 8.23 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.19 8.19 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.79.97-.14.16-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.44.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.42-.14-.01-.31-.01-.47-.01-.17 0-.43.06-.66.31-.23.25-.87.85-.87 2.07s.89 2.4 1.02 2.56c.12.17 1.75 2.67 4.24 3.75.59.25 1.05.4 1.41.52.59.19 1.13.16 1.56.1.47-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.14-1.18-.06-.11-.22-.17-.47-.29Z" />
          </svg>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
