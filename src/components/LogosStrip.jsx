import { CLIENTS } from '../content.js';
import './LogosStrip.css';

/* "a, b, c e d" — o Intl cuida da conjunção em português. */
const listFormatter = new Intl.ListFormat('pt-BR', { style: 'long', type: 'conjunction' });

export default function LogosStrip() {
  return (
    <div className="clients">
      <div className="wrap">
        <p className="label mono">{CLIENTS.title}</p>

        <ul className="client-logos">
          {CLIENTS.logos.map((logo) => (
            <li key={logo.name}>
              <img
                src={logo.src}
                alt={logo.name}
                width={logo.w}
                height={logo.h}
                loading="lazy"
                decoding="async"
              />
            </li>
          ))}
        </ul>

        {CLIENTS.others.length > 0 && (
          <p className="client-others">
            e também {listFormatter.format(CLIENTS.others)}
          </p>
        )}
      </div>
    </div>
  );
}
