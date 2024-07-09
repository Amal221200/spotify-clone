/** @type {import('tailwindcss').Config} */
import tailwindAnimate from "tailwindcss-animate"

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './index.html'],
  theme: {
    extend: {},
  },
  plugins: [tailwindAnimate],
}

