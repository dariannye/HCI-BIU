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
import PatientAppointments from "../pages/PatientAppointments";
import DoctorsAvailability from "../pages/DoctorAvailability";
<<<<<<< HEAD
import DoctorDashboard from "../pages/DoctorDashboard";
=======
import Profile from "../pages/Profile";
>>>>>>> a5e3a88703fdabd8e402fe7c5fb2fc31028b1521

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
        <Route path="/patient-appointments" element={<PatientAppointments />} />
        <Route path="/profile" element={<Profile />} />

        {/* Nueva ruta para administrador */}
        <Route path="/admin" element={<AdminDashboard />} /> 
        <Route path="/admin/doctors" element={<DoctorCRUD />} />
        <Route path="/admin/specialties" element={<SpecialtyCRUD />} />
        <Route path="/admin/doctor-availability" element={<DoctorsAvailability />} />

        {/* Ruta para el dashboard del doctor */}
        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />

      </Routes>
    </BrowserRouter>
  );
}
