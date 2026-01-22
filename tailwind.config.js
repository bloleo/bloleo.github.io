const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        display: ['Oswald', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
}
