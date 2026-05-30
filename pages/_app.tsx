import "../styles/globals.css";
import type { AppProps } from "next/app";
import CssBaseline from "@mui/material/CssBaseline";
import { SocketProvider } from "../components/contexts/SocketProvider";
import { ThemeProvider, createTheme, alpha } from "@mui/material/styles";
import { NetworkProvider } from "../components/contexts/NetworkProvider";

const MATRIX = {
  bg: "#03070a",
  surface: "#070d0a",
  green: "#00ff41",
  greenDim: "#0bd14a",
  greenSoft: "#7dffa0",
  grey: "#0e1512",
  text: "#aeffc0",
  muted: "#5f8f70",
};

const mono = '"Share Tech Mono", "JetBrains Mono", ui-monospace, monospace';

const matrixTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: MATRIX.bg,
      paper: MATRIX.surface,
    },
    text: {
      primary: MATRIX.text,
      secondary: MATRIX.muted,
    },
    primary: {
      main: MATRIX.green,
      light: MATRIX.greenSoft,
      dark: MATRIX.greenDim,
      contrastText: "#001b06",
    },
    divider: alpha(MATRIX.green, 0.14),
  },
  shape: { borderRadius: 10 },
  typography: {
    fontFamily: mono,
    h6: { letterSpacing: "0.18em", fontWeight: 700 },
    subtitle2: { letterSpacing: "0.08em" },
    body2: { letterSpacing: "0.02em" },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "::selection": {
          background: alpha(MATRIX.green, 0.3),
          color: MATRIX.greenSoft,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: alpha(MATRIX.bg, 0.7),
          backgroundImage: "none",
          backdropFilter: "blur(10px)",
          borderBottom: `1px solid ${alpha(MATRIX.green, 0.22)}`,
          boxShadow: `0 1px 0 ${alpha(MATRIX.green, 0.15)}, 0 8px 30px rgba(0,0,0,0.6)`,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          color: MATRIX.muted,
          border: `1px solid ${alpha(MATRIX.green, 0.2)}`,
          textTransform: "none",
          transition: "all 160ms ease",
          "&:hover": {
            backgroundColor: alpha(MATRIX.green, 0.08),
            borderColor: alpha(MATRIX.green, 0.4),
          },
          "&.Mui-selected": {
            color: MATRIX.green,
            backgroundColor: alpha(MATRIX.green, 0.12),
            borderColor: alpha(MATRIX.green, 0.5),
            boxShadow: `inset 0 0 12px ${alpha(MATRIX.green, 0.18)}`,
            "&:hover": {
              backgroundColor: alpha(MATRIX.green, 0.18),
            },
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: `1px solid ${alpha(MATRIX.green, 0.08)}`,
          fontFamily: mono,
        },
        head: {
          color: MATRIX.greenSoft,
          backgroundColor: alpha(MATRIX.bg, 0.92),
          backdropFilter: "blur(6px)",
          textTransform: "uppercase",
          letterSpacing: "0.16em",
          fontSize: "0.72rem",
          borderBottom: `1px solid ${alpha(MATRIX.green, 0.3)}`,
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        hover: {
          "&:hover": {
            backgroundColor: `${alpha(MATRIX.green, 0.06)} !important`,
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: MATRIX.green,
          textDecorationColor: alpha(MATRIX.green, 0.4),
          transition: "color 140ms ease, text-shadow 140ms ease",
          "&:hover": {
            color: MATRIX.greenSoft,
            textShadow: `0 0 8px ${alpha(MATRIX.green, 0.7)}`,
          },
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: alpha(MATRIX.bg, 0.96),
          border: `1px solid ${alpha(MATRIX.green, 0.25)}`,
          backdropFilter: "blur(10px)",
        },
      },
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={matrixTheme}>
      <CssBaseline />
      <SocketProvider>
        <NetworkProvider>
          <Component {...pageProps} />
        </NetworkProvider>
      </SocketProvider>
    </ThemeProvider>
  );
}

export default MyApp;
