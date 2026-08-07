import { SITE } from '../content.js';

/**
 * Wordmark do Conclínica: o "C" aberto com o ponto terracota no vão,
 * mesma construção do favicon.
 */
export default function Logo({ onDark = false, as: Tag = 'span' }) {
  return (
    <Tag className={`logo${onDark ? ' on-dark' : ''}`}>
      <span className="mark" aria-hidden="true">
        <svg viewBox="0 0 48 48" fill="none">
          <path
            d="M32.49 15.51A12 12 0 1 0 32.49 32.49"
            stroke="#F1F5F1"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <circle cx="34.5" cy="24" r="4.2" fill="#C4735A" />
        </svg>
      </span>
      {SITE.name}
    </Tag>
  );
}
