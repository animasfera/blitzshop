/** @type {import('tailwindcss').Config} */
// tailwind.config.js

module.exports = {
  content: ["./{src,app,pages}/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    fontFamily: {
      body: [
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
