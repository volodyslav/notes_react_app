/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary: '#F5F7F8',
        secondary: '#495E57',
        success: '#F4CE14',
        dark: "#45474B",
      }
    },
  },
  plugins: [],
}

