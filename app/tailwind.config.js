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
          DEFAULT: '#C9748D',
          light: '#DDA0B5',
          dark: '#A85573',
        },
        secondary: '#F5EDE3',
        accent: {
          DEFAULT: '#A78BCD',
          light: '#C4AEDE',
        },
        dark: '#2D2D2D',
        medium: '#7A7A7A',
        success: '#7BC67E',
        border: '#EDE0D4',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['"Inter"', 'sans-serif'],
        accent: ['"Dancing Script"', 'cursive'],
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-in': 'bounceIn 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97)',
        'fade-in': 'fadeIn 0.6s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        bounceIn: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '60%': { transform: 'scale(1.1)', opacity: '1' },
          '100%': { transform: 'scale(1)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #C9748D 0%, #A78BCD 100%)',
        'gradient-soft': 'linear-gradient(135deg, #F5EDE3 0%, #DDA0B5 100%)',
      },
    },
  },
  plugins: [],
}
