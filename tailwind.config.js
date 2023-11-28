/** @type {import('tailwindcss').Config} */
const aspectRatio = require('@tailwindcss/aspect-ratio');

module.exports = {
  content: [ "./src/**/*.{html,ts}"],
  theme: {
    extend: {
      gridTemplateRows: {
        '[auto,auto,1fr]': 'auto auto 1fr',
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('flowbite/plugin')
  ],
}

