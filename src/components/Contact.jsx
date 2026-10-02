import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import emailjs from '@emailjs/browser';
import { personalInfo } from '../data/portfolioData';
import { FiMail, FiGithub, FiLinkedin, FiSend, FiMapPin, FiUser, FiMessageSquare } from 'react-icons/fi';
import { FaFacebookF } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
};

const socials = [
  { icon: <FiGithub size={20} />, href: personalInfo.github, label: 'GitHub', color: '#9333EA' },
  { icon: <FiLinkedin size={20} />, href: personalInfo.linkedin, label: 'LinkedIn', color: '#0A66C2' },
  { icon: <FaFacebookF size={18} />, href: personalInfo.facebook, label: 'Facebook', color: '#1877F2' },
  { icon: <FiMail size={20} />, href: `mailto:${personalInfo.email}`, label: 'Email', color: '#EA4335' },
];

export default function Contact() {
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true });
  const formRef = useRef(null);

  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error('Please fill in all required fields.');
      return;
    }

    // Basic email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      toast.error('Please enter a valid email address.');
      return;
    }

    setSending(true);

    const serviceId  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    // Fallback: if env vars aren't configured yet, show setup instructions
    if (!serviceId || serviceId === 'your_service_id') {
      setSending(false);
      toast.error('EmailJS not configured yet. See console for instructions.', { duration: 6000 });
      console.warn(
        '%c⚠️ EmailJS Setup Required',
        'color: orange; font-weight: bold; font-size: 14px',
        '\n1. Go to https://www.emailjs.com and create a free account',
        '\n2. Add an Email Service (Gmail recommended)',
        '\n3. Create a Template with variables: {{from_name}}, {{from_email}}, {{subject}}, {{message}}',
        '\n4. Copy your Service ID, Template ID, and Public Key into the .env file',
      );
      return;
    }

    try {
      await emailjs.sendForm(serviceId, templateId, formRef.current, publicKey);
      toast.success("Message sent! I'll get back to you soon 🚀", { duration: 5000 });
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      console.error('EmailJS error:', err);
      toast.error('Failed to send message. Please email me directly.', { duration: 5000 });
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="relative py-20 sm:py-28 px-4 sm:px-6 overflow-x-hidden">
      <Toaster position="bottom-center" toastOptions={{
        style: { background: '#1e293b', color: '#e2e8f0', border: '1px solid rgba(124,58,237,0.3)' },
      }} />

      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* ── Header ───────────────────────────────────── */}
        <motion.div
          variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-14 sm:mb-20"
        >
          <span className="text-purple-400 font-mono text-xs sm:text-sm font-medium tracking-widest uppercase mb-4 block">
            Get in touch
          </span>
          <h2 className="section-title">Contact Me</h2>
          <p className="section-subtitle text-sm sm:text-base px-2">
            Have a project in mind or want to collaborate? I&apos;d love to hear from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">

          {/* ── LEFT: Info panel ─────────────────────── */}
          <motion.div
            variants={fadeUp} custom={1} initial="hidden" animate={inView ? 'visible' : 'hidden'}
            className="lg:col-span-2 flex flex-col gap-5 min-w-0"
          >
            {/* Info card */}
            <div className="glass-card p-5 sm:p-7 min-w-0">
              <h3 className="text-lg font-bold text-white mb-1">Let&apos;s Talk</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Whether it&apos;s a job opportunity, a collaboration, or just saying hi — my inbox is always open.
              </p>

              <div className="flex flex-col gap-4">
                {[
                  { icon: <FiMapPin size={16} />, label: 'Location', value: personalInfo.location, color: 'text-pink-400' },
                  { icon: <FiMail size={16} />, label: 'Email', value: personalInfo.email, color: 'text-blue-400', href: `mailto:${personalInfo.email}` },
                ].map(({ icon, label, value, color, href }) => (
                  <div key={label} className="flex items-start gap-3 min-w-0">
                    <div className={`flex-shrink-0 mt-0.5 p-2 rounded-lg ${color}`}
                         style={{ background: 'rgba(124,58,237,0.1)' }}>
                      {icon}
                    </div>
                    <div className="min-w-0">
                      <p className="text-slate-500 text-xs mb-0.5">{label}</p>
                      {href
                        ? <a href={href} className={`${color} text-sm font-medium break-all hover:underline`}>{value}</a>
                        : <p className="text-slate-200 text-sm">{value}</p>
                      }
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social links */}
            <div className="glass-card p-5 sm:p-6 min-w-0">
              <p className="text-slate-400 text-sm font-medium mb-4">Find me on</p>
              <div className="grid grid-cols-2 gap-3">
                {socials.map(({ icon, href, label, color }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.04, y: -2 }}
                    whileTap={{ scale: 0.96 }}
                    className="flex items-center gap-2.5 px-3 py-3 rounded-xl transition-all duration-200 min-w-0"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(124,58,237,0.15)' }}
                  >
                    <span style={{ color }}>{icon}</span>
                    <span className="text-slate-300 text-sm font-medium">{label}</span>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Availability badge */}
            <div
              className="flex items-center gap-3 px-5 py-4 rounded-2xl"
              style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)' }}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
              <p className="text-emerald-400 text-sm font-medium">Available for opportunities</p>
            </div>
          </motion.div>

          {/* ── RIGHT: Contact form ───────────────────── */}
          <motion.div
            variants={fadeUp} custom={2} initial="hidden" animate={inView ? 'visible' : 'hidden'}
            className="lg:col-span-3 min-w-0"
          >
            <form ref={formRef} onSubmit={handleSubmit} className="glass-card p-5 sm:p-8 flex flex-col gap-5 min-w-0">
              <h3 className="text-lg font-bold text-white mb-1">Send a Message</h3>

              {/* Name + Email row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-400 text-xs font-medium flex items-center gap-1.5">
                    <FiUser size={12} /> Your Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="from_name"
                    value={form.name}
                    onChange={(e) => setForm(p => ({ ...p, name: e.target.value }))}
                    placeholder="Rukaiya Taha"
                    required
                    className="form-input"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-400 text-xs font-medium flex items-center gap-1.5">
                    <FiMail size={12} /> Your Email <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    name="from_email"
                    value={form.email}
                    onChange={(e) => setForm(p => ({ ...p, email: e.target.value }))}
                    placeholder="you@example.com"
                    required
                    className="form-input"
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="flex flex-col gap-1.5">
                <label className="text-slate-400 text-xs font-medium">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={(e) => setForm(p => ({ ...p, subject: e.target.value }))}
                  placeholder="Project Collaboration / Job Opportunity / Just saying hi!"
                  className="form-input"
                />
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <label className="text-slate-400 text-xs font-medium flex items-center gap-1.5">
                  <FiMessageSquare size={12} /> Message <span className="text-red-400">*</span>
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={(e) => setForm(p => ({ ...p, message: e.target.value }))}
                  placeholder="Tell me about your project or opportunity..."
                  rows={6}
                  required
                  className="form-input resize-none"
                />
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={sending}
                whileHover={!sending ? { scale: 1.02 } : {}}
                whileTap={!sending ? { scale: 0.97 } : {}}
                className="btn-primary justify-center py-3.5 text-sm mt-1 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {sending ? (
                  <>
                    <svg className="animate-spin h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Sending...
                  </>
                ) : (
                  <><FiSend size={15} /> Send Message</>
                )}
              </motion.button>

              <p className="text-slate-600 text-xs text-center">
                I typically reply within 24 hours.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
