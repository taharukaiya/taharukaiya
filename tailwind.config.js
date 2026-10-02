/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#020818',
          900: '#060D21',
          800: '#0A1628',
          700: '#0F1E35',
          600: '#152540',
        },
        purple: {
          400: '#A855F7',
          500: '#9333EA',
          600: '#7C3AED',
        },
        violet: {
          400: '#818CF8',
          500: '#6366F1',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'gradient-x': 'gradient-x 15s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'spin-slow': 'spin 20s linear infinite',
        'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': { 'background-size': '200% 200%', 'background-position': 'left center' },
          '50%': { 'background-size': '200% 200%', 'background-position': 'right center' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'glow': {
          'from': { 'text-shadow': '0 0 10px #9333ea, 0 0 20px #9333ea' },
          'to': { 'text-shadow': '0 0 20px #a855f7, 0 0 40px #a855f7, 0 0 80px #a855f7' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '1', 'box-shadow': '0 0 20px #9333ea' },
          '50%': { opacity: '.8', 'box-shadow': '0 0 40px #a855f7, 0 0 60px #7c3aed' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
}
