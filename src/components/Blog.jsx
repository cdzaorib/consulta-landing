import { motion } from 'framer-motion';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion.js';
import { VIEWPORT_SOFT, cardUp, fadeUp, reveal, stagger } from '../lib/motion.js';
import { BLOG } from '../content.js';
import './Blog.css';

export default function Blog() {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <section id="conteudo-blog" className="band-alt">
      <div className="wrap">
        <motion.div className="blog-head" {...reveal(reduceMotion, fadeUp)}>
          <div>
            <p className="eyebrow">{BLOG.eyebrow}</p>
            <h2>{BLOG.title}</h2>
            <p className="blog-lead">{BLOG.lead}</p>
          </div>

          <a href={BLOG.allHref} className="btn btn-ghost blog-all">
            {BLOG.allLabel}
            <span className="arrow" aria-hidden="true">
              →
            </span>
          </a>
        </motion.div>

        <motion.ul
          className="blog-grid"
          variants={stagger()}
          initial={reduceMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={VIEWPORT_SOFT}
        >
          {BLOG.posts.map((post) => (
            <motion.li
              key={post.title}
              variants={cardUp}
            >
              <a className="post" href={post.href}>
                {/* Sem as fotos do blog, a "capa" é um degradê da paleta. */}
                <span className="post-cover" aria-hidden="true">
                  <span className="post-tag">{post.tag}</span>
                </span>

                <span className="post-body">
                  <span className="post-title">{post.title}</span>
                  <span className="post-excerpt">{post.excerpt}</span>
                  <span className="post-more">
                    Leia mais
                    <span className="arrow" aria-hidden="true">
                      →
                    </span>
                  </span>
                </span>
              </a>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
