/**
 * Paleta Elevn — cyberpunk/futurista (azul + cyan, violet, magenta)
 */

import { createTheme, alpha } from "@mui/material/styles";

const elevnPalette = {
  primary: "#2563eb",
  electric: "#0ea5e9",
  cyan: "#06b6d4",
  violet: "#8b5cf6",
  magenta: "#d946ef",
  dark: "#0a0e1a",
  surface: "#151b2d",
  ice: "#e0f2fe",
} as const;

export const elevnTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: elevnPalette.primary,
      light: elevnPalette.electric,
      dark: elevnPalette.dark,
      contrastText: elevnPalette.ice,
    },
    secondary: {
      main: elevnPalette.cyan,
      light: elevnPalette.ice,
      dark: alpha(elevnPalette.dark, 0.9),
      contrastText: elevnPalette.dark,
    },
    background: {
      default: elevnPalette.dark,
      paper: elevnPalette.surface,
    },
    text: {
      primary: elevnPalette.ice,
      secondary: alpha(elevnPalette.ice, 0.8),
    },
  },
  typography: {
    fontFamily: '"Montserrat", system-ui, sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none" as const,
          borderRadius: 8,
        },
      },
    },
  },
});

export { elevnPalette };
