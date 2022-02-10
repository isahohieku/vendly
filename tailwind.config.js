module.exports = {
  content: [
    './src/pages/**/*.tsx',
    './src/components/atoms/**/*.tsx',
    './src/components/molecules/**/*.tsx',
    './src/components/organisms/**/*.tsx',
    './src/components/templates/**/*.tsx',
    './src/hoc/**/*.tsx'
  ],
  theme: {
    extend: {
      colors: {
        success: {
          DEFAULT: '#82ECD3',
          '50': '#FFFFFF',
          '100': '#FFFFFF',
          '200': '#ECFCF8',
          '300': '#C9F7EC',
          '400': '#A5F1DF',
          '500': '#82ECD3',
          '600': '#51E5C2',
          '700': '#21DCB0',
          '800': '#1AAC89',
          '900': '#137B62'
        },
        primary: {
          DEFAULT: '#006E72',
          '50': '#2BF8FF',
          '100': '#16F7FF',
          '200': '#00E4EC',
          '300': '#00BDC4',
          '400': '#00959B',
          '500': '#006E72',
          '600': '#00383A',
          '700': '#000202',
          '800': '#000000',
          '900': '#000000'
        },
        scroll: '#17E7B3'
      },
      boxShadow: {
        '4xl': '3px 5px 39px -3px rgba(226, 226, 226, 0.59)',
        '5xl': '0px 5px 30px -3px rgba(0, 0, 0, 0.6)'
      },
      screens: {
        '1xl': '1440px',
        '3xl': '1792px',
      }
    },

    fontFamily: {
      sans: ['Axiforma', 'sans-serif'],
    },
    fontWeight: {
      hairline: 100,
      'extra-light': 100,
      thin: 200,
      light: 300,
      normal: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      'extra-bold': 800,
      black: 900,
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1.4rem',
        sm: '1.4rem',
        md: '1.4rem',
        lg: '1.4rem',
        xl: '1.4rem',
        '1xl': '1.4rem',
        '2xl': '1.4rem',
        '3xl': '1.4rem',
      },
    },

  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
  variants: {
    scrollbar: ['rounded']
}
};

