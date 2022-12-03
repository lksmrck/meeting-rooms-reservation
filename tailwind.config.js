/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        fuzzy: "Fuzzy Bubbles ",
      },
      margin: {
        0.25: "0.0625rem",
      },
      gridTemplateColumns: {
        //24 columns grid (pro časová pásma)
        24: "repeat(24, minmax(0, 1fr))",
      },
      height: {
        30: "7.5rem",
      },
      keyframes: {
        floatUp: {
          "0%, 100%": { transform: "translatey(0px)" },
          "50%": { transform: "translatey(-10px)" },
        },
        floatDown: {
          "0%, 100%": { transform: "translatey(0px)" },
          "50%": { transform: "translatey(10px)" },
        },
      },
      animation: {
        floatUp: "floatUp 5s ease-in-out infinite",
        floatDown: "floatDown 5s ease-in-out infinite",
      },
      backgroundImage: {
        stepsWaves: "url('/src/assets/stepsWaves.svg')",
        titleWaves: "url('/src/assets/titleWaves.svg')",
      },
      backgroundColor: {
        features: "#461c70",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
