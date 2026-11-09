/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        senja: {
          malam: '#1F2A44',
          langit: '#F1EFF6',
          api: '#F2A541',
          bara: '#B4531F',
          tinta: '#1B1B2F',
        },
      },
      fontFamily: {
        sans: ['"Bricolage Grotesque"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
