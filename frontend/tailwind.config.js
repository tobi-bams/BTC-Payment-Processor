module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: {
      padding: "2rem"
    },
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    fontFamily: {
      sans: ['DM Sans', 'sans-serif'],
      serif: ['DM Sans', 'sans-serif'],
      display: ['DM Sans', 'sans-serif'],
      body: ['DM Sans', 'sans-serif'],
    },
    fontSize: {
      xs: ".75rem",
      sm: ".875rem",
      tiny: ".875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "4rem",
      "7xl": "5rem",
      "8xl": "6rem",
      "9xl": "7rem",
      "10xl": "8rem"
    },
    extend: {
      spacing: {
        "72": "18rem",
        "84": "21rem",
        "96": "24rem"
      },
      maxWidth: {
        "1/4": "25%",
        "1/2": "50%",
        "3/4": "75%",
        "9/10": "90%"
      },
      translate: {
        double: "200%",
        triple: "300%",
        quad: "400%"
      },
      height: {
        "2px": "2px"
      },
      inset: {
        "24": "5rem", // not for real
        "1/2": "50%",
        full: "100%"
      },
      transitionProperty: {
        width: "width"
      },
      colors: {
        primary: '#4564BE',
        secondary: '#59ACCC',
        tertiary: '#252746',
        dark: '#252746'
      },
      textColor: {
        primary: '#4564BE',
        secondary: '#59ACCC',
        tertiary: '#252746',
        dark: '#252746'
      },
      borderColor: {
        primary: '#4564BE',
        secondary: '#59ACCC',
        tertiary: '#252746',
      }
    }
  },
  variants: {
    borderWidth: ["responsive", "last", "hover", "focus"],
    boxShadow: {
      xs: "0 0 0 1px rgba(0, 0, 0, 0.05)",
      sm: "0 1px 2px rgba(3,49,86,0.2)",
      md: "0 3px 9px rgba(0,0,0,.5)",
      lg: "0 5px 15px rgba(0,0,0,.5)",
      xl: "0 10px 20px rgba(0,0,0,.5)",
      "2xl": "0 20px 66px 0 rgba(34,48,73,.2)",
      inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
      outline: "0 0 0 3px rgba(66, 153, 225, 0.5)",
      none: "none"
    },
    backgroundColor: ["responsive", "hover", "focus", "checked", "even"],
    margin: ["responsive", "group-hover", "last"]
  },
  plugins: [],
}