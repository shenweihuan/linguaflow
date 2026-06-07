/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0A1628',
          light: '#1A2744',
          dark: '#050D18',
        },
        accent: {
          DEFAULT: '#FF6B35',
          light: '#FF8555',
          dark: '#E55525',
        },
        success: {
          DEFAULT: '#00D9C0',
          light: '#33E4CF',
          dark: '#00B89E',
        },
      },
      fontFamily: {
        heading: ['Outfit', 'sans-serif'],
        body: ['Inter', 'Noto Sans SC', 'Noto Sans JP', 'Noto Sans KR', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
