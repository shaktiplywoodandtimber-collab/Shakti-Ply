/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#090604',
        ember: '#b87034',
        timber: '#7c4f2a',
        bark: '#2a160d',
        mist: '#f3ede5',
      },
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 28px 90px rgba(245, 158, 11, 0.18)',
        panel: '0 24px 80px rgba(0, 0, 0, 0.35)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        pulseGlow: {
          '0%, 100%': {
            boxShadow: '0 0 0 0 rgba(245, 158, 11, 0.26)',
          },
          '70%': {
            boxShadow: '0 0 0 18px rgba(245, 158, 11, 0)',
          },
        },
        sheen: {
          '0%': { transform: 'translateX(-120%) skewX(-18deg)' },
          '100%': { transform: 'translateX(220%) skewX(-18deg)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2.8s ease-in-out infinite',
        sheen: 'sheen 3.5s linear infinite',
      },
      backgroundImage: {
        grain:
          'linear-gradient(180deg, rgba(255,255,255,0.03), transparent), repeating-linear-gradient(90deg, rgba(255,255,255,0.03) 0 2px, transparent 2px 8px), repeating-linear-gradient(0deg, rgba(0,0,0,0.18) 0 1px, transparent 1px 6px)',
      },
    },
  },
  plugins: [],
}