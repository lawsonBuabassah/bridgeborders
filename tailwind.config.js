/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.ejs"],
  mode: "jit",
  theme: {
    extend: {
      screens: {
        sm: "480px",
        md: "768px",
        lg: "976px",
        xl: "1440px"
      },
      colors: {
        primaryColor: "hsl(175, 35%, 50%)",
        lighterColor: "hsl(175, 35%, 70%)",
        deeperColor: "hsl(175, 35%, 30%)"
      },
      fontFamily: {
        'times': ['Times New Roman', 'serif'],
      },
    },
  },
  plugins: [],
};
