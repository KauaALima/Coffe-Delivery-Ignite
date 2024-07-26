/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Roboto', 'sans-serif'],
    },
    extend: {
      colors: {
        gray: {
          100: '#FAFAFA',
          200: '#F3F2F2',
          300: '#EDEDED',
          400: '#E6E5E5',
          500: '#D7D5D5',
          600: '#8D8686',
          700: '#574F4D',
          800: '#403937',
          900: '#272221',
        },
        purple: {
          100: '#EBE5F9',
          200: '#8047F8',
          300: '#4B2995',
        },
        yellow: {
          100: '#F1E9C9',
          200: '#DBAC2C',
          300: '#C47F17',
        },
      },
      gridTemplateColumns: {
        MainCard: '1fr 1fr 1fr 1fr',
        Check: '1fr 1fr',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
  darkMode: 'class',
}
