/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      backgroundColor: {
        'D2D2D2': '#D2D2D2', // Add your custom color here
        '302E2E': '#302E2E'
      },
    },
  },
  plugins: [],
}

