import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./styles/themes/default";
import { GlobalStyle } from "./styles/global";
import { Router } from "./Router";
import { BrowserRouter } from "react-router-dom";
import { CyclesContextProvider } from "./contexts/CyclesContext";
import { ToastContainer } from "react-toastify";

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <CyclesContextProvider>
          <Router />
        </CyclesContextProvider>
        <GlobalStyle />
        <ToastContainer />
      </BrowserRouter>
    </ThemeProvider>
  )
}

