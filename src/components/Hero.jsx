import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { personalInfo, stats } from '../data/portfolioData';
import { FiGithub, FiTwitter, FiLinkedin, FiDownload, FiArrowDown } from 'react-icons/fi';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

const floatingElements = [
  { text: '<developer />', x: '8%', y: '15%', delay: 0 },
  { text: 'const code = () =>', x: '75%', y: '20%', delay: 0.5 },
  { text: '{ build(); }', x: '82%', y: '60%', delay: 1 },
  { text: 'import React', x: '5%', y: '65%', delay: 1.5 },
  { text: '// Problem Solver', x: '45%', y: '88%', delay: 2 },
];

export default function Hero() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 0.5,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      alpha: Math.random() * 0.5 + 0.1,
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
      // Draw connections
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach(p2 => {
          const d = Math.hypot(p1.x - p2.x, p1.y - p2.y);
          if (d < 120) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(147, 51, 234, ${0.1 * (1 - d / 120)})`;
            ctx.stroke();
          }
        });
      });
      animId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden grid-bg">
      {/* Animated canvas background */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-60" />

      {/* Floating code elements */}
      {floatingElements.map((el, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.15, y: [0, -10, 0] }}
          transition={{ delay: el.delay, duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute font-mono text-purple-300 text-sm hidden xl:block pointer-events-none"
          style={{ left: el.x, top: el.y }}
        >
          {el.text}
        </motion.div>
      ))}

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl"
           style={{ background: 'radial-gradient(circle, #9333EA, transparent)' }} />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full opacity-8 blur-3xl"
           style={{ background: 'radial-gradient(circle, #6366F1, transparent)' }} />

      {/* Main content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto mt-28">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-8 text-sm font-medium"
          style={{
            background: 'rgba(124, 58, 237, 0.12)',
            border: '1px solid rgba(168, 85, 247, 0.3)',
            color: '#c4b5fd',
          }}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Available for opportunities
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-4 leading-none"
        >
          <span className="text-white">Rukaiya </span>
          <span className="glow-text">Taha</span>
        </motion.h1>

        {/* Typewriter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 h-14 flex items-center justify-center"
        >
          <span className="text-slate-400 mr-3">I&apos;m a</span>
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
            }}
          />
        </motion.div>

        {/* Bio */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-lg text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          {personalInfo.shortBio} · Based in{' '}
          <span className="text-purple-400 font-semibold">Dhaka, Bangladesh 🇧🇩</span>
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="flex flex-wrap gap-4 justify-center mb-12"
        >
          <motion.a
            href="#projects"
            onClick={(e) => { e.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }); }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary text-base"
          >
            View My Work 🚀
          </motion.a>
          <motion.a
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-secondary text-base"
          >
            Get In Touch
          </motion.a>
          <motion.a
            href="/Rukaiya_Taha_Resume.pdf"
            download
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-secondary text-base"
          >
            <FiDownload /> Resume
          </motion.a>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex justify-center gap-5 mb-16"
        >
          {[
            { icon: <FiGithub size={20} />, href: personalInfo.github, label: 'GitHub' },
            { icon: <FiLinkedin size={20} />, href: personalInfo.linkedin, label: 'LinkedIn' },
            { icon: <FiTwitter size={20} />, href: personalInfo.twitter, label: 'Twitter' },
          ].map(({ icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -4, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 rounded-xl text-slate-400 hover:text-purple-400 transition-colors"
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
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto"
        >
          {stats.map((stat, i) => (
            <div key={i} className="glass-card p-4 text-center">
              <div className="text-3xl font-black glow-text">
                {inView ? (
                  <CountUp end={stat.value} duration={2} delay={i * 0.2} />
                ) : '0'}
                {stat.suffix}
              </div>
              <div className="text-slate-400 text-xs mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ delay: 1.5, duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500"
      >
        <span className="text-xs font-mono">scroll</span>
        <FiArrowDown size={16} />
      </motion.div>
    </section>
  );
}
