/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js", // Tambahkan baris ini
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("flowbite/plugin"), // Tambahkan baris ini
  ],
};
