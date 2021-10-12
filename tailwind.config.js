module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors:{
        primary: {
          '100': '#FFF5E6',
          '200': '#C1B7A8'
        } 
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
