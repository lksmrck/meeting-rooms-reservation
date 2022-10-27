/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        fuzzy: "Fuzzy Bubbles ",
      },
      gridTemplateColumns: {
        //24 columns grid (pro časová pásma)
        24: "repeat(24, minmax(0, 1fr))",
      },
    },
  },
  plugins: [],
};
