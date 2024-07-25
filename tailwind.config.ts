import type { Config } from "tailwindcss";
import { fontFamily, animation, keyframes } from "tailwindcss/defaultTheme";

const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/sanity/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      sans: ["var(--font-catamaran)", ...fontFamily.sans],
      serif: ["var(--font-tiempos)", ...fontFamily.serif],
    },
    fontSize: {
      "heading-lg": ["clamp(40px, 10vw, 50px)", { fontWeight: 500, letterSpacing: "-3px", lineHeight: "95%" }],
      "heading-sm": ["25px", { fontWeight: 500, letterSpacing: "-0.9px", lineHeight: "90%" }],
      label: ["clamp(17px, 3vw, 18px)", { fontWeight: 500, letterSpacing: "0.3px", lineHeight: "100%" }],
      paragraph: ["clamp(19px, 1.39vw, 20px)", { fontWeight: 300, letterSpacing: "0.72px", lineHeight: "145%" }],
    },
    colors: {
      transparent: "transparent",
      neutral: {
        100: {
          DEFAULT: "hsl(var(--neutral-100))",
          text: {
            DEFAULT: "hsl(var(--neutral-900))",
            muted: "hsl(var(--neutral-900) / 40%)",
          },
        },
        200: {
          DEFAULT: "hsl(var(--neutral-200))",
          text: {
            DEFAULT: "hsl(var(--neutral-900))",
            muted: "hsl(var(--neutral-900) / 40%)",
          },
        },
        300: {
          DEFAULT: "hsl(var(--neutral-300))",
          text: {
            DEFAULT: "hsl(var(--neutral-900))",
            muted: "hsl(var(--neutral-900) / 40%)",
          },
        },
        400: {
          DEFAULT: "hsl(var(--neutral-400))",
          text: {
            DEFAULT: "hsl(var(--neutral-900))",
            muted: "hsl(var(--neutral-900) / 40%)",
          },
        },
        500: {
          DEFAULT: "hsl(var(--neutral-500))",
          text: {
            DEFAULT: "hsl(var(--neutral-900))",
            muted: "hsl(var(--neutral-900) / 40%)",
          },
        },
        900: {
          DEFAULT: "hsl(var(--neutral-900))",
          text: {
            DEFAULT: "hsl(var(--neutral-100))",
            muted: "hsl(var(--neutral-100) / 40%)",
          },
        },
      },
      primary: {
        100: {
          DEFAULT: "hsl(var(--primary-100))",
          text: {
            DEFAULT: "hsl(var(--primary-900))",
            muted: "hsl(var(--primary-900) / 25%)",
          },
        },
        200: {
          DEFAULT: "hsl(var(--primary-200))",
          text: {
            DEFAULT: "hsl(var(--primary-900))",
            muted: "hsl(var(--primary-900) / 25%)",
          },
        },
        300: {
          DEFAULT: "hsl(var(--primary-300))",
          text: {
            DEFAULT: "hsl(var(--primary-900))",
            muted: "hsl(var(--primary-900) / 25%)",
          },
        },
        400: {
          DEFAULT: "hsl(var(--primary-400))",
          text: {
            DEFAULT: "hsl(var(--primary-900))",
            muted: "hsl(var(--primary-900) / 25%)",
          },
        },
        500: {
          DEFAULT: "hsl(var(--primary-500))",
          text: {
            DEFAULT: "hsl(var(--primary-900))",
            muted: "hsl(var(--primary-900) / 25%)",
          },
        },
        600: {
          DEFAULT: "hsl(var(--primary-600))",
          text: {
            DEFAULT: "hsl(var(--primary-100))",
            muted: "hsl(var(--primary-100) / 25%)",
          },
        },
        700: {
          DEFAULT: "hsl(var(--primary-700))",
          text: {
            DEFAULT: "hsl(var(--primary-100))",
            muted: "hsl(var(--primary-100) / 25%)",
          },
        },
        800: {
          DEFAULT: "hsl(var(--primary-800))",
          text: {
            DEFAULT: "hsl(var(--primary-100))",
            muted: "hsl(var(--primary-100) / 25%)",
          },
        },
        900: {
          DEFAULT: "hsl(var(--primary-900))",
          text: {
            DEFAULT: "hsl(var(--primary-100))",
            muted: "hsl(var(--primary-100) / 25%)",
          },
        },
      },
      themed: {
        // Possibly switch to 25% opacity for more of a pastelly look and stronger contrast
        primary: "hsl(var(--themed-primary) / <alpha-value>)",
        secondary: "hsl(var(--themed-secondary) / <alpha-value>)",
      },
    },
    animation: {
      enterFromRight: "enterFromRight 250ms ease",
      enterFromLeft: "enterFromLeft 250ms ease",
      exitToRight: "exitToRight 250ms ease",
      exitToLeft: "exitToLeft 250ms ease",
      expandDown: "revealDown 250ms ease",
      contractUp: "contractUp 250ms ease",
      spin: animation.spin,
    },
    keyframes: {
      enterFromRight: {
        from: { opacity: "0", transform: "translateX(200px)" },
        to: { opacity: "1", transform: "translateX(0)" },
      },
      enterFromLeft: {
        from: { opacity: "0", transform: "translateX(-200px)" },
        to: { opacity: "1", transform: "translateX(0)" },
      },
      exitToRight: {
        from: { opacity: "1", transform: "translateX(0)" },
        to: { opacity: "0", transform: "translateX(200px)" },
      },
      exitToLeft: {
        from: { opacity: "1", transform: "translateX(0)" },
        to: { opacity: "0", transform: "translateX(-200px)" },
      },
      expandDown: {
        from: { height: "0" },
        to: { hieght: "var(--radix-navigation-menu-viewport-height)" },
      },
      contractUp: {
        from: { hieght: "var(--radix-navigation-menu-viewport-height)" },
        to: { height: "0" },
      },
      spin: keyframes.spin,
    },
  },
  plugins: [],
} satisfies Config;

export default config;
