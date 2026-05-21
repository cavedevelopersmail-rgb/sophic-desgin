/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#00353E',
        },
        accent: {
          50: '#f7fee7',
          100: '#ecfccb',
          200: '#d9f99d',
          300: '#bef264',
          400: '#a3e635',
          500: '#84cc16',
          600: '#65a30d',
          700: '#4d7c0f',
          800: '#365314',
          900: '#1a2e05',
          950: '#9ACD32',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      keyframes: {
        'marquee-logos': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'megamenu-panel': {
          '0%': { opacity: '0', transform: 'translateY(-0.75rem) scale(0.99)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        'megamenu-fade-up': {
          '0%': { opacity: '0', transform: 'translateY(0.6rem)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'megamenu-card': {
          '0%': { opacity: '0', transform: 'translateY(1rem)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'megamenu-line': {
          '0%': { transform: 'scaleX(0)', opacity: '0' },
          '100%': { transform: 'scaleX(1)', opacity: '1' },
        },
        'megamenu-shimmer': {
          '0%': { transform: 'translateX(-100%) skewX(-12deg)' },
          '100%': { transform: 'translateX(200%) skewX(-12deg)' },
        },
      },
      animation: {
        'marquee-logos': 'marquee-logos 90s linear infinite',
        'megamenu-panel':
          'megamenu-panel 0.52s cubic-bezier(0.22, 1, 0.36, 1) both',
        'megamenu-fade-up':
          'megamenu-fade-up 0.48s cubic-bezier(0.22, 1, 0.36, 1) both',
        'megamenu-card':
          'megamenu-card 0.5s cubic-bezier(0.22, 1, 0.36, 1) both',
        'megamenu-line':
          'megamenu-line 0.65s cubic-bezier(0.22, 1, 0.36, 1) both',
        'megamenu-shimmer':
          'megamenu-shimmer 0.85s cubic-bezier(0.4, 0, 0.2, 1) forwards',
      },
    },
  },
  plugins: [],
}