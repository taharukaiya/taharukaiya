import { motion } from 'framer-motion';
import { personalInfo, navLinks } from '../data/portfolioData';
import { FiGithub, FiLinkedin, FiMail, FiArrowUp, FiMapPin } from 'react-icons/fi';
import { FaFacebookF } from 'react-icons/fa';

function scrollToSection(href) {
  const id = href.slice(1);
  const el = document.getElementById(id);
  if (!el) return;
  window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 80, behavior: 'smooth' });
}

const socials = [
  { icon: <FiGithub size={18} />,     href: personalInfo.github,                      label: 'GitHub' },
  { icon: <FiLinkedin size={18} />,   href: personalInfo.linkedin,                    label: 'LinkedIn' },
  { icon: <FaFacebookF size={16} />,  href: personalInfo.facebook,                    label: 'Facebook' },
  { icon: <FiMail size={18} />,       href: `mailto:${personalInfo.email}`,           label: 'Email' },
];

// Only show a subset of nav links in footer to keep it clean
const footerLinks = navLinks.filter(l =>
  ['#about', '#skills', '#projects', '#education', '#contact'].includes(l.href)
);

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative z-10 mt-8 overflow-x-hidden">
      {/* Top gradient fade */}
      <div
        className="h-px w-full"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(124,58,237,0.5), transparent)' }}
      />

      <div
        className="px-4 sm:px-6 pt-14 pb-8"
        style={{ background: 'rgba(2, 4, 20, 0.45)', backdropFilter: 'blur(16px)' }}
      >
        <div className="max-w-7xl mx-auto">

          {/* ── Top section: 3 columns ───────────────── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-12">

            {/* Col 1 — Brand + tagline */}
            <div>
              <p className="font-black text-2xl tracking-tight mb-2">
                <span className="text-white">Rukaiya </span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-violet-400">Taha</span>
              </p>
              <p className="text-slate-400 text-sm leading-relaxed mb-5">
                Software Engineer & AI/ML Enthusiast crafting elegant digital experiences.
              </p>

              {/* Location */}
              <div className="flex items-center gap-2 text-slate-500 text-sm mb-6">
                <FiMapPin size={13} className="text-purple-400 flex-shrink-0" />
                <span>{personalInfo.location}</span>
              </div>

              {/* Social icons */}
              <div className="flex gap-2.5">
                {socials.map(({ icon, href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    whileHover={{ y: -3, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-9 h-9 flex items-center justify-center rounded-xl text-slate-400 hover:text-purple-300 transition-colors"
                    style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.2)' }}
                  >
                    {icon}
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Col 2 — Quick nav links */}
            <div>
              <h4 className="text-white font-semibold text-sm mb-4 tracking-wide uppercase">Quick Links</h4>
              <ul className="flex flex-col gap-2.5">
                {footerLinks.map(link => (
                  <li key={link.href}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-slate-400 hover:text-purple-400 text-sm transition-colors flex items-center gap-2 group"
                    >
                      <span
                        className="w-1 h-1 rounded-full bg-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3 — Contact card */}
            <div>
              <h4 className="text-white font-semibold text-sm mb-4 tracking-wide uppercase">Get In Touch</h4>
              <p className="text-slate-400 text-sm leading-relaxed mb-5">
                Available for freelance projects, research collaborations, and full-time opportunities.
              </p>
              <motion.a
                href={`mailto:${personalInfo.email}`}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-purple-300 transition-all"
                style={{ background: 'rgba(124,58,237,0.12)', border: '1px solid rgba(168,85,247,0.25)' }}
              >
                <FiMail size={14} />
                {personalInfo.email}
              </motion.a>

              {/* Availability badge */}
              <div className="flex items-center gap-2 mt-4">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-emerald-400 text-xs font-medium">Open to opportunities</span>
              </div>
            </div>

          </div>

          {/* ── Divider ──────────────────────────────── */}
          <div
            className="h-px mb-6 w-full"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(124,58,237,0.2), transparent)' }}
          />

          {/* ── Bottom bar ───────────────────────────── */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-slate-600 text-xs">
              &copy; {new Date().getFullYear()} Rukaiya Taha. All rights reserved.
            </p>
            <p className="text-slate-600 text-xs">
              Designed &amp; Developed by Rukaiya Taha
            </p>
            <motion.button
              onClick={scrollToTop}
              whileHover={{ y: -2, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-purple-400 transition-colors"
            >
              <FiArrowUp size={13} /> Back to top
            </motion.button>
          </div>

        </div>
      </div>
    </footer>
  );
}
