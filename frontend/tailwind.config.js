/** @type {import('tailwindcss').Config} */
export default { // Changed from module.exports
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          900: '#0D1B2A',
        },
        accent: '#00F5D4',
        secondary: '#A9B4C2',
        success: '#2ECC71',
        error: '#E74C3C',
        disabled: '#5A6470',
        surface: '#1F2A37',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};