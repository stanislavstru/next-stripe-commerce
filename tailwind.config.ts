import type { Config } from "tailwindcss";
// import defaultConfig from 'tailwindcss/defaultConfig'

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      primary: "#718096",
      secondary: "#cb80b5",
      third: "#cbd5e0",
      danger: "#ff0000",
      warning: "#d8ad47",
      success: "#2ECC71",
      info: "#0078a6",
      black: "#000000",
      white: "#ffffff",
      dark: "#1a202c",
      gray: {
        100: "#f7fafc",
        200: "#edf2f7",
        300: "#e2e8f0",
        400: "#cbd5e0",
        500: "#a0aec0",
        600: "#718096",
        700: "#4a5568",
        800: "#2d3748",
        900: "#1a202c",
      },
    },
  },
  plugins: [],
  prefix: "wco-",
};
export default config;
