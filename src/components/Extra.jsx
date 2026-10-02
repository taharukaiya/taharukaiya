import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { extracurricular, publications } from '../data/portfolioData';
import { FiExternalLink } from 'react-icons/fi';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.12 },
  }),
};

export default function Extra() {
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true });

  return (
    <section id="publications" className="relative py-28 px-6" ref={ref}>
      <div className="max-w-7xl mx-auto">
        {/* Extracurricular */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <span className="text-purple-400 font-mono text-sm font-medium tracking-widest uppercase mb-4 block">
            Beyond the code
          </span>
          <h2 className="section-title">Extracurricular & Volunteer</h2>
          <p className="section-subtitle">
            Community building, mentoring, and giving back through technology.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {extracurricular.map((item, i) => (
            <motion.div
              key={item.id}
              variants={fadeUp}
              custom={i + 1}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              whileHover={{ y: -6 }}
              className="glass-card p-6"
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4"
                   style={{ background: 'rgba(124, 58, 237, 0.15)' }}>
                {item.icon}
              </div>
              <h3 className="text-white font-bold text-lg mb-1">{item.title}</h3>
              <p className="text-purple-400 text-sm font-medium mb-1">{item.organization}</p>
              <p className="text-slate-500 text-xs mb-3">{item.role} · {item.duration}</p>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">{item.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {item.activities.map((a) => (
                  <span
                    key={a}
                    className="text-xs px-2.5 py-1 rounded-full"
                    style={{ background: 'rgba(15, 30, 53, 0.8)', color: '#94a3b8', border: '1px solid rgba(51,65,85,0.5)' }}
                  >
                    {a}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Publications */}
        <motion.div
          variants={fadeUp}
          custom={4}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <span className="text-purple-400 font-mono text-sm font-medium tracking-widest uppercase mb-4 block">
            Research
          </span>
          <h2 className="section-title">Publications</h2>
          <p className="section-subtitle">
            Contributing to the academic and research community.
          </p>
        </motion.div>

        <div className="space-y-6">
          {publications.map((pub, i) => (
            <motion.div
              key={pub.id}
              variants={fadeUp}
              custom={i + 5}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              whileHover={{ y: -3 }}
              className="glass-card p-7 group"
            >
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                     style={{ background: 'rgba(124, 58, 237, 0.15)' }}>
                  {pub.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h3 className="text-white font-bold text-lg leading-tight group-hover:text-purple-300 transition-colors">
                      {pub.title}
                    </h3>
                    {pub.link && pub.link !== '#' && (
                      <a
                        href={pub.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-400 hover:text-purple-300 flex-shrink-0"
                      >
                        <FiExternalLink size={18} />
                      </a>
                    )}
                  </div>
                  <p className="text-purple-400 text-sm font-medium mb-1">
                    📖 {pub.conference} · {pub.year}
                  </p>
                  <p className="text-slate-500 text-sm mb-3">
                    Authors: {pub.authors.join(', ')}
                  </p>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4">{pub.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {pub.tags.map((tag) => (
                      <span
                        key={tag}
                        className="skill-tag text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
