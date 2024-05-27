/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors:{
        threads:{
          "gray":"#0f0f0f",
          "gray-light":"#7a7a7a",
          "gray-dark":"#1e1e1e",
          "modal":"#414040",
        }
      }
    },
  },
  plugins: [],
};
