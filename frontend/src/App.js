import React from "react";
import Dashboard from "./components/Dashboard/Dashboard";
import Register from "./components/Auth/Register/Register";
import Login from "./components/Auth/Login/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

/**
 * Main component representing the application.
 * @returns {JSX.Element} - Returns JSX for the application.
 */
function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* Route for the login page */}
          <Route path="/login" element={<Login />} />

          {/* Route for the registration page */}
          <Route path="/register" element={<Register />} />

          {/* Default route for the dashboard */}
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
