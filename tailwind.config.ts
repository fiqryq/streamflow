import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'sans': ['Inter', 'system-ui', 'sans-serif']
      },
      colors: {
        'primary': '#0055FF',
        'secondary': '#0043CA',
        'dark': {
          '900': '#121212',
          '800': '#252525',
          '700': '#2D2D2D',
          '600': '#3D3D3D',
          '500': '#6E6E6E',
          '400': '#8F8F8F',
          '300': '#AFAFAF',
          '200': '#CFCFCF',
          '100': '#E5E5E5',
        },
        'gray': {
          '900': '#121212',
          '800': '#252525',
          '700': '#2D2D2D',
          '600': '#3D3D3D',
          '500': '#6E6E6E',
          '400': '#8F8F8F',
          '300': '#AFAFAF',
          '200': '#CFCFCF',
          '100': '#E5E5E5',
          '50': '#F5F5F5',
        }
      }
    },
  },
  plugins: [],
}
export default config
