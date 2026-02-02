import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        dark: '#0a0a0a',
        'dark-section': '#111111',
        'text-secondary': '#888888',
        'border-color': '#222222',
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        display: ['var(--font-bebas)'],
        serif: ['var(--font-playfair)'],
      },
    },
  },
  plugins: [],
}
export default config
