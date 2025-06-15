import { ThemeProvider } from "./context/ThemeContext";
import GitHub from "./pages/gitHub";

function App() {
  return (
    <ThemeProvider>
      <GitHub />
    </ThemeProvider>
  );
}

export default App;
