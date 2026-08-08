import { useState } from 'react';
import Logo from './Logo.jsx';
import useMediaQuery from '../hooks/useMediaQuery.js';
import { CONTACT, FOOTER_COLUMNS, SITE, SOCIAL } from '../content.js';
import './Footer.css';

/* Glifos das redes, desenhados aqui para não trazer uma biblioteca de
   ícones inteira por quatro símbolos. */
const SOCIAL_ICONS = {
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
    </>
  ),
  facebook: (
    <path d="M14.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5H17.6V4.4A20 20 0 0 0 15.3 4.3C13 4.3 11.5 5.7 11.5 8.2v2.3H9v3h2.5V21" />
  ),
  youtube: (
    <>
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
      <path d="M10.3 9.6v4.8l4.2-2.4-4.2-2.4Z" fill="currentColor" stroke="none" />
    </>
  ),
  tiktok: (
    <path d="M14.2 3.5v10.9a3.2 3.2 0 1 1-2.6-3.2M14.2 3.5c.3 2.2 1.9 3.8 4.1 4" />
  ),
};

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

          <div className="foot-reach">
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

            <ul className="foot-social">
              {SOCIAL.map((net) => (
                <li key={net.name}>
                  <a href={net.href} aria-label={net.name}>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      {SOCIAL_ICONS[net.icon]}
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="foot-bottom">
          <span>© 2026 {SITE.name}. Todos os direitos reservados.</span>
          <span>Dados em conformidade com a LGPD.</span>
        </div>
      </div>
    </footer>
  );
}
