import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import OneboxPage from "./pages/OneboxPage";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? "dark" : ""}>
      <Router>
        <div className="flex justify-between items-center p-4 bg-gray-200 dark:bg-gray-800">
          <h1 className="text-2xl font-bold">ReachInbox</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 bg-gray-800 dark:bg-gray-200 text-white dark:text-black rounded transition-colors"
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
        <div className="p-4">
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/onebox" element={<OneboxPage />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
