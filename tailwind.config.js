/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-exa)"],
        serif: ["var(--font-tera)"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        background: "#f3f4f6",
        brown: "#BF7D56",
        darkYellow: "#D98E04",
        yellow: "#F2B705",
        darkBlue: "#023373",
        blue: "#2F3640",
        red: "#F20505",
        lightRed: "#F25749",
        beige: "#F2E8DF",
        pint: "#F20587",
        gray: "#E4EAF2",
        black: "#000D08",
        green: "#93A651",
        darkGreen: "#2C4001",
      },
    },
  },
  plugins: [],
};
