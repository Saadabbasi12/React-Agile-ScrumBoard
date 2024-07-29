import "./index.css";
import { useState, useEffect } from "react";
import ScrumBoard from "./components/ScrumBoard";
import Header from "./components/Header";


function App() {
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    const localTheme = localStorage.getItem("theme");
    if (localTheme) {
      setDarkMode(localTheme === "dark");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div id="app">
      <div>
        <Header onToggleTheme={toggleTheme} />
        <ScrumBoard />
      </div>
    </div>
  );
}

export default App;
