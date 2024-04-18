module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'custom-light': '#ffffff',
        'custom-dark': '#121212',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
