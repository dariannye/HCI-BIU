import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
//import Register from "../pages/Register";
//import Appointments from "../pages/Appointments";
//import PatientDashboard from "../pages/PatientDashboard";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/register" element={<Register />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/dashboard" element={<PatientDashboard />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
