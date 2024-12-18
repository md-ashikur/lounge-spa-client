/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#6E4F45",
          100: "#D38B79",
          500: "#6D4F45",
        },
        secondary: {
          DEFAULT: "#FFF6EA",
         
        },
        third: {
          DEFAULT: "#30313D",
         
        },

        neutral: {
          DEFAULT: "#FF3B22",
         
        },
     
      },
    },
  },
  plugins: [],
};
