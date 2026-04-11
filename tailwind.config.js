/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'turma-yellow': '#FFB700',
        'turma-green': '#1E7E34',
      },
    },
  },
  plugins: [],
}
