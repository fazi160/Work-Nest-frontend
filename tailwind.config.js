/** @type {import('tailwindcss').Config} */
// import './src/assets/premium_background.jpg'
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
      backgroundImage:{
        'bg_image': "url('./src/assets/premium_background.jpg')",
      },
    },
  },
  plugins: [],
}

