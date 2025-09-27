import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Analysis from "./pages/Analysis";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/analysis/:nodeId" element={<Analysis />} />
      </Routes>
    </Router>
  );
}

export default App;
