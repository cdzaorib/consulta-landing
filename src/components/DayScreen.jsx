import './DayScreen.css';

/**
 * Recorte da interface do Conclínica, reconstruído em HTML/CSS a partir dos
 * screenshots do produto: mesmos rótulos, mesmos status e mesma ordem dos
 * campos das telas de agenda, prontuário e cobrança.
 *
 * É uma reconstrução, não uma captura — quando as imagens oficiais entrarem
 * no repositório, cada um destes blocos vira um <img>.
 */

function AgendaScreen({ rows }) {
  return (
    <ul className="scr-agenda">
      {rows.map((row, i) => (
        <li className={`scr-row tone-${row.tone}`} key={`${row.time}-${i}`}>
          <span className="scr-time mono">{row.time}</span>
          <span className="scr-status">{row.status}</span>
          {row.name ? (
            <span className="scr-who">
              <span className="scr-name">{row.name}</span>
              <span className="scr-tag">{row.tag}</span>
            </span>
          ) : (
            <span className="scr-who scr-free">Horário disponível</span>
          )}
        </li>
      ))}
    </ul>
  );
}

function ProntuarioScreen({ fields, groupTitle, group }) {
  return (
    <div className="scr-record">
      <dl className="scr-fields">
        {fields.map((f) => (
          <div className="scr-field" key={f.label}>
            <dt>{f.label}</dt>
            <dd>{f.value}</dd>
          </div>
        ))}
      </dl>

      <p className="scr-group-title">
        <span className="scr-caret" aria-hidden="true">
          ⌄
        </span>
        {groupTitle}
      </p>
      <ul className="scr-group">
        {group.map((item) => (
          <li key={item}>
            <span className="scr-chevron" aria-hidden="true">
              ›
            </span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function BoletoScreen({ fields, pair, actions }) {
  return (
    <div className="scr-form">
      {fields.map((f) => (
        <p className="scr-input" key={f.label}>
          <span className="scr-label">{f.label}</span>
          <span className="scr-value">{f.value}</span>
        </p>
      ))}

      <div className="scr-pair">
        {pair.map((f) => (
          <p className="scr-input" key={f.label}>
            <span className="scr-label">{f.label}</span>
            <span className="scr-value">{f.value}</span>
          </p>
        ))}
      </div>

      <div className="scr-actions">
        <span className="scr-btn ghost">{actions[0]}</span>
        <span className="scr-btn solid">{actions[1]}</span>
      </div>
    </div>
  );
}

const RENDERERS = {
  agenda: AgendaScreen,
  prontuario: ProntuarioScreen,
  boleto: BoletoScreen,
};

export default function DayScreen({ screen }) {
  const Body = RENDERERS[screen.kind];
  if (!Body) return null;

  return (
    <figure className="day-screen" aria-hidden="true">
      <div className="scr-chrome">
        <span className="scr-dots">
          <i />
          <i />
          <i />
        </span>
        <span className="scr-title">{screen.title}</span>
        <span className="scr-caption mono">{screen.caption}</span>
      </div>

      <div className="scr-body">
        <Body {...screen} />
      </div>
    </figure>
  );
}
