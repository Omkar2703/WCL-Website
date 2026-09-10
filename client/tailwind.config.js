/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bgdark: '#0A1420',
        surfacedark: '#0F1E33',
        bglight: '#F3F7F9',
        surfacelight: '#FFFFFF',
        ink: '#0B1220',
        paper: '#EAF3F6',
        teal: {
          DEFAULT: '#2DD4BF',
          soft: '#5EEAD4',
          deep: '#0F766E'
        },
        amber: {
          DEFAULT: '#F2A93B',
          soft: '#FBCB83',
          deep: '#B4740E'
        },
        slate400: '#7E93A7'
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"IBM Plex Sans"', 'sans-serif']
      },
      backdropBlur: {
        xs: '2px'
      },
      borderRadius: {
        hero: '28px',
        row: '10px'
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(45,212,191,0.15), 0 20px 60px -20px rgba(45,212,191,0.25)',
        'glow-amber': '0 0 0 1px rgba(242,169,59,0.18), 0 20px 60px -20px rgba(242,169,59,0.25)'
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' }
        },
        scrolly: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-50%)' }
        }
      },
      animation: {
        marquee: 'marquee 32s linear infinite',
        scrolly: 'scrolly 22s linear infinite'
      }
    }
  },
  plugins: []
}
