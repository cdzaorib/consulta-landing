import './Footer.css';

const FOOTER_COLUMNS = [
  {
    title: 'Soluções',
    links: ['Agenda médica', 'Prontuário eletrônico', 'Faturamento', 'Controle financeiro'],
  },
  {
    title: 'Empresa',
    links: ['Quem somos', 'Casos de sucesso', 'Blog', 'Contato'],
  },
  {
    title: 'Suporte',
    links: ['Central de ajuda', 'Área do cliente', 'Termos de uso'],
  },
];

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-grid">
          <div className="logo"><span className="dot" />Conclínica</div>
          <div className="foot-cols">
            {FOOTER_COLUMNS.map((col) => (
              <div className="foot-col" key={col.title}>
                <h4>{col.title}</h4>
                {col.links.map((link) => (
                  <a href="#" key={link}>{link}</a>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="foot-bottom">
          <span>© 2026 Conclínica. Todos os direitos reservados.</span>
        </div>
      </div>
    </footer>
  );
}
