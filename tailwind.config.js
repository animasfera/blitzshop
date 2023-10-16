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
    screens: {
      // breakpoints:
      xs: { max: "460px" }, // => @media (max-width: 459px) { ... }
      sm: "460px", // => @media (min-width: 460px) { ... }
      md: "640px", // => @media (min-width: 640px) { ... }
      lg: "768px", // => @media (min-width: 768px) { ... }
      xl: "1024px", // => @media (min-width: 1024px) { ... }
      xxl: "1280px", // => @media (min-width: 1280px) { ... }
      xxxl: "1536px", // => @media (min-width: 1536px) { ... }
    },
  },
  plugins: [],
}
