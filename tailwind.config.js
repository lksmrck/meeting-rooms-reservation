/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        fuzzy: "Fuzzy Bubbles",
        outline: "Londrina Shadow",
        solid: "Londrina Solid",
      },
      /*   margin: {
        0.25: "0.0625rem",
      }, */
      gridTemplateColumns: {
        //24 columns grid (pro časová pásma)
        24: "repeat(24, minmax(0, 1fr))",
      },
      height: {
        /*     30: "7.5rem", */
        //Výška contentu = 100vh - výška navbaru
        content: "calc(100vh - 5rem)",
      },
      /* width: {
        105: "26.25rem",
      }, */
      spacing: {
        0.25: "0.0625rem",
        30: "7.5rem",
        105: "26.25rem",
        110: "27.5rem",
      },
      fontSize: {
        xxs: "10px",
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
        colorsSwitch: {
          "0%": {
            backgroundColor: "#36eb7e",
          },
          "25%": { backgroundColor: "#ba4ecf" },
          "50%": { backgroundColor: "#51092d" },
          "75%": { backgroundColor: "#0d004a" },
          "100%": { backgroundColor: "#dab915" },
        },
        bounceInRight: {
          "0%": { transform: "translatex(-100px)" },
          "50%": { transform: "translatex(10px)" },
          "70%": { transform: "translatex(0px)" },
          "90%": { transform: "translatex(10px)" },
          "100%": { transform: "translatex(0px)" },
        },
      },
      animation: {
        floatUp: "floatUp 5s ease-in-out infinite",
        floatDown: "floatDown 5s ease-in-out infinite",
        colorsSwitch: "colorsSwitch 5s alternate infinite",
        bounceInRight: "bounceInRight 1s ease 1",
      },
      backgroundImage: {
        stepsWaves: "url('/src/assets/stepsWaves.svg')",
        titleWaves: "url('/src/assets/titleWaves.svg')",
        carouselWaves: "url('/src/assets/carouselWaves.svg')",
        contactUsWaves: "url('/src/assets/contactUsWaves.svg')",
        loginBg: "url('/src/assets/loginBg.svg')",
      },
      backgroundColor: {
        features: "#461c70",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
