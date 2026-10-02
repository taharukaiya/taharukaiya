import { motion } from 'framer-motion';
import { personalInfo } from '../data/portfolioData';
import { FiGithub, FiLinkedin, FiArrowUp } from 'react-icons/fi';
import { FaFacebookF } from 'react-icons/fa';

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative pt-16 pb-8 px-6" style={{ borderTop: '1px solid rgba(124, 58, 237, 0.15)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div>
              <p className="font-black text-xl tracking-tight">
                <span className="text-white">Rukaiya </span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-violet-400">Taha</span>
              </p>
              <p className="text-purple-400 text-sm">{personalInfo.title}</p>
            </div>
          </div>

          {/* Social */}
          <div className="flex gap-3">
            {[
              { icon: <FiGithub />, href: personalInfo.github },
              { icon: <FiLinkedin />, href: personalInfo.linkedin },
              { icon: <FaFacebookF size={15} />, href: personalInfo.facebook },
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
        <div className="flex flex-col sm:flex-row items-center justify-between gap-1">
          <p className="text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} <span className="text-slate-400 font-medium">Rukaiya Taha</span>. All rights reserved.
          </p>
          <p className="text-slate-600 text-xs">
            Designed &amp; Developed by Rukaiya Taha
          </p>
        </div>
      </div>
    </footer>
  );
}
