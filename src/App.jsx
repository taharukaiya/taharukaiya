import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Achievements from './components/Achievements';
import Extra from './components/Extra';
import Contact from './components/Contact';
import Footer from './components/Footer';

// Cursor glow component
function CursorGlow() {
  const [pos, setPos] = useState({ x: -500, y: -500 });
  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);
  return (
    <div
      className="cursor-glow hidden lg:block"
      style={{ left: pos.x, top: pos.y }}
    />
  );
}

// Loading screen
function LoadingScreen({ onDone }) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      onAnimationComplete={onDone}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
      style={{ background: '#020818' }}
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-20 h-20 rounded-2xl flex items-center justify-center font-black text-white font-mono text-3xl mb-6"
        style={{
          background: 'linear-gradient(135deg, #7C3AED, #9333EA)',
          boxShadow: '0 0 40px rgba(147, 51, 234, 0.6)',
        }}
      >
        RT
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-slate-400 font-mono text-sm"
      >
        Loading portfolio...
      </motion.p>
      <motion.div
        className="mt-6 h-0.5 rounded-full"
        style={{ background: 'rgba(124, 58, 237, 0.2)', width: 200 }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          className="h-full rounded-full"
          style={{ background: 'linear-gradient(90deg, #7C3AED, #9333EA, #A855F7)' }}
        />
      </motion.div>
    </motion.div>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <AnimatePresence>
        {loading && (
          <LoadingScreen
            onDone={() => {}}
            key="loading"
          />
        )}
      </AnimatePresence>

      {/* Loading manager */}
      {loading && (
        <div className="hidden">
          {setTimeout(() => setLoading(false), 1800) && null}
        </div>
      )}

      <div className="relative min-h-screen">
        {/* Ambient orbs */}
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />

        {/* Cursor glow */}
        <CursorGlow />

        <AnimatePresence>
          {!loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Navbar />
              <main className="relative z-10">
                <Hero />
                <About />
                <Skills />
                <Projects />
                <Experience />
                <Achievements />
                <Extra />
                <Contact />
              </main>
              <Footer />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
