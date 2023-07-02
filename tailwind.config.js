/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './public/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif']
      },
      fontWeight: {
        "small": "300",
        "big": "500"
      },
      colors: {
        w: '#FAFAFA',
        b: '#D0D5DD',
        gray0: '#344054',
        gray1: '#D0D5DD',
        primary: '#6938EF',
        inactive: '#A0A0AB',
        b2: '#9B8AFB'
      }
    },
  },
  plugins: [],
}
