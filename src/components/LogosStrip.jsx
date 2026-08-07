import './LogosStrip.css';

const SPECIALTIES = ['Clínica geral', 'Odontologia', 'Fisioterapia', 'Psicologia', 'Dermatologia'];

export default function LogosStrip() {
  return (
    <div className="logos-strip">
      <div className="wrap">
        <span className="label">Confiado por especialidades como</span>
        <div className="items">
          {SPECIALTIES.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
