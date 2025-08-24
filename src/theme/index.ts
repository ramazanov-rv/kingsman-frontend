import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#1e244a",
    },
    secondary: {
      main: "#dad6d1",
      dark: "#000",
    },
    background: {
      default: "#ffffff",
    },
    text: {
      primary: "#fff",
      secondary: "#dad6d1",
    },
  },
  typography: {
    fontFamily: '"Montserrat", sans-serif',
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          color: "#fff",
        },
      },
    },
    MuiButton: {
      defaultProps: {
        variant: "contained",
      },
      styleOverrides: {
        root: {
          backgroundColor: "#1e244a",
          minHeight: "50px",
          width: "100%",
          // maxWidth: "400px !important",
          borderRadius: "6px",
          fontWeight: '500',
          color: "#fff",
          textTransform: "none",
          fontFamily: '"Montserrat", sans-serif',
          boxShadow: "none",
          "&:hover": {
            boxShadow: "none",
          }
        },
      },
    },
  },
});
