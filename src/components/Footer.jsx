import Logo from './Logo.jsx';
import { CONTACT, FOOTER_COLUMNS, SITE } from '../content.js';
import './Footer.css';

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-grid">
          <div className="foot-brand">
            <Logo />
            <p>
              Agenda, prontuário, faturamento e financeiro da clínica em um só sistema, na nuvem.
            </p>
          </div>

          <nav className="foot-cols" aria-label="Rodapé">
            {FOOTER_COLUMNS.map((col) => (
              <div className="foot-col" key={col.title}>
                <h4>{col.title}</h4>
                <ul>
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a href={link.href}>{link.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="foot-col" key={CONTACT.title}>
              <h4>{CONTACT.title}</h4>
              <ul>
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
          </nav>
        </div>

        <div className="foot-bottom">
          <span>© 2026 {SITE.name}. Todos os direitos reservados.</span>
          <span>Dados em conformidade com a LGPD.</span>
        </div>
      </div>
    </footer>
  );
}
