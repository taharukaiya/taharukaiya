import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { personalInfo } from '../data/portfolioData';
import { FiMapPin, FiMail, FiGithub, FiCode } from 'react-icons/fi';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: 'easeOut' },
  }),
};

const traits = [
  { icon: '⚡', label: 'Fast Learner' },
  { icon: '🎯', label: 'Detail Oriented' },
  { icon: '🤝', label: 'Team Player' },
  { icon: '💡', label: 'Creative Thinker' },
  { icon: '🚀', label: 'Self Motivated' },
  { icon: '🔍', label: 'Problem Solver' },
];

const funFacts = [
  { icon: '🌙', label: 'Night Owl Coder' },
  { icon: '☕', label: 'Coffee-Powered' },
  { icon: '🎵', label: 'Music While Coding' },
  { icon: '📚', label: 'Always Learning' },
];

const contactInfo = [
  { icon: <FiMapPin size={15} />, text: personalInfo.location, color: 'text-pink-400' },
  { icon: <FiMail size={15} />, text: personalInfo.email, color: 'text-blue-400' },
  { icon: <FiGithub size={15} />, text: 'github.com/taharukaiya', color: 'text-purple-400' },
  { icon: <FiCode size={15} />, text: 'Open to new opportunities', color: 'text-emerald-400' },
];

export default function About() {
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true });

  return (
    <section id="about" className="relative py-20 sm:py-28 px-4 sm:px-6 overflow-x-hidden">
      <div className="max-w-7xl mx-auto" ref={ref}>

        {/* ── Header ─────────────────────────────────── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-14 sm:mb-20"
        >
          <span className="text-purple-400 font-mono text-xs sm:text-sm font-medium tracking-widest uppercase mb-4 block">
            Get to know me
          </span>
          <h2 className="section-title">About Me</h2>
          <p className="section-subtitle text-sm sm:text-base px-2">
            A passionate engineer who turns ideas into elegant digital experiences.
          </p>
        </motion.div>

        {/* ── Flat 4-cell grid: row 1 = bio + code, row 2 = traits + funfacts ── */}
        {/* Using a flat grid (not nested flex columns) so CSS Grid aligns       */}
        {/* items in the same row automatically — no more vertical misalignment.  */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-start">

          {/* ── [Row 1, Col 1] Bio card ───────────────── */}
          <motion.div
            variants={fadeUp}
            custom={1}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="glass-card p-5 sm:p-7 min-w-0"
          >
            {/* Avatar row */}
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                style={{ background: 'rgba(124, 58, 237, 0.2)' }}
              >
                👋
              </div>
              <div className="min-w-0">
                <h3 className="text-white font-bold text-lg leading-tight truncate">
                  {personalInfo.name}
                </h3>
                <p className="text-purple-400 text-sm">{personalInfo.title}</p>
              </div>
            </div>

            {/* Bio text */}
            <p className="text-slate-300 text-sm leading-relaxed mb-5 break-words">
              {personalInfo.bio}
            </p>

            {/* Contact info */}
            <div className="flex flex-col gap-2.5">
              {contactInfo.map(({ icon, text, color }, i) => (
                <div key={i} className="flex items-start gap-2.5 min-w-0">
                  <span className={`flex-shrink-0 mt-0.5 ${color}`}>{icon}</span>
                  <span className="text-slate-300 text-sm break-all min-w-0">{text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── [Row 1, Col 2] Code snippet ───────────── */}
          <motion.div
            variants={fadeUp}
            custom={2}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="min-w-0"
          >
            <h4 className="text-slate-400 text-sm font-mono mb-3">// Technologies I Work With</h4>
            <div className="glass-card p-5 sm:p-7 min-w-0 overflow-hidden">
              {/* Window dots */}
              <div className="flex gap-1.5 mb-5">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/70" />
              </div>

              <div className="overflow-x-auto">
                <pre className="font-mono text-xs sm:text-sm leading-loose whitespace-pre">
                  <span className="text-purple-400">const</span>
                  <span className="text-white"> rukaiya </span>
                  <span className="text-purple-400">= </span>
                  <span className="text-yellow-300">{'{'}</span>
                  {'\n'}
                  {'  '}
                  <span className="text-blue-300">frontend</span>
                  <span className="text-white">: </span>
                  <span className="text-emerald-300">['React', 'Next.js', 'Tailwind']</span>
                  <span className="text-white">,</span>
                  {'\n'}
                  {'  '}
                  <span className="text-blue-300">backend</span>
                  <span className="text-white">: </span>
                  <span className="text-emerald-300">['Node.js', 'Django', 'PostgreSQL']</span>
                  <span className="text-white">,</span>
                  {'\n'}
                  {'  '}
                  <span className="text-blue-300">aiml</span>
                  <span className="text-white">: </span>
                  <span className="text-emerald-300">['ML', 'Deep Learning', 'AI Integration']</span>
                  <span className="text-white">,</span>
                  {'\n'}
                  {'  '}
                  <span className="text-blue-300">research</span>
                  <span className="text-white">: </span>
                  <span className="text-emerald-300">['IEEE', 'Wiley', '3 Papers']</span>
                  <span className="text-white">,</span>
                  {'\n'}
                  {'  '}
                  <span className="text-blue-300">hireable</span>
                  <span className="text-white">: </span>
                  <span className="text-orange-300">true</span>
                  {'\n'}
                  <span className="text-yellow-300">{'}'}</span>
                  <span className="text-white">;</span>
                </pre>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {[
                  'ASP.NET Core', 'MySQL', 'Better Auth',
                  'Blockchain', 'Solidity', 'AI/ML Integration',
                  'Agile / Scrum',
                ].map((s) => (
                  <span key={s} className="skill-tag text-xs">{s}</span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── [Row 2, Col 1] Who I Am traits ───────── */}
          <motion.div
            variants={fadeUp}
            custom={3}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="min-w-0"
          >
            <h4 className="text-slate-400 text-sm font-mono mb-3">// Who I Am</h4>
            <div className="grid grid-cols-2 gap-2.5">
              {traits.map((t, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.03 }}
                  className="glass-card p-3 sm:p-4 flex items-center gap-2.5 cursor-default min-w-0 min-h-[56px]"
                >
                  <span className="text-xl flex-shrink-0">{t.icon}</span>
                  <span className="text-slate-300 text-xs sm:text-sm font-medium leading-tight">
                    {t.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── [Row 2, Col 2] Fun facts ─────────────── */}
          <motion.div
            variants={fadeUp}
            custom={4}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="min-w-0"
          >
            <h4 className="text-slate-400 text-sm font-mono mb-3">// Fun Facts</h4>
            <div className="grid grid-cols-2 gap-2.5">
              {funFacts.map((item, i) => (
                <div
                  key={i}
                  className="glass-card p-3 sm:p-4 flex items-center gap-2.5 min-w-0 min-h-[56px]"
                >
                  <span className="text-xl flex-shrink-0">{item.icon}</span>
                  <span className="text-slate-300 text-xs sm:text-sm leading-tight">{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
