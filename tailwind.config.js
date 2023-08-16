/** @type {import('tailwindcss').Config} */
// tailwind.config.js

/*
Inter var, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
"Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif,
"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"

font-family: 'Inter', sans-serif;
font-family: 'Roboto', sans-serif;
font-family: 'Helvetica Neue', sans-serif;
*/

module.exports = {
  content: ["./{src,app,pages}/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    /*
    extend: {
      fontFamily: {
        inter:
      }
    },
    */
    fontFamily: {
      body: ["'Inter'", "'Roboto'"],
      sans: [
        "'Inter'",
        "'Roboto'",
        "sans-serif",
        "ui-sans-serif",
        "system-ui",
        "-apple-system",
        "Noto Sans",
        "'Arial'",
        "Segoe UI",
        "Apple Color Emoji",
        "Segoe UI Emoji",
        "Segoe UI Symbol",
        "Noto Color Emoji",
      ],
    },
  },
  plugins: [],
}
