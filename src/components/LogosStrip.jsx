import { SPECIALTIES } from '../content.js';
import './LogosStrip.css';

export default function LogosStrip() {
  return (
    <div className="specialties">
      <div className="wrap">
        <p className="label mono">Feito para clínicas e consultórios de</p>
        <ul className="items">
          {SPECIALTIES.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
