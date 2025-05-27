import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import DoctorDashboard from "./components/DoctorDashboard";
import TVScreen from "./components/TVScreen";

function App() {
  return (
    <Router>
      <nav style={{ padding: "1rem", backgroundColor: "#eee" }}>
        <Link to="/" style={{ marginRight: "1rem" }}>
          Dashboard
        </Link>
        <Link to="/tv">TV Display</Link>
      </nav>
      <Routes>
        <Route path="/" element={<DoctorDashboard />} />
        <Route path="/tv/:department" element={<TVScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
