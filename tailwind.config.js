/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg:      { DEFAULT: '#FAFAF8', secondary: '#F4F2EE' },
        surface: { DEFAULT: '#FFFFFF', hover: '#FAFAF8' },
        ink:     { DEFAULT: '#111111', secondary: '#525252', muted: '#A3A3A3', faint: '#D4D2CE' },
        accent:  { DEFAULT: '#C4614A', light: '#E8896F', dark: '#9E4A36', warm: '#F5EDE8' },
        border:  { DEFAULT: '#E8E6E0', strong: '#C8C6C0' },
        success: '#2D7D52',
        warning: '#92400E',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        body:    ['Inter', 'system-ui', 'sans-serif'],
        mono:    ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        '2xs': '0.65rem',
      },
      boxShadow: {
        'xs':       '0 1px 2px rgba(0,0,0,0.06)',
        'sm':       '0 2px 8px rgba(0,0,0,0.08)',
        'md':       '0 4px 16px rgba(0,0,0,0.10)',
        'lg':       '0 8px 32px rgba(0,0,0,0.12)',
        'xl':       '0 16px 48px rgba(0,0,0,0.14)',
        'accent':   '0 4px 24px rgba(196,97,74,0.20)',
        'accent-lg':'0 8px 40px rgba(196,97,74,0.25)',
      },
      animation: {
        'float':     'float 8s ease-in-out infinite',
        'fade-in':   'fadeIn 0.6s ease forwards',
        'slide-up':  'slideUp 0.6s cubic-bezier(0.16,1,0.3,1) forwards',
      },
      keyframes: {
        float:   { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-12px)' } },
        fadeIn:  { from: { opacity: 0 }, to: { opacity: 1 } },
        slideUp: { from: { opacity: 0, transform: 'translateY(24px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'smooth': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};
