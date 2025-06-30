import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,js,jsx}",
    "./components/**/*.{ts,tsx,js,jsx}",
    "./styles/**/*.{css,scss}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
