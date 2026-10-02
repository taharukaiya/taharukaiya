import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { personalInfo, skills } from '../data/portfolioData';
import { FiMapPin, FiMail, FiGithub, FiCode } from 'react-icons/fi';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: 'easeOut' },
  }),
};

export default function About() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  const traits = [
    { icon: '⚡', label: 'Fast Learner' },
    { icon: '🎯', label: 'Detail Oriented' },
    { icon: '🤝', label: 'Team Player' },
    { icon: '💡', label: 'Creative Thinker' },
    { icon: '🚀', label: 'Self Motivated' },
    { icon: '🔍', label: 'Problem Solver' },
  ];

  return (
    <section id="about" className="relative py-28 px-6">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-20"
        >
          <span className="text-purple-400 font-mono text-sm font-medium tracking-widest uppercase mb-4 block">
            Get to know me
          </span>
          <h2 className="section-title">About Me</h2>
          <p className="section-subtitle">
            A passionate engineer who turns ideas into elegant digital experiences.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left — Bio */}
          <div>
            <motion.div
              variants={fadeUp}
              custom={1}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="glass-card p-8 mb-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                     style={{ background: 'rgba(124, 58, 237, 0.2)' }}>
                  👋
                </div>
                <div>
                  <h3 className="text-white font-bold text-xl">{personalInfo.name}</h3>
                  <p className="text-purple-400 text-sm">{personalInfo.title}</p>
                </div>
              </div>

              <p className="text-slate-300 leading-relaxed mb-6">
                {personalInfo.bio}
              </p>

              <div className="flex flex-col gap-3">
                {[
                  { icon: <FiMapPin />, text: personalInfo.location, color: 'text-pink-400' },
                  { icon: <FiMail />, text: personalInfo.email, color: 'text-blue-400' },
                  { icon: <FiGithub />, text: 'github.com/taharukaiya', color: 'text-purple-400' },
                  { icon: <FiCode />, text: 'Open to new opportunities', color: 'text-emerald-400' },
                ].map(({ icon, text, color }, i) => (
                  <div key={i} className={`flex items-center gap-3 text-sm ${color}`}>
                    <span className="flex-shrink-0">{icon}</span>
                    <span className="text-slate-300">{text}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Traits */}
            <motion.div
              variants={fadeUp}
              custom={2}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
            >
              <h4 className="text-slate-400 text-sm font-mono mb-4">// Who I Am</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {traits.map((t, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    className="glass-card px-4 py-3 flex items-center gap-3 cursor-default"
                  >
                    <span className="text-xl">{t.icon}</span>
                    <span className="text-slate-300 text-sm font-medium">{t.label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right — Tech Stack visual */}
          <div>
            <motion.div
              variants={fadeUp}
              custom={1}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
            >
              <h4 className="text-slate-400 text-sm font-mono mb-4">// Technologies I Work With</h4>
              <div className="glass-card p-8">
                {/* Code window decoration */}
                <div className="flex gap-1.5 mb-6">
                  <div className="w-3 h-3 rounded-full bg-red-500/70" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/70" />
                </div>

                <pre className="font-mono text-sm leading-loose">
                  <span className="text-purple-400">const</span>
                  <span className="text-white"> rukaiya </span>
                  <span className="text-purple-400">= </span>
                  <span className="text-yellow-300">{'{'}</span>
                  {'\n'}
                  {'  '}
                  <span className="text-blue-300">frontend</span>
                  <span className="text-white">: </span>
                  <span className="text-emerald-300">[&apos;React&apos;, &apos;JavaScript&apos;, &apos;Tailwind&apos;]</span>
                  <span className="text-white">,</span>
                  {'\n'}
                  {'  '}
                  <span className="text-blue-300">backend</span>
                  <span className="text-white">: </span>
                  <span className="text-emerald-300">[&apos;Node.js&apos;, &apos;Express&apos;, &apos;MongoDB&apos;]</span>
                  <span className="text-white">,</span>
                  {'\n'}
                  {'  '}
                  <span className="text-blue-300">special</span>
                  <span className="text-white">: </span>
                  <span className="text-emerald-300">[&apos;Blockchain&apos;, &apos;Azure AI&apos;]</span>
                  <span className="text-white">,</span>
                  {'\n'}
                  {'  '}
                  <span className="text-blue-300">passion</span>
                  <span className="text-white">: </span>
                  <span className="text-pink-300">&apos;Building things that matter&apos;</span>
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

                <div className="mt-8 flex flex-wrap gap-2">
                  {skills.other.map((s) => (
                    <span key={s} className="skill-tag">{s}</span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Fun facts */}
            <motion.div
              variants={fadeUp}
              custom={2}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="mt-6 grid grid-cols-2 gap-4"
            >
              {[
                { num: '🌙', label: 'Night Owl Coder' },
                { num: '☕', label: 'Coffee-Powered' },
                { num: '🎵', label: 'Music While Coding' },
                { num: '📚', label: 'Always Learning' },
              ].map((item, i) => (
                <div key={i} className="glass-card p-4 flex items-center gap-3 text-sm">
                  <span className="text-2xl">{item.num}</span>
                  <span className="text-slate-300">{item.label}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
