import { useEffect, useRef } from 'react';

/**
 * GlobalParticles — fixed-position canvas that covers the entire viewport.
 * Renders a subtle, drifting purple particle network behind all sections.
 * Mounts once in App.jsx so the effect persists across every section.
 */
export default function GlobalParticles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const ctx = canvas.getContext('2d');

    // More particles spread across the full page height (denser & higher limit)
    const count = Math.min(Math.floor((window.innerWidth * window.innerHeight) / 8000), 160);
    const particles = Array.from({ length: count }, () => ({
      x:     Math.random() * window.innerWidth,
      y:     Math.random() * window.innerHeight,
      r:     Math.random() * 2.0 + 0.5, // Slightly larger particles
      vx:    (Math.random() - 0.5) * 0.45, // Slightly faster movement
      vy:    (Math.random() - 0.5) * 0.45,
      alpha: Math.random() * 0.4 + 0.15, // More opaque dots
    }));

    const CONNECTION_DIST = 160; // Connect from further away

    let animId;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update + draw particles
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(147, 51, 234, ${p.alpha})`;
        ctx.fill();
      });

      // Draw connection lines between close particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx   = particles[i].x - particles[j].x;
          const dy   = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DIST) {
            // More visible lines
            const lineAlpha = (1 - dist / CONNECTION_DIST) * 0.25;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(147, 51, 234, ${lineAlpha})`;
            ctx.lineWidth   = 0.8;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0, opacity: 0.9 }}
    />
  );
}
