import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { personalInfo } from '../data/portfolioData';
import { FiMail, FiGithub, FiLinkedin, FiSend, FiMapPin } from 'react-icons/fi';
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
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate send — replace with your backend/EmailJS integration
    await new Promise(r => setTimeout(r, 1500));
    toast.success("Message sent! I'll get back to you soon. ✨", {
      style: { background: '#0A1628', color: '#fff', border: '1px solid rgba(168,85,247,0.3)' },
      icon: '📨',
    });
    setForm({ name: '', email: '', subject: '', message: '' });
    setLoading(false);
  };

  return (
    <section id="contact" className="relative py-28 px-6" ref={ref}>
      <Toaster position="top-right" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <span className="text-purple-400 font-mono text-sm font-medium tracking-widest uppercase mb-4 block">
            Let&apos;s work together
          </span>
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle">
            Have a project in mind or want to collaborate? I&apos;d love to hear from you!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Left info panel */}
          <motion.div
            variants={fadeUp}
            custom={1}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="lg:col-span-2 space-y-6"
          >
            {/* Info card */}
            <div className="glass-card p-7">
              <h3 className="text-white font-bold text-xl mb-6">Contact Info</h3>

              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-purple-400 flex-shrink-0"
                       style={{ background: 'rgba(124, 58, 237, 0.15)' }}>
                    <FiMail size={18} />
                  </div>
                  <div>
                    <p className="text-slate-500 text-xs mb-1">Email</p>
                    <a href={`mailto:${personalInfo.email}`} className="text-slate-200 hover:text-purple-400 transition-colors text-sm">
                      {personalInfo.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-purple-400 flex-shrink-0"
                       style={{ background: 'rgba(124, 58, 237, 0.15)' }}>
                    <FiMapPin size={18} />
                  </div>
                  <div>
                    <p className="text-slate-500 text-xs mb-1">Location</p>
                    <p className="text-slate-200 text-sm">{personalInfo.location}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                       style={{ background: 'rgba(16, 185, 129, 0.15)' }}>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                  <div>
                    <p className="text-slate-500 text-xs mb-1">Status</p>
                    <p className="text-emerald-400 text-sm font-medium">Available for opportunities</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div className="glass-card p-7">
              <h3 className="text-white font-bold mb-5">Find me on</h3>
              <div className="grid grid-cols-2 gap-3">
                {socials.map(({ icon, href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-3 p-3 rounded-xl text-slate-300 hover:text-white transition-all"
                    style={{ background: 'rgba(15, 30, 53, 0.6)', border: '1px solid rgba(51, 65, 85, 0.5)' }}
                  >
                    <span className="text-purple-400">{icon}</span>
                    <span className="text-sm font-medium">{label}</span>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right form */}
          <motion.div
            variants={fadeUp}
            custom={2}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="lg:col-span-3"
          >
            <div className="glass-card p-8">
              <h3 className="text-white font-bold text-xl mb-7">Send a Message</h3>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-slate-400 text-sm mb-2 block">Your Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="John Doe"
                      className="form-input"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 text-sm mb-2 block">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="john@example.com"
                      className="form-input"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-slate-400 text-sm mb-2 block">Subject *</label>
                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    required
                    placeholder="Project Collaboration / Job Opportunity"
                    className="form-input"
                  />
                </div>

                <div>
                  <label className="text-slate-400 text-sm mb-2 block">Message *</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Tell me about your project or opportunity..."
                    className="form-input resize-none"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                  className="w-full btn-primary justify-center py-4 text-base"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <FiSend /> Send Message
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
