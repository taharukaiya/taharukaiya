import { motion } from 'framer-motion';
import { personalInfo } from '../data/portfolioData';
import { FiGithub, FiTwitter, FiLinkedin, FiHeart, FiArrowUp } from 'react-icons/fi';

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative pt-16 pb-8 px-6" style={{ borderTop: '1px solid rgba(124, 58, 237, 0.15)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <span className="font-black text-3xl tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-violet-400">
              RT.
            </span>
            <div>
              <p className="text-white font-bold">{personalInfo.name}</p>
              <p className="text-purple-400 text-sm">{personalInfo.title}</p>
            </div>
          </div>

          {/* Social */}
          <div className="flex gap-3">
            {[
              { icon: <FiGithub />, href: personalInfo.github },
              { icon: <FiLinkedin />, href: personalInfo.linkedin },
              { icon: <FiTwitter />, href: personalInfo.twitter },
            ].map(({ icon, href }, i) => (
              <motion.a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3, scale: 1.1 }}
                className="w-10 h-10 flex items-center justify-center rounded-xl text-slate-400 hover:text-purple-400 transition-colors"
                style={{ background: 'rgba(124, 58, 237, 0.08)', border: '1px solid rgba(124, 58, 237, 0.15)' }}
              >
                {icon}
              </motion.a>
            ))}
          </div>

          {/* Back to top */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -3, scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-purple-400 transition-colors px-4 py-2 rounded-xl"
            style={{ background: 'rgba(124, 58, 237, 0.08)', border: '1px solid rgba(124, 58, 237, 0.15)' }}
          >
            <FiArrowUp /> Back to top
          </motion.button>
        </div>

        {/* Divider */}
        <div className="h-px mb-6" style={{ background: 'rgba(124, 58, 237, 0.1)' }} />

        {/* Copyright */}
        <div className="text-center">
          <p className="text-slate-500 text-sm flex items-center justify-center gap-2">
            Designed & Built with{' '}
            <FiHeart className="text-purple-400 fill-purple-400" />{' '}
            by{' '}
            <span className="text-purple-400 font-medium">Rukaiya Taha</span>
            {' · '}
            {new Date().getFullYear()}
          </p>
          <p className="text-slate-600 text-xs mt-1">
            Built with React, Vite, Tailwind CSS & Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
}
