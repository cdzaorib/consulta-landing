import Logo from './Logo.jsx';
import { FOOTER_COLUMNS, SITE } from '../content.js';
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
