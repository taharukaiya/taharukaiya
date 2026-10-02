import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { skills } from '../data/portfolioData';

const categories = ['All', 'Frontend', 'Backend', 'Tools'];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.08 },
  }),
};

function SkillBar({ name, level, icon, index }) {
  const { ref, inView } = useInView({ threshold: 0.5, triggerOnce: true });
  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      custom={index}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      whileHover={{ scale: 1.02 }}
      className="glass-card p-5"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className="text-xl">{icon}</span>
          <span className="text-slate-200 font-medium text-sm">{name}</span>
        </div>
        <span className="text-purple-400 font-bold text-sm font-mono">{level}%</span>
      </div>
      <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(30, 41, 59, 0.8)' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: inView ? `${level}%` : 0 }}
          transition={{ duration: 1.2, delay: index * 0.1, ease: 'easeOut' }}
          className="h-full rounded-full skill-bar"
          style={{ background: 'linear-gradient(90deg, #7C3AED, #9333EA, #A855F7)' }}
        />
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const [active, setActive] = useState('All');
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true });

  const getSkills = () => {
    if (active === 'Frontend') return skills.frontend;
    if (active === 'Backend') return skills.backend;
    if (active === 'Tools') return skills.tools;
    return [...skills.frontend, ...skills.backend, ...skills.tools];
  };

  return (
    <section id="skills" className="relative py-28 px-6" ref={ref}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <span className="text-purple-400 font-mono text-sm font-medium tracking-widest uppercase mb-4 block">
            What I work with
          </span>
          <h2 className="section-title">Skills & Technologies</h2>
          <p className="section-subtitle">
            A collection of technologies I&apos;ve worked with, constantly expanding my toolkit.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          variants={fadeUp}
          custom={1}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setActive(cat)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                active === cat
                  ? 'text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
              style={{
                background: active === cat
                  ? 'linear-gradient(135deg, #7C3AED, #9333EA)'
                  : 'rgba(124, 58, 237, 0.08)',
                border: `1px solid ${active === cat ? 'transparent' : 'rgba(124, 58, 237, 0.2)'}`,
                boxShadow: active === cat ? '0 0 20px rgba(147, 51, 234, 0.4)' : 'none',
              }}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16"
          >
            {getSkills().map((skill, i) => (
              <SkillBar key={skill.name} {...skill} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Additional tech tags */}
        <motion.div
          variants={fadeUp}
          custom={3}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center"
        >
          <h4 className="text-slate-400 font-mono text-sm mb-6">// Other technologies I know</h4>
          <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
            {[
              'Blockchain', 'Solidity', 'Web3.js', 'Smart Contracts', 'Azure AI',
              'Azure Document Intelligence', 'JWT', 'REST APIs', 'GraphQL',
              'Git', 'GitHub Actions', 'Vercel', 'Netlify', 'Agile/Scrum',
              'Figma', 'Postman', 'Chrome DevTools', 'Linux',
            ].map((tag, i) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.1 }}
                className="skill-tag cursor-default"
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
