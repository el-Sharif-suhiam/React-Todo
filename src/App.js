//import logo from "./logo.svg";
import "./App.css";
import Main from "./components/Main";
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: ["Alxandria"],
  },
  palette: {
    primary: {
      main: "#00695c",
    },
    secondary: {
      main: "#d32f2f",
    },
    card: {
      main: "#01579b",
    },
  },
});
function App() {
  return (
    <div
      style={{
        backgroundColor: "#263238",
        height: "100vh",
        //paddingTop: "200px",
        position: "relative",
      }}
    >
      <ThemeProvider theme={theme}>
        <Main />
      </ThemeProvider>
    </div>
  );
}

export default App;
