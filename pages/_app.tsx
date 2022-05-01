import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SocketProvider } from "../components/contexts/SocketProvider";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    text: {
      primary: "#00FF00",
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={darkTheme}>
      <SocketProvider>
        <Component {...pageProps} />
      </SocketProvider>
    </ThemeProvider>
  );
}

export default MyApp;
