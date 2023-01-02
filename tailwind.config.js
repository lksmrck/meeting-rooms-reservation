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
      //Grid pro 24 půlhodinových bloků
      gridTemplateColumns: {
        24: "repeat(24, minmax(0, 1fr))",
      },
      height: {
        //Výška contentu = 100vh - výška navbaru
        content: "calc(100vh - 5rem)",
      },
      spacing: {
        0.25: "0.0625rem",
        30: "7.5rem",
        105: "26.25rem",
        110: "27.5rem",
        120: "30rem",
        130: "32.5rem",
        155: "38.75rem",
      },
      fontSize: {
        xxs: "10px",
      },

      keyframes: {
        floatUp: {
          "0%, 100%": { transform: "translatey(0px)" },
          "25%": { transform: "translatey(-10px)" },
          "75%": { transform: "translatey(10px)" },
        },
        floatDown: {
          "0%, 100%": { transform: "translatey(0px)" },
          "25%": { transform: "translatey(10px)" },
          "75%": { transform: "translatey(-10px)" },
        },

        bounceInRight: {
          "0%": { transform: "translatex(-100px)" },
          "50%": { transform: "translatex(10px)" },
          "70%": { transform: "translatex(0px)" },
          "90%": { transform: "translatex(10px)" },
          "100%": { transform: "translatex(0px)" },
        },
        buttonGlowing: {
          "20%, 100%": { backgroundColor: "#319795" },
          "40% 80%": { backgroundColor: "#2d8a88", scale: "1.02" },
          "60%": { backgroundColor: "#5b21b6", scale: "1.04" },
        },
        rocketBounce: {
          "20%, 60%": { transform: "rotate(5deg)" },
          "40%, 80%": { transform: "rotate(-5deg)" },
        },

        arrowColors: {
          "50%": {
            filter:
              "invert(0%) sepia(4%) saturate(19%) hue-rotate(217deg) brightness(94%) contrast(95%)",
          },
        },
      },
      animation: {
        floatUp: "floatUp 5s ease-in-out infinite",
        floatDown: "floatDown 5s ease-in-out infinite",
        bounceInRight: "bounceInRight 1s ease 1",
        buttonGlowing: "buttonGlowing 3s ease-in-out infinite",
        rocketBounce: "rocketBounce 0.5s ease-in-out infinite",
        arrowCollors: "arrowColors 1s infinite",
      },
      backgroundImage: {
        stepsWaves: "url('/src/assets/bgs/stepsWaves.svg')",
        titleWaves: "url('/src/assets/bgs/titleWaves.svg')",
        carouselWaves: "url('/src/assets/bgs/carouselWaves.svg')",
        contactUsWaves: "url('/src/assets/bgs/contactUsWaves.svg')",
        loginBg: "url('/src/assets/bgs/loginBg.svg')",
      },
      backgroundColor: {
        features: "#461c70",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
