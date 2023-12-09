// color design tokens export
export const colorTokens = {
  grey: {
    // Nature-inspired neutral tones with a personalization twist
    0: "#FFFFFF", // Pure white remains constant
    10: "#F4F4ED", // Off-white inspired by natural linens
    50: "#E8E8D0", // Light beige, reminiscent of sand
    100: "#D1D1B2", // Warm grey, evoking dried herbs
    200: "#B3B38C", // Muted olive
    300: "#8E8E66", // Sage green for a touch of nature
    400: "#6A6A4A", // Earthy brown-grey, like wet bark
    500: "#555546", // Darker tone of the forest floor
    600: "#3F3F32", // Deep moss green
    700: "#292921", // Rich soil brown
    800: "#141412", // Almost black, like the deep woods at night
    900: "#0A0A06", // The darkest shade before pure black
    1000: "#000000", // Pure black remains constant
  },
  primary: {
    // Bold and bright colors for dark mode and accentuation
    50: "#E3F9FD", // Light sky blue, calming and fresh
    100: "#C2EFFB", // Clear day blue
    200: "#80DFF7", // Vibrant cyan for a pop of color
    300: "#3ED0F3", // Bright blue with a hint of green
    400: "#00C0EF", // Electric blue, striking and contemporary
    500: "#00A0BC", // Classic blue, Pantone-inspired
    600: "#007D99", // Deep ocean blue for dark mode depth
    700: "#005766", // Dark teal, sophisticated and versatile
    800: "#003440", // Almost black blue, like the depths of the sea
    900: "#001B22", // The darkest of blue before black
  },
};

// mui theme settings
export const themeSettings = (mode) => {
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
          // palette values for dark mode
          primary: {
            dark: colorTokens.primary[200],
            main: colorTokens.primary[500],
            light: colorTokens.primary[800],
          },
          neutral: {
            dark: colorTokens.grey[100],
            main: colorTokens.grey[200],
            mediumMain: colorTokens.grey[300],
            medium: colorTokens.grey[400],
            light: colorTokens.grey[700],
          },
          background: {
            default: colorTokens.grey[900],
            alt: colorTokens.grey[800],
          },
        }
        : {
          // palette values for light mode
          primary: {
            dark: colorTokens.primary[700],
            main: colorTokens.primary[500],
            light: colorTokens.primary[50],
          },
          neutral: {
            dark: colorTokens.grey[700],
            main: colorTokens.grey[500],
            mediumMain: colorTokens.grey[400],
            medium: colorTokens.grey[300],
            light: colorTokens.grey[50],
          },
          background: {
            default: colorTokens.grey[10],
            alt: colorTokens.grey[0],
          },
        }),
    },
    typography: {
      fontFamily: ["Rubik", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};
