import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { navLinks } from '../data/portfolioData';
import { FiMenu, FiX } from 'react-icons/fi';
import { personalInfo } from '../data/portfolioData';

// Smooth scroll utility — works reliably on all browsers
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const offset = 80; // navbar height
  const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
  window.scrollTo({ top, behavior: 'smooth' });
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('#home');
  const [menuOpen, setMenuOpen] = useState(false);
  const indicatorRef = useRef({});

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Detect active section
      const ids = navLinks.map(l => l.href.slice(1));
      let currentActive = '#home';
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            currentActive = '#' + id;
          }
        }
      }
      setActive(currentActive);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const id = href.slice(1);
    setActive(href);
    // Close menu first, then scroll after a small delay so the
    // menu collapse animation doesn't fight the scroll
    if (menuOpen) {
      setMenuOpen(false);
      setTimeout(() => scrollToSection(id), 150);
    } else {
      scrollToSection(id);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || menuOpen
          ? 'backdrop-blur-xl border-b border-purple-500/10'
          : ''
      }`}
      style={{
        background: scrolled || menuOpen ? 'rgba(2, 8, 24, 0.92)' : 'transparent',
      }}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 flex items-center justify-between h-16 md:h-20">
        {/* ── Logo ─────────────────────────────────────── */}
        <motion.a
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          whileHover={{ scale: 1.04 }}
          className="flex items-center gap-2.5 flex-shrink-0"
        >
          <span className="font-black text-2xl sm:text-3xl tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-violet-400">
            RT.
          </span>
          <span className="text-white font-bold text-base hidden sm:block">
            Rukaiya<span className="text-purple-400"> Taha</span>
          </span>
        </motion.a>

        {/* ── Desktop Nav ───────────────────────────────── */}
        <div className="hidden lg:flex items-center gap-0.5">
          {navLinks.map((link) => {
            const isActive = active === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                ref={(el) => (indicatorRef.current[link.href] = el)}
                className={`relative px-3 xl:px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  isActive
                    ? 'text-purple-300'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {/* Background pill — rendered via CSS, not layoutId (avoids animation bug) */}
                {isActive && (
                  <span
                    className="absolute inset-0 rounded-lg pointer-events-none"
                    style={{
                      background: 'rgba(124, 58, 237, 0.15)',
                      border: '1px solid rgba(168, 85, 247, 0.3)',
                    }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </a>
            );
          })}
        </div>

        {/* ── Right CTA + Hamburger ────────────────────── */}
        <div className="flex items-center gap-2 sm:gap-3">
          <motion.a
            href={`mailto:${personalInfo.email}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden md:flex btn-primary text-sm py-2 px-4 xl:px-5"
          >
            Hire Me ✨
          </motion.a>

          <button
            onClick={() => setMenuOpen(prev => !prev)}
            aria-label="Toggle menu"
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg text-slate-300 hover:text-white transition-colors"
            style={{ background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.2)' }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {menuOpen
                ? <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}><FiX size={20} /></motion.span>
                : <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}><FiMenu size={20} /></motion.span>
              }
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* ── Mobile Menu ──────────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="lg:hidden overflow-hidden"
            style={{ borderTop: '1px solid rgba(124, 58, 237, 0.15)' }}
          >
            <div className="px-5 py-3 flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    active === link.href
                      ? 'text-purple-300 bg-purple-500/10 border border-purple-500/20'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <a
                href={`mailto:${personalInfo.email}`}
                className="btn-primary text-sm py-3 mt-2 justify-center text-center"
              >
                Hire Me ✨
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
