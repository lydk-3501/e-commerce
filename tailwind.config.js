module.exports = {
  content: [ 
    './src/**/*.html',
    './src/**/*.{js,jsx,ts,tsx}' 
  ],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'search-icon': 'rgb(226, 164, 0)',
      },
      fontFamily: {
        'hind': 'Hind, sans-serif',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
