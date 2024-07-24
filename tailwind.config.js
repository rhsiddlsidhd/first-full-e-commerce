module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      width: {
        desktop: "120rem",
        tablet: "64rem",
        ipad: "48rem",
        mobile: "34rem",
      },
      height: {
        test: "48rem",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
