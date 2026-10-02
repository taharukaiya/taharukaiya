import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { experience, education } from '../data/portfolioData';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.15 },
  }),
};

function TimelineItem({ item, index, isLeft }) {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      custom={index}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className={`relative flex ${isLeft ? 'md:flex-row-reverse' : 'md:flex-row'} flex-col md:items-start gap-8 mb-12`}
    >
      {/* Content */}
      <div className={`flex-1 ${isLeft ? 'md:text-right md:pr-12' : 'md:pl-12'} pl-12 md:pl-0`}>
        <motion.div
          whileHover={{ y: -4 }}
          className="glass-card p-6 inline-block w-full"
        >
          <div className={`flex items-center gap-3 mb-3 ${isLeft ? 'md:flex-row-reverse' : ''}`}>
            <span className="text-2xl">{item.icon}</span>
            <div>
              <h3 className="text-white font-bold text-lg">{item.title}</h3>
              <p className="text-purple-400 font-medium text-sm">{item.organization}</p>
            </div>
          </div>

          <div className={`flex items-center gap-3 mb-3 text-sm ${isLeft ? 'md:flex-row-reverse' : ''}`}>
            <span className="text-slate-500">📅 {item.duration}</span>
            <span className="text-slate-500">📍 {item.location}</span>
          </div>

          <p className="text-slate-400 text-sm leading-relaxed mb-4">{item.description}</p>

          <div className={`flex flex-wrap gap-2 ${isLeft ? 'md:justify-end' : ''}`}>
            {item.highlights?.map((h) => (
              <span
                key={h}
                className="text-xs px-3 py-1 rounded-full"
                style={{ background: 'rgba(124, 58, 237, 0.12)', color: '#c4b5fd', border: '1px solid rgba(168, 85, 247, 0.2)' }}
              >
                {h}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Center dot */}
      <div className="absolute left-0 md:left-1/2 top-6 md:-translate-x-1/2 flex items-center justify-center">
        <div className="w-10 h-10 rounded-full flex items-center justify-center z-10 text-lg"
             style={{ background: 'linear-gradient(135deg, #7C3AED, #9333EA)', boxShadow: '0 0 20px rgba(147, 51, 234, 0.5)' }}>
          {item.icon}
        </div>
      </div>

      {/* Spacer for opposite side */}
      <div className="flex-1 hidden md:block" />
    </motion.div>
  );
}

export default function Experience() {
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true });

  const allItems = [
    ...experience.map(e => ({ ...e, side: 'right' })),
    ...education.map(e => ({ ...e, side: 'left' })),
  ];

  return (
    <section id="experience" className="relative py-28 px-6" ref={ref}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-20"
        >
          <span className="text-purple-400 font-mono text-sm font-medium tracking-widest uppercase mb-4 block">
            My journey
          </span>
          <h2 className="section-title">Experience & Education</h2>
          <p className="section-subtitle">
            The path that shaped me as an engineer.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px" style={{ background: 'linear-gradient(to bottom, transparent, #7C3AED 10%, #9333EA 90%, transparent)' }} />

          {allItems.map((item, i) => (
            <TimelineItem
              key={item.id + item.type}
              item={item}
              index={i}
              isLeft={item.side === 'left'}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
