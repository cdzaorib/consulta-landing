import { motion, useScroll, useTransform } from 'framer-motion';
import './Header.css';

const NAV_LINKS = [
  { href: '#dia', label: 'Como funciona' },
  { href: '#numeros', label: 'Números' },
  { href: '#depoimentos', label: 'Depoimentos' },
  { href: '#planos', label: 'Planos' },
];

export default function Header() {
  const { scrollY } = useScroll();
  const background = useTransform(
    scrollY,
    [0, 80],
    ['rgba(243, 246, 243, 0.88)', 'rgba(243, 246, 243, 0.98)']
  );
  const boxShadow = useTransform(
    scrollY,
    [0, 80],
    ['0 0 0 rgba(22, 36, 31, 0)', '0 1px 12px rgba(22, 36, 31, 0.06)']
  );

  return (
    <motion.header style={{ background, boxShadow }}>
      <nav className="wrap nav">
        <div className="logo">
          <span className="dot" />Consulta
        </div>
        <div className="nav-links">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href}>{link.label}</a>
          ))}
        </div>
        <div className="nav-cta">
          <a href="#" className="btn btn-ghost">Entrar</a>
          <a href="#planos" className="btn btn-primary">Teste grátis</a>
        </div>
      </nav>
    </motion.header>
  );
}
