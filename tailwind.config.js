module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/index.css",
  ],
  theme: {
    extend: {
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' }
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideDown: {
          '100%': { transform: 'translateY(100%)' },
          '0%': { transform: 'translateY(0%)' }
        },
      },
      animation: {
        slideUp: 'slideUp 0.6s ease-out',
        fadeIn: 'fadeIn 0.3s ease-out',
        slideDown: 'slideDown 0.6s ease-out',
      }
    }
  },
  plugins: [],
}