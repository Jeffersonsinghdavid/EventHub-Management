import React from "react";
import ProtectedRoute from "./components/ProtectedRoute";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" reverseOrder={false} />

      <Routes>
        {/* Login Page */}
        <Route path="/" element={<Login />} />

        {/* Events / Dashboard Page */}
<Route path="/dashboard" element={<ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
