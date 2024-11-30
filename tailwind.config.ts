import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },

        background: "var(--background)",

        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },

        mutated: "var(--mutated)",

        sour_gummy: "var(--font-family-geist-mono)",

        card: "var(--card)",

        border_color: "var(--border)",
      },

      fontFamily: {
        sour_gummy: "var(--sour-gummy)",
        baloo: "var(--baloo)",
      },

      borderRadius: {
        DEFAULT: "var(--radius)",
      },

      // fontFamily: {
      //   IBMPlex: ["var(--font-ibm-plex)"],
      // },
    },
  },
  plugins: [],
};
export default config;
