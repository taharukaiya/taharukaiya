import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { personalInfo, stats } from '../data/portfolioData';
import { FiGithub, FiLinkedin, FiDownload, FiArrowDown } from 'react-icons/fi';
import { FaFacebookF } from 'react-icons/fa';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

const floatingElements = [
  { text: '<developer />', x: '6%', y: '20%', delay: 0 },
  { text: 'const code = () =>', x: '72%', y: '22%', delay: 0.5 },
  { text: '{ build(); }', x: '80%', y: '62%', delay: 1 },
  { text: 'import React', x: '4%', y: '68%', delay: 1.5 },
  { text: '// Problem Solver', x: '42%', y: '90%', delay: 2 },
];

function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.pageYOffset - 80;
  window.scrollTo({ top, behavior: 'smooth' });
}

export default function Hero() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const ctx = canvas.getContext('2d');
    const particles = Array.from({ length: 55 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.8 + 0.4,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      alpha: Math.random() * 0.4 + 0.1,
    }));

    let animId;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(147, 51, 234, ${p.alpha})`;
        ctx.fill();
      });
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach(p2 => {
          const d = Math.hypot(p1.x - p2.x, p1.y - p2.y);
          if (d < 130) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(147, 51, 234, ${0.08 * (1 - d / 130)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        });
      });
      animId = requestAnimationFrame(animate);
    };
    animate();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden grid-bg pt-20"
    >
      {/* Canvas particle network */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-50 pointer-events-none" />

      {/* Floating code snippets — desktop only */}
      {floatingElements.map((el, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.12, 0.12, 0], y: [20, 0, 0, -10] }}
          transition={{ delay: el.delay + 1, duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute font-mono text-purple-300 text-xs sm:text-sm hidden xl:block pointer-events-none select-none"
          style={{ left: el.x, top: el.y }}
        >
          {el.text}
        </motion.div>
      ))}

      {/* Ambient gradient orbs */}
      <div
        className="absolute top-1/4 left-1/4 w-64 sm:w-96 h-64 sm:h-96 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #9333EA, transparent)' }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-64 sm:w-96 h-64 sm:h-96 rounded-full opacity-8 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #6366F1, transparent)' }}
      />

      {/* ── Main Content ───────────────────────────────── */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-5 sm:px-8 flex flex-col items-center text-center py-12 sm:py-16">

        {/* Available badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full mb-6 sm:mb-8 text-xs sm:text-sm font-medium"
          style={{
            background: 'rgba(124, 58, 237, 0.12)',
            border: '1px solid rgba(168, 85, 247, 0.3)',
            color: '#c4b5fd',
          }}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
          Available for opportunities
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-black leading-none mb-4"
          style={{ fontSize: 'clamp(2.6rem, 9vw, 6rem)' }}
        >
          <span className="text-white">Rukaiya </span>
          <span className="glow-text">Taha</span>
        </motion.h1>

        {/* Typewriter row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 mb-5 sm:mb-6"
          style={{ fontSize: 'clamp(1.25rem, 4vw, 2.25rem)', fontWeight: 700 }}
        >
          <span className="text-slate-400">I&apos;m a</span>
          <TypeAnimation
            sequence={[
              'Software Engineer', 2000,
              'Full-Stack Developer', 2000,
              'Problem Solver', 2000,
              'React Developer', 2000,
              'Open Source Fan', 2000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
            style={{
              background: 'linear-gradient(135deg, #a855f7, #818cf8)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          />
        </motion.div>

        {/* Short bio */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-sm sm:text-base lg:text-lg text-slate-400 mb-8 sm:mb-10 max-w-xl sm:max-w-2xl leading-relaxed"
        >
          {personalInfo.shortBio} · Based in{' '}
          <span className="text-purple-400 font-semibold">Dhaka, Bangladesh</span>
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center w-full sm:w-auto mb-10"
        >
          <motion.a
            href="#projects"
            onClick={(e) => { e.preventDefault(); scrollToId('projects'); }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="btn-primary text-sm sm:text-base justify-center"
          >
            View My Work 🚀
          </motion.a>
          <motion.a
            href="#contact"
            onClick={(e) => { e.preventDefault(); scrollToId('contact'); }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="btn-secondary text-sm sm:text-base justify-center"
          >
            Get In Touch
          </motion.a>
          <motion.a
            href="/Rukaiya_Taha_Resume.pdf"
            download
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="btn-secondary text-sm sm:text-base justify-center"
          >
            <FiDownload /> Resume
          </motion.a>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex justify-center gap-3 sm:gap-4 mb-10 sm:mb-14"
        >
          {[
            { icon: <FiGithub size={18} />, href: personalInfo.github, label: 'GitHub' },
            { icon: <FiLinkedin size={18} />, href: personalInfo.linkedin, label: 'LinkedIn' },
            { icon: <FaFacebookF size={16} />, href: personalInfo.facebook, label: 'Facebook' },
          ].map(({ icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -3, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2.5 sm:p-3 rounded-xl text-slate-400 hover:text-purple-400 transition-colors"
              style={{ background: 'rgba(124, 58, 237, 0.08)', border: '1px solid rgba(124, 58, 237, 0.2)' }}
              aria-label={label}
            >
              {icon}
            </motion.a>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.85 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 w-full max-w-lg sm:max-w-2xl"
        >
          {stats.map((stat, i) => (
            <div key={i} className="glass-card p-3 sm:p-4 text-center">
              <div className="text-2xl sm:text-3xl font-black glow-text">
                {inView ? (
                  <CountUp end={stat.value} duration={2} delay={i * 0.2} />
                ) : '0'}
                {stat.suffix}
              </div>
              <div className="text-slate-400 text-xs mt-1 leading-tight">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0], y: [0, 0, 8, 8] }}
        transition={{ delay: 2, duration: 2.5, repeat: Infinity }}
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-slate-500 pointer-events-none"
      >
        <span className="text-xs font-mono tracking-widest">scroll</span>
        <FiArrowDown size={14} />
      </motion.div>
    </section>
  );
}
