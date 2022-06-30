module.exports = {
  content: ["./public/**/*.html", "./src/**/*.vue"],
  theme: {
    extend: {
      animation: ["motion-safe"],
      colors: {
        secondary: "#1e1b1a",
        teriary: "#0c0c0e",
        green: "#2bebc8",
        purple: "#b54ea7",
        yellow: "#ecec88"
      },
    },
    fontFamily: {
      ptserif: ["PT Serif"],
      cinzel: ["Cinzel"],
      lato: ["Lato"],
      poppins: ["Poppins"],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
