// ============================================================
// EXPERIENCE SECTION — Currently hidden (no entries yet)
// ============================================================
// To re-enable this section:
//   1. Add your experience entries to src/data/portfolioData.js
//      inside the `experience` array (see the structure below).
//   2. Uncomment this entire file's export.
//   3. Uncomment the <Experience /> line in src/App.jsx.
//   4. Add { label: 'Experience', href: '#experience' } back
//      to the navLinks array in src/data/portfolioData.js.
//
// Experience entry structure (for reference):
// {
//   id: 1,
//   title: "Job Title",
//   organization: "Company / Organization Name",
//   duration: "Month Year – Month Year",
//   location: "City, Country",
//   description: "What you did and achieved in this role.",
//   highlights: ["Key achievement 1", "Key achievement 2"],
//   icon: "💼",
// }
// ============================================================

/*
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { experience } from '../data/portfolioData';
import { FiBriefcase, FiCalendar, FiMapPin } from 'react-icons/fi';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.15 },
  }),
};

function ExperienceCard({ item, index }) {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      custom={index}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className="relative flex gap-6 pb-12 last:pb-0"
    >
      // Vertical line
      <div className="relative flex flex-col items-center">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0 z-10"
          style={{ background: 'linear-gradient(135deg, #7C3AED, #9333EA)', boxShadow: '0 0 20px rgba(147, 51, 234, 0.4)' }}
        >
          {item.icon}
        </div>
        <div
          className="flex-1 w-px mt-3"
          style={{ background: 'linear-gradient(to bottom, rgba(124,58,237,0.5), transparent)' }}
        />
      </div>

      // Card
      <motion.div whileHover={{ y: -3 }} className="glass-card p-6 flex-1 mb-0">
        <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
          <div>
            <h3 className="text-white font-bold text-lg">{item.title}</h3>
            <p className="text-purple-400 font-medium text-sm">{item.organization}</p>
          </div>
          <span
            className="text-xs px-3 py-1 rounded-full flex-shrink-0"
            style={{ background: 'rgba(124,58,237,0.12)', color: '#c4b5fd', border: '1px solid rgba(168,85,247,0.2)' }}
          >
            <FiBriefcase className="inline mr-1.5" size={11} />
            {item.role || item.title}
          </span>
        </div>

        <div className="flex flex-wrap gap-4 text-xs text-slate-500 mb-4">
          <span className="flex items-center gap-1.5"><FiCalendar size={12} /> {item.duration}</span>
          {item.location && <span className="flex items-center gap-1.5"><FiMapPin size={12} /> {item.location}</span>}
        </div>

        <p className="text-slate-400 text-sm leading-relaxed mb-4">{item.description}</p>

        {item.highlights?.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {item.highlights.map((h) => (
              <span
                key={h}
                className="text-xs px-3 py-1 rounded-full"
                style={{ background: 'rgba(124,58,237,0.08)', color: '#a78bfa', border: '1px solid rgba(168,85,247,0.15)' }}
              >
                {h}
              </span>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default function Experience() {
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true });

  return (
    <section id="experience" className="relative py-20 sm:py-28 px-4 sm:px-6 overflow-x-hidden">
      <div className="max-w-4xl mx-auto" ref={ref}>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-14 sm:mb-20"
        >
          <span className="text-purple-400 font-mono text-xs sm:text-sm font-medium tracking-widest uppercase mb-4 block">
            Professional
          </span>
          <h2 className="section-title">Work Experience</h2>
          <p className="section-subtitle px-2">
            Roles and responsibilities that shaped my professional growth.
          </p>
        </motion.div>

        <div>
          {experience.map((item, i) => (
            <ExperienceCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
*/

// Placeholder export so the file can be imported without errors
// (remove this once you uncomment the component above)
export default function Experience() {
  return null;
}
