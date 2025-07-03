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
        earth: {
          50: '#faf7f2',
          100: '#f5ede0',
          200: '#e9d5b7',
          300: '#dbb786',
          400: '#ca9654',
          500: '#bc7d37',
          600: '#a8692c',
          700: '#8a5226',
          800: '#714325',
          900: '#5d3822',
        },
        moss: {
          50: '#f6f7f3',
          100: '#e9eee1',
          200: '#d4ddc5',
          300: '#b8c59f',
          400: '#9ca979',
          500: '#819159',
          600: '#667144',
          700: '#515837',
          800: '#42472f',
          900: '#373c29',
        },
        clay: {
          50: '#f8f6f4',
          100: '#ede8e3',
          200: '#ddd1c7',
          300: '#c6b4a3',
          400: '#b19a85',
          500: '#997f66',
          600: '#8a6f5a',
          700: '#735b4c',
          800: '#5e4c42',
          900: '#4e3f37',
        }
      },
      backgroundImage: {
        'gradient-earth': 'linear-gradient(135deg, #f5ede0 0%, #e9d5b7 100%)',
        'gradient-moss': 'linear-gradient(135deg, #e9eee1 0%, #d4ddc5 100%)',
        'gradient-clay': 'linear-gradient(135deg, #ede8e3 0%, #ddd1c7 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-gentle': 'bounce-gentle 2s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'bounce-gentle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        }
      }
    },
  },
  plugins: [],
}
