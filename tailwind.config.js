/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/views/**/*.ejs', './public/js/**/*.js'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1C1917',
          light: '#292524',
        },
        accent: {
          DEFAULT: '#A16207',
          light: '#CA8A04',
          dark: '#78350F',
        },
        surface: {
          DEFAULT: '#FAFAF9',
          card: '#FFFFFF',
          muted: '#E8ECF0',
        },
        ink: {
          DEFAULT: '#0C0A09',
          muted: '#64748B',
        },
        line: '#D6D3D1',
      },
      fontFamily: {
        display: ['"Cinzel"', 'serif'],
        body: ['"Josefin Sans"', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '0.25em',
      },
      maxWidth: {
        container: '1440px',
      },
      transitionDuration: {
        250: '250ms',
      },
    },
  },
  plugins: [],
};
