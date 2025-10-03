import api from "./axiosClient";
import type { Appointment } from "../types/appointment";

// Obtener todas las citas
export const getAppointments = async (): Promise<Appointment[]> => {
  const { data } = await api.get<Appointment[]>("/appointments"); 
  return data;
};

// Crear una cita
export const createAppointment = async (
  appointment: Omit<Appointment, "id">
): Promise<Appointment> => {
  const { data } = await api.post<Appointment>("/appointments", appointment); 
  return data;
};
