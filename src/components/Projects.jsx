import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { projects } from '../data/portfolioData';
import { FiGithub, FiExternalLink, FiStar } from 'react-icons/fi';

const categories = ['All', 'Full-Stack', 'Blockchain', 'AI / EdTech', 'Web App', 'E-Commerce'];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
};

function ProjectCard({ project, index }) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      custom={index}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      whileHover={{ y: -8 }}
      className="gradient-border glass-card overflow-hidden group"
    >
      {/* Top gradient bar */}
      <div className={`h-1.5 bg-gradient-to-r ${project.gradient}`} />

      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl bg-gradient-to-br ${project.gradient} opacity-90`}
            >
              {project.icon}
            </div>
            <div>
              <h3 className="text-white font-bold text-lg leading-tight">{project.title}</h3>
              <span
                className="text-xs px-2 py-0.5 rounded-full font-medium"
                style={{ background: 'rgba(124,58,237,0.15)', color: '#c4b5fd' }}
              >
                {project.category}
              </span>
            </div>
          </div>
          {project.stars && (
            <div className="flex items-center gap-1 text-yellow-400 text-sm">
              <FiStar size={14} className="fill-yellow-400" />
              <span>{project.stars}</span>
            </div>
          )}
        </div>

        {/* Description */}
        <p className="text-slate-400 text-sm leading-relaxed mb-5 line-clamp-3">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-xs px-2.5 py-1 rounded-full font-mono"
              style={{ background: 'rgba(15, 30, 53, 0.8)', color: '#94a3b8', border: '1px solid rgba(51,65,85,0.5)' }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-3 pt-4 border-t" style={{ borderColor: 'rgba(124, 58, 237, 0.1)' }}>
          <motion.a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-purple-400 transition-colors px-4 py-2 rounded-lg hover:bg-purple-500/10"
          >
            <FiGithub size={15} /> Code
          </motion.a>
          {project.live && (
            <motion.a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg transition-all"
              style={{ background: 'rgba(124,58,237,0.15)', color: '#c4b5fd', border: '1px solid rgba(168,85,247,0.2)' }}
            >
              <FiExternalLink size={15} /> Live Demo
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true });

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  return (
    <section id="projects" className="relative py-28 px-6" ref={ref}>
      {/* Background decoration */}
      <div className="absolute inset-0 grid-bg opacity-30" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <span className="text-purple-400 font-mono text-sm font-medium tracking-widest uppercase mb-4 block">
            What I&apos;ve built
          </span>
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-subtitle">
            A showcase of projects built with passion — from blockchain systems to AI-powered platforms.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          variants={fadeUp}
          custom={1}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                activeFilter === cat ? 'text-white' : 'text-slate-400 hover:text-white'
              }`}
              style={{
                background: activeFilter === cat
                  ? 'linear-gradient(135deg, #7C3AED, #9333EA)'
                  : 'rgba(124, 58, 237, 0.06)',
                border: `1px solid ${activeFilter === cat ? 'transparent' : 'rgba(124, 58, 237, 0.15)'}`,
              }}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* GitHub CTA */}
        <motion.div
          variants={fadeUp}
          custom={4}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mt-14"
        >
          <p className="text-slate-400 mb-5">
            Want to see more? Check out all my repositories on GitHub.
          </p>
          <motion.a
            href="https://github.com/taharukaiya"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-secondary inline-flex"
          >
            <FiGithub /> View All on GitHub
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
