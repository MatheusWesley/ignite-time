import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./styles/themes/default";
import { GlobalStyle } from "./styles/global";
import { Router } from "./Router";
import { HashRouter } from "react-router-dom";
import { CyclesContextProvider } from "./contexts/CyclesContext";
import { ToastContainer } from "react-toastify";

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <HashRouter>
        <CyclesContextProvider>
          <Router />
        </CyclesContextProvider>
        <GlobalStyle />
        <ToastContainer />
      </HashRouter>
    </ThemeProvider>
  )
}

