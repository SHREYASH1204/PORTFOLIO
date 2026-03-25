import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        "secondary": "#ffea00",
        "on-surface-variant": "#c7c4d8",
        "surface-container-lowest": "#060e20",
        "error-container": "#93000a",
        "outline": "#918fa1",
        "on-tertiary-fixed": "#001a42",
        "primary-fixed-dim": "#00eeff",
        "surface-container-high": "#222a3d",
        "on-secondary": "#3c0091",
        "surface": "#0b1326",
        "primary": "#00eeff",
        "inverse-primary": "#0066cc",
        "inverse-on-surface": "#283044",
        "tertiary-fixed-dim": "#ff007f",
        "outline-variant": "#464555",
        "on-tertiary": "#002e6a",
        "surface-container-highest": "#2d3449",
        "surface-dim": "#0b1326",
        "inverse-surface": "#dae2fd",
        "tertiary-fixed": "#ff007f",
        "on-error": "#690005",
        "surface-container-low": "#131b2e",
        "on-primary": "#001a42",
        "on-tertiary-fixed-variant": "#004395",
        "on-secondary-fixed-variant": "#5516be",
        "on-primary-fixed": "#07006c",
        "secondary-container": "#886600",
        "background": "#0b1326",
        "on-primary-fixed-variant": "#2f2ebe",
        "on-tertiary-container": "#cedbff",
        "surface-container": "#171f33",
        "primary-container": "#004b66",
        "surface-bright": "#31394d",
        "on-secondary-container": "#c4abff",
        "on-secondary-fixed": "#23005c",
        "on-background": "#dae2fd",
        "error": "#ffb4ab",
        "on-primary-container": "#d9d8ff",
        "surface-tint": "#00eeff",
        "tertiary-container": "#005cc6",
        "primary-fixed": "#e1e0ff",
        "secondary-fixed-dim": "#ffea00",
        "on-surface": "#dae2fd",
        "on-error-container": "#ffdad6",
        "tertiary": "#ff007f",
        "surface-variant": "#2d3449",
        "secondary-fixed": "#ffea00"
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        'lg': '0.5rem',
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      backgroundImage: {
        'neural-mesh': "radial-gradient(circle at 2px 2px, rgba(0, 238, 255, 0.05) 1px, transparent 0)",
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}

export default config
