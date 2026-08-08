import { CLIENTS } from '../content.js';
import './LogosStrip.css';

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
      </div>
    </div>
  );
}
