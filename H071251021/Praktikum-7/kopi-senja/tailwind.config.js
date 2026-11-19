/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        peach: {
          50: "#FFF7F0",
          100: "#FDEBDD",
          200: "#FBD9BE",
          300: "#F2BF98",
        },
        jeruk: "#F58C45",
        kopi: {
          600: "#9A5B33",
          700: "#7F4826",
          900: "#3A2417",
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
