import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import Logo from './Logo.jsx';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion.js';
import { DUR, EASE_OUT } from '../lib/motion.js';
import { NAV, SITE } from '../content.js';
import './Header.css';

export default function Header() {
  const reduceMotion = usePrefersReducedMotion();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef(null);
  const panelRef = useRef(null);

  const { scrollY } = useScroll();
  const background = useTransform(
    scrollY,
    [0, 72],
    ['rgba(255, 255, 255, 0.72)', 'rgba(255, 255, 255, 0.94)']
  );
  const borderColor = useTransform(
    scrollY,
    [0, 72],
    ['rgba(230, 230, 230, 0)', 'rgba(230, 230, 230, 1)']
  );

  // Escape fecha o menu e devolve o foco ao botão que o abriu.
  useEffect(() => {
    if (!open) return undefined;

    function onKeyDown(event) {
      if (event.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    }

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  // Trava o scroll do body enquanto o painel está aberto.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <motion.header style={{ background, borderColor }}>
      <a className="skip-link" href="#conteudo">
        Ir para o conteúdo
      </a>

      <nav className="wrap nav" aria-label="Principal">
        <a href="#topo" className="nav-logo" aria-label={`${SITE.name}, página inicial`}>
          <Logo />
        </a>

        <ul className="nav-links">
          {NAV.map((link) => (
            <li key={link.href}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>

        <div className="nav-cta">
          <a href={SITE.loginUrl} className="btn btn-quiet">
            Entrar
          </a>
          <a href={SITE.trialUrl} className="btn btn-primary">
            Teste grátis
          </a>
        </div>

        <button
          type="button"
          ref={toggleRef}
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="menu-mobile"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="visually-hidden">{open ? 'Fechar menu' : 'Abrir menu'}</span>
          <span className={`bars${open ? ' is-open' : ''}`} aria-hidden="true">
            <span />
            <span />
          </span>
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-mobile"
            ref={panelRef}
            className="nav-panel"
            initial={reduceMotion ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: DUR.micro, ease: EASE_OUT }}
          >
            <ul>
              {NAV.map((link) => (
                <li key={link.href}>
                  <a href={link.href} onClick={() => setOpen(false)}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="nav-panel-cta">
              <a href={SITE.loginUrl} className="btn btn-ghost btn-block">
                Entrar
              </a>
              <a href={SITE.trialUrl} className="btn btn-primary btn-block">
                Teste grátis de 7 dias
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
