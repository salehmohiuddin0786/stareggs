/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#071426',
          'navy-dark': '#040b15',
          'navy-light': '#0d223d',
          'navy-card': 'rgba(13, 34, 61, 0.7)',
          blue: '#174BFF',
          'blue-glow': 'rgba(23, 75, 255, 0.4)',
          red: '#FF303B',
          'red-glow': 'rgba(255, 48, 59, 0.4)',
          white: '#FFFFFF',
          light: '#F3F6FB',
          muted: '#AAB7CC',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-space-grotesk)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow-blue': '0 0 35px -5px rgba(23, 75, 255, 0.5)',
        'glow-red': '0 0 30px -5px rgba(255, 48, 59, 0.4)',
        'card-navy': '0 20px 40px -15px rgba(4, 11, 21, 0.8)',
      },
      backgroundImage: {
        'radial-radial-spotlight': 'radial-gradient(circle at 50% 30%, rgba(23, 75, 255, 0.18), transparent 70%)',
        'hero-gradient': 'linear-gradient(180deg, #071426 0%, #040b15 100%)',
      },
      animation: {
        'pulse-subtle': 'pulseSubtle 4s ease-in-out infinite',
        'float-slow': 'floatSlow 6s ease-in-out infinite',
      },
      keyframes: {
        pulseSubtle: {
          '0%, 100%': { opacity: '0.8' },
          '50%': { opacity: '1' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};
