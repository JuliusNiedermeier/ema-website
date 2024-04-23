import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      sans: ["Catamaran", ...fontFamily.sans],
      serif: ["Tiempos", ...fontFamily.serif],
    },
    fontSize: {
      "heading-lg": [
        "clamp(40px, 10vw, 50px)",
        { fontWeight: 500, letterSpacing: "-3px", lineHeight: "95%" },
      ],
      "heading-sm": [
        "25px",
        { fontWeight: 500, letterSpacing: "-0.9px", lineHeight: "90%" },
      ],
      label: [
        "clamp(17px, 3vw, 18px)",
        { fontWeight: 500, letterSpacing: "0.3px", lineHeight: "100%" },
      ],
      paragraph: [
        "clamp(18px, 1.39vw, 20px)",
        { fontWeight: 300, letterSpacing: "0.72px", lineHeight: "145%" },
      ],
    },
  },
  plugins: [],
};
export default config;
