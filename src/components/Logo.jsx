/**
 * Lockup da Conclínica, reproduzido a partir do site oficial:
 * laço de infinito + "con" em verde da marca e "clínica" em ardósia escura,
 * tudo em caixa baixa.
 *
 * É uma reconstrução aproximada — trocar pelo SVG oficial assim que a
 * empresa enviar o arquivo (ver docs/imagens-desejadas.md).
 */
export default function Logo({ onDark = false, as: Tag = 'span' }) {
  return (
    <Tag className={`logo${onDark ? ' on-dark' : ''}`}>
      <svg className="logo-mark" viewBox="0 0 48 32" fill="none" aria-hidden="true">
        <g stroke="currentColor" strokeWidth="4.2">
          <circle cx="13" cy="16" r="9" />
          <circle cx="31" cy="16" r="9" />
        </g>
        <path
          d="M16.5 21.5 27.5 10.5"
          stroke="currentColor"
          strokeWidth="4.2"
          strokeLinecap="round"
        />
      </svg>
      <span className="logo-word">
        <span className="logo-con">con</span>
        <span className="logo-clinica">clínica</span>
      </span>
    </Tag>
  );
}
