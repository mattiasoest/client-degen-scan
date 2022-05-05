import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SocketProvider } from "../components/contexts/SocketProvider";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { NetworkProvider } from "../components/contexts/NetworkProvider";

const darkTheme = createTheme({
  palette: {
    // mode: "dark",

    text: {
      primary: "#0ffc03",
    },
    primary: {
      main: "#00FF00",
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={darkTheme}>
      <SocketProvider>
        <NetworkProvider>
          <Component {...pageProps} />
        </NetworkProvider>
      </SocketProvider>
    </ThemeProvider>
  );
}

export default MyApp;
