import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { navLinks } from '../data/portfolioData';
import { FiMenu, FiX } from 'react-icons/fi';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('#home');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = navLinks.map(l => l.href.slice(1));
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive('#' + id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (href) => {
    setActive(href);
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'py-3 backdrop-blur-xl border-b border-purple-500/10'
          : 'py-5'
      }`}
      style={{
        background: scrolled
          ? 'rgba(2, 8, 24, 0.85)'
          : 'transparent',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <motion.a
          href="#home"
          onClick={(e) => { e.preventDefault(); handleNav('#home'); }}
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-3 group"
        >
          <span className="font-black text-3xl tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-violet-400">
            RT.
          </span>
          <span className="text-white font-bold text-lg hidden sm:block">
            Rukaiya<span className="text-purple-400"> Taha</span>
          </span>
        </motion.a>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <motion.a
              key={link.href}
              href={link.href}
              onClick={(e) => { e.preventDefault(); handleNav(link.href); }}
              whileHover={{ y: -1 }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 relative ${
                active === link.href
                  ? 'text-purple-300'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {link.label}
              {active === link.href && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute inset-0 rounded-lg"
                  style={{ background: 'rgba(124, 58, 237, 0.15)', border: '1px solid rgba(168, 85, 247, 0.3)' }}
                  transition={{ type: 'spring', duration: 0.5 }}
                />
              )}
            </motion.a>
          ))}
        </div>

        {/* CTA + Hamburger */}
        <div className="flex items-center gap-3">
          <motion.a
            href="mailto:taharukaiya@gmail.com"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden md:flex btn-primary text-sm py-2 px-5"
          >
            Hire Me ✨
          </motion.a>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden text-slate-400 hover:text-white p-2"
          >
            {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden overflow-hidden"
            style={{ background: 'rgba(2, 8, 24, 0.98)', borderTop: '1px solid rgba(124, 58, 237, 0.2)' }}
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNav(link.href); }}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    active === link.href
                      ? 'text-purple-300 bg-purple-500/10'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <a href="mailto:taharukaiya@gmail.com" className="btn-primary text-sm py-2.5 mt-2 justify-center">
                Hire Me ✨
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
