import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { education } from '../data/portfolioData';
import { FiCalendar, FiMapPin, FiAward } from 'react-icons/fi';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: 'easeOut' },
  }),
};

function EducationCard({ item, index }) {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true });

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      custom={index}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className="relative flex gap-5 sm:gap-7"
    >
      {/* ── Left column: icon + connector line ── */}
      <div className="flex flex-col items-center flex-shrink-0">
        {/* Glowing icon bubble */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl z-10 flex-shrink-0"
          style={{
            background: 'linear-gradient(135deg, #7C3AED 0%, #9333EA 100%)',
            boxShadow: '0 0 24px rgba(147, 51, 234, 0.45)',
          }}
        >
          {item.icon}
        </motion.div>

        {/* Connector line to next card (hidden on last item) */}
        {index < education.length - 1 && (
          <div
            className="flex-1 w-px mt-3"
            style={{
              background: 'linear-gradient(to bottom, rgba(124,58,237,0.5) 0%, rgba(124,58,237,0.05) 100%)',
              minHeight: '2rem',
            }}
          />
        )}
      </div>

      {/* ── Right column: card content ── */}
      <motion.div
        whileHover={{ y: -4, transition: { duration: 0.2 } }}
        className="flex-1 glass-card p-5 sm:p-7 mb-8 min-w-0"
      >
        {/* Top row: degree + year badge */}
        <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
          <div className="min-w-0">
            <h3 className="text-white font-bold text-base sm:text-lg leading-snug">
              {item.title}
            </h3>
            <p className="text-purple-400 font-semibold text-sm mt-0.5">
              {item.organization}
            </p>
          </div>

          {/* Year badge */}
          <span
            className="text-xs font-mono px-3 py-1.5 rounded-full flex-shrink-0 whitespace-nowrap"
            style={{
              background: 'rgba(124,58,237,0.12)',
              color: '#c4b5fd',
              border: '1px solid rgba(168,85,247,0.25)',
            }}
          >
            {item.duration}
          </span>
        </div>

        {/* Meta: location */}
        <div className="flex flex-wrap gap-4 text-xs text-slate-500 mb-4">
          <span className="flex items-center gap-1.5">
            <FiMapPin size={12} className="text-slate-600" />
            {item.location}
          </span>
          <span className="flex items-center gap-1.5">
            <FiCalendar size={12} className="text-slate-600" />
            {item.duration}
          </span>
        </div>

        {/* Description */}
        <p className="text-slate-400 text-sm leading-relaxed mb-4">
          {item.description}
        </p>

        {/* Highlights / achievements */}
        {item.highlights?.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {item.highlights.map((h) => (
              <span
                key={h}
                className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full"
                style={{
                  background: 'rgba(16,185,129,0.08)',
                  color: '#6ee7b7',
                  border: '1px solid rgba(16,185,129,0.2)',
                }}
              >
                <FiAward size={11} />
                {h}
              </span>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default function Education() {
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true });

  return (
    <section id="education" className="relative py-20 sm:py-28 px-4 sm:px-6 overflow-x-hidden">
      <div className="max-w-4xl mx-auto" ref={ref}>

        {/* ── Header ── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-14 sm:mb-20"
        >
          <span className="text-purple-400 font-mono text-xs sm:text-sm font-medium tracking-widest uppercase mb-4 block">
            Academic background
          </span>
          <h2 className="section-title">Education</h2>
          <p className="section-subtitle text-sm sm:text-base px-2">
            The academic foundation that shaped my engineering mindset.
          </p>
        </motion.div>

        {/* ── Timeline cards ── */}
        <div>
          {education.map((item, i) => (
            <EducationCard key={item.id} item={item} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}
