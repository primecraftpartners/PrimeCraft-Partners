import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0e0e0d",
        charcoal: "#24211f",
        leather: "#8a5a33",
        saddle: "#b47a43",
        parchment: "#f5f1eb",
        brass: "#c9953c"
      },
      boxShadow: {
        soft: "0 18px 50px rgba(14, 14, 13, 0.12)"
      }
    }
  },
  plugins: []
};

export default config;
