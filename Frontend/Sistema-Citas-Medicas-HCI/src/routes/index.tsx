import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Appointments from "../pages/Appointments";
import Services from "../pages/Services";
import Dashboard from "../pages/PatientDashboard";
import Directory from "../pages/DoctorDirectory";
import AdminDashboard from "../pages/AdminDashboard";
import DoctorCRUD from "../pages/DoctorsCRUD";
import SpecialtyCRUD from "../pages/SpecialtiesCRUD";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/services" element={<Services />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/doctor-directory" element={<Directory />} />

        {/* Nueva ruta para administrador */}
        <Route path="/admin" element={<AdminDashboard />} /> 
        <Route path="/admin/doctors" element={<DoctorCRUD />} />
        <Route path="/admin/specialties" element={<SpecialtyCRUD />} />

      </Routes>
    </BrowserRouter>
  );
}
