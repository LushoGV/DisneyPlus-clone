/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        home: "url('/src/media/images/background.png')",
        bottomCompanyPage: "linear-gradient(transparent 25%, transparent 50%, rgb(26, 29, 41) 75%, rgb(26, 29, 41) 100%)",
        nav: "linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.03) 15%, rgba(0, 0, 0, 0.125) 30%, rgba(0, 0, 0, 0.25) 46%, rgba(0, 0, 0, 0.4) 61%, rgba(0, 0, 0, 0.553) 75%, rgba(0, 0, 0, 0.694) 88%, rgba(0, 0, 0, 0.8))",
        movieBack: "radial-gradient(farthest-side at 73% 21%, transparent, rgb(26, 29, 41));"
      }),
      boxShadow: {
        disney: "rgb(0 0 0 / 69%) 0px 26px 30px -10px, rgb(0 0 0 / 73%) 0px 16px 10px -10px"
      },
      fontFamily:{
        'disney': ['Pacifico', 'cursive']
      }
    },
  },
  plugins: [],
}
