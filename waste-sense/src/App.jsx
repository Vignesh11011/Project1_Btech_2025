import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Analysis from "./pages/Analysis";
import AuthPage from "./pages/AuthPage";
import ProtectedRoute from "./Components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/analysis/:nodeId"
          element={
            <ProtectedRoute>
              <Analysis />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
