import logo from './logo.svg';
import './App.css';
import LandingPage from "./Components/LandingPage";
import RecordContainer from "./Containers/RecordContainer"
import theme from "./theme"
import CssBaseline from "@material-ui/core/CssBaseline"
import { makeStyles, createMuiTheme, ThemeProvider } from "@material-ui/core/styles"

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
    <div className="App">
      <LandingPage />

      <RecordContainer />

    </div>
    </ThemeProvider>
  );
}

export default App;
