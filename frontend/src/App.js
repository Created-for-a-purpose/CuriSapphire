import React from 'react';
import "./styles/App.scss"
import { Routes, Route } from "react-router-dom"
import LandingPage from "./pages/LandingPage.jsx"
import Dashboard from "./pages/Dashboard.jsx"
import DashboardForm from './pages/DashboardForm';

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/:id" element={<DashboardForm />} />
      </Routes>
    </div>
  )
};
