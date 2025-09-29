import api from "./axiosClient";
import type { Appointment } from "../types/appointment";

export const getAppointments = async (): Promise<Appointment[]> => {
  const { data } = await api.get<Appointment[]>("/appointments");
  return data;
};

export const createAppointment = async (appointment: Omit<Appointment, "id">) => {
  const { data } = await api.post("/appointments", appointment);
  return data;
};
