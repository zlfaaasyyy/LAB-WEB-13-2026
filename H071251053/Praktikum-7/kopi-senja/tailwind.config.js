/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        krem: { DEFAULT: "#F8F0E1", tua: "#EFE3CC" },
        sage: { DEFAULT: "#A9BCA3", muda: "#DCE6D6", tua: "#7F9A7B" },
        hutan: { DEFAULT: "#4B6B50", gelap: "#2F4A36" },
        jingga: { DEFAULT: "#E8783A", gelap: "#D1632A" },
        tinta: "#2B2A24",
      },
      fontFamily: {
        sans: ["ui-rounded", "Nunito", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
