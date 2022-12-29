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
        logoColors: {
          "0%, 100%": {
            filter:
              "invert(0%) sepia(76%) saturate(7491%) hue-rotate(306deg) brightness(106%) contrast(101%)",
          },
          "20%": {
            filter:
              "invert(62%) sepia(45%) saturate(6354%) hue-rotate(250deg) brightness(81%) contrast(100%)",
          },
          "40%": {
            filter:
              "invert(11%) sepia(42%) saturate(3427%) hue-rotate(305deg) brightness(89%) contrast(105%)",
          },
          "60%": {
            filter:
              "invert(4%) sepia(94%) saturate(6288%) hue-rotate(258deg) brightness(92%) contrast(116%)",
          },
          "80%": {
            filter:
              "invert(69%) sepia(83%) saturate(463%) hue-rotate(4deg) brightness(93%) contrast(94%)",
          },
        },
      },
      animation: {
        floatUp: "floatUp 5s ease-in-out infinite",
        floatDown: "floatDown 5s ease-in-out infinite",
        bounceInRight: "bounceInRight 1s ease 1",
        buttonGlowing: "buttonGlowing 3s ease-in-out infinite",
        rocketBounce: "rocketBounce 0.5s ease-in-out infinite",
        logoColors: "logoColors 5s linear infinite",
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
