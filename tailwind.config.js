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
      //Project color palette
      colors: {
        //blue-ish - from lightest to darkest
        th_blue_one: "#7DE5ED",
        th_blue_two: "#81C6E8",
        th_blue_three: "#5DA7DB",
        th_blue_four: "#5837D0",
      },
    },
  },
  plugins: [],
};
