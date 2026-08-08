import { useState } from 'react';
import Logo from './Logo.jsx';
import useMediaQuery from '../hooks/useMediaQuery.js';
import { CONTACT, FOOTER_COLUMNS, SITE } from '../content.js';
import './Footer.css';

/**
 * O rodapé reproduz a arquitetura do site oficial: quatro colunas de links e,
 * embaixo, a marca com os contatos.
 *
 * São 22 links — empilhados no celular isso vira uma parede. Por isso, abaixo
 * de 860px cada coluna vira um acordeão (é o que o site faz também) e a partir
 * daí o título volta a ser um `h4` com a lista sempre aberta. A troca é de
 * estrutura, não de CSS, para não deixar um `aria-expanded` mentindo sobre
 * conteúdo visível.
 */

function FooterColumn({ column, isDesktop }) {
  const [open, setOpen] = useState(false);
  const panelId = `rodape-${column.title.toLowerCase().replace(/\W+/g, '-')}`;

  const list = (
    <ul id={panelId} hidden={!isDesktop && !open}>
      {column.links.map((link) => (
        <li key={link.label}>
          <a href={link.href}>{link.label}</a>
        </li>
      ))}
    </ul>
  );

  if (isDesktop) {
    return (
      <div className="foot-col">
        <h4>{column.title}</h4>
        {list}
      </div>
    );
  }

  return (
    <div className="foot-col">
      <h4>
        <button
          type="button"
          className="foot-toggle"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
        >
          {column.title}
          <span className={`chevron${open ? ' is-open' : ''}`} aria-hidden="true">
            <svg viewBox="0 0 16 16" fill="none">
              <path
                d="m4 6 4 4 4-4"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </button>
      </h4>
      {list}
    </div>
  );
}

export default function Footer() {
  const isDesktop = useMediaQuery('(min-width: 860px)');

  return (
    <footer>
      <div className="wrap">
        <nav className="foot-cols" aria-label="Rodapé">
          {FOOTER_COLUMNS.map((column) => (
            <FooterColumn key={column.title} column={column} isDesktop={isDesktop} />
          ))}
        </nav>

        <div className="foot-brand">
          <div>
            <Logo />
            <p className="foot-tagline">
              Agenda, prontuário, faturamento e financeiro da clínica em um só sistema, na nuvem.
            </p>
          </div>

          <ul className="foot-contacts">
            {CONTACT.items.map((item) => (
              <li key={item.label}>
                <a href={item.href} className="foot-contact">
                  <span className="foot-contact-label">{item.label}</span>
                  <span className="foot-contact-value">{item.value}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="foot-bottom">
          <span>© 2026 {SITE.name}. Todos os direitos reservados.</span>
          <span>Dados em conformidade com a LGPD.</span>
        </div>
      </div>
    </footer>
  );
}
