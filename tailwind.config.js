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
          500: "#9D7061",
        },
        secondary: {
          DEFAULT: "#FFF6EA",
         
        },
        third: {
          DEFAULT: "#1F2937",
         
        },

        // neutral: {
        //   DEFAULT: "#1F2937", 
        // },
        white: {
          DEFAULT: "#FFFFFF", 
        },

     
      },
    },
  },
  plugins: [],
};
