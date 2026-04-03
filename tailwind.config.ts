import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: "class", // support dark theme with "class"

  content: [
    "./src/**/*.{ts,tsx}"
  ],

  theme: {
    extend: {
      colors: {
        // LIGHT THEME
        "bg-primary": "#ffffff",
        "bg-secondary": "#f5f5f5",
        "bg-tertiary": "#eaeaea",

        "text-primary": "#0a0a0a",
        "text-secondary": "#525252",

        "border-primary": "#e5e5e5",

        // BRAND COLOR
        brand: "#22c55e", 

        // DARK THEME (for usage with dark:)
        "dark-bg-primary": "#0b0b0b",
        "dark-bg-secondary": "#111111",
        "dark-bg-tertiary": "#171717",

        "dark-text-primary": "#fafafa",
        "dark-text-secondary": "#a3a3a3",

        "dark-border-primary": "#262626"
      }
    }
  }
}

export default config