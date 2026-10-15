import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        cyan: {
          300: '#67e8f9',
        },
        violet: {
          400: '#a78bfa',
        },
        fuchsia: {
          400: '#e879f9',
        },
        gold: '#FFD166',
        space: {
          950: '#05060F',
          900: '#0B0B2B',
          800: '#120A2E',
        },
      },
      boxShadow: {
        glass: '0 24px 80px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255,255,255,0.08)',
        glow: '0 0 32px rgba(124, 58, 237, 0.24), 0 0 52px rgba(34, 211, 238, 0.12)',
        'glow-violet': '0 0 26px rgba(167, 139, 250, 0.26)',
        'glow-cyan': '0 0 26px rgba(103, 232, 249, 0.22)',
        'glow-ring': '0 0 0 1px rgba(167, 139, 250, 0.32), 0 0 24px rgba(124, 58, 237, 0.2), 0 0 40px rgba(34, 211, 238, 0.1)',
        'glow-gold': '0 12px 32px rgba(255, 209, 102, 0.28)',
      },
      backdropBlur: {
        glass: '28px',
      },
      keyframes: {
        twinkle: {
          '0%, 100%': { opacity: '0.45' },
          '50%': { opacity: '1' },
        },
        drift: {
          '0%, 100%': { transform: 'translate3d(-2%, 0, 0) scale(1)' },
          '50%': { transform: 'translate3d(2%, -3%, 0) scale(1.08)' },
        },
        orbit: {
          to: { transform: 'rotate(360deg)' },
        },
        shoot: {
          '0%': { opacity: '0', transform: 'rotate(var(--shoot-angle)) translate3d(0, 0, 0) scaleX(0.2)' },
          '10%': { opacity: '1' },
          '100%': { opacity: '0', transform: 'rotate(var(--shoot-angle)) translate3d(-65vw, 65vh, 0) scaleX(1)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 18px rgba(124, 58, 237, 0.25), 0 0 30px rgba(34, 211, 238, 0.1)' },
          '50%': { boxShadow: '0 0 26px rgba(124, 58, 237, 0.4), 0 0 42px rgba(34, 211, 238, 0.2)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' },
        },
      },
      animation: {
        twinkle: 'twinkle 3.6s ease-in-out infinite',
        drift: 'drift 34s ease-in-out infinite',
        orbit: 'orbit 24s linear infinite',
        shoot: 'shoot 1.8s ease-out forwards',
        'pulse-glow': 'pulseGlow 3.4s ease-in-out infinite',
        float: 'float 7s ease-in-out infinite',
        shimmer: 'shimmer 5s linear infinite',
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        sans: ['var(--font-sans)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
