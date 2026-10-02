import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { achievements } from '../data/portfolioData';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
};

function AchievementCard({ item, index }) {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      custom={index}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      whileHover={{ y: -6, scale: 1.02 }}
      className="gradient-border glass-card p-6 relative overflow-hidden"
    >
      {/* Background gradient */}
      <div
        className={`absolute inset-0 opacity-5 bg-gradient-to-br ${item.color}`}
      />

      <div className="relative z-10">
        <div
          className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-5 bg-gradient-to-br ${item.color} shadow-lg`}
          style={{ boxShadow: '0 8px 24px rgba(0,0,0,0.3)' }}
        >
          {item.icon}
        </div>

        <div className="flex items-start justify-between mb-2">
          <h3 className="text-white font-bold text-lg leading-tight flex-1 pr-3">{item.title}</h3>
          <span
            className="text-xs px-2.5 py-1 rounded-full flex-shrink-0 font-mono font-bold"
            style={{ background: 'rgba(124, 58, 237, 0.15)', color: '#a78bfa' }}
          >
            {item.year}
          </span>
        </div>

        <p className="text-purple-400 text-sm font-medium mb-3">{item.organization}</p>
        <p className="text-slate-400 text-sm leading-relaxed">{item.description}</p>
      </div>
    </motion.div>
  );
}

export default function Achievements() {
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true });

  return (
    <section id="achievements" className="relative py-28 px-6" ref={ref}>
      <div className="absolute inset-0 grid-bg opacity-20" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <span className="text-purple-400 font-mono text-sm font-medium tracking-widest uppercase mb-4 block">
            Recognition
          </span>
          <h2 className="section-title">Achievements & Certifications</h2>
          <p className="section-subtitle">
            Milestones and recognitions earned along the journey.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((item, i) => (
            <AchievementCard key={item.id} item={item} index={i} />
          ))}
        </div>

        {/* Certifications note */}
        <motion.div
          variants={fadeUp}
          custom={4}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mt-12 glass-card p-6 text-center"
        >
          <p className="text-slate-400 text-sm">
            🎓 Continuously learning through platforms like{' '}
            <span className="text-purple-400">Microsoft Learn</span>,{' '}
            <span className="text-purple-400">Coursera</span>, and{' '}
            <span className="text-purple-400">freeCodeCamp</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
