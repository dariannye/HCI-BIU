import api from "./axiosClient";
import type { Doctor } from "../types/doctor";

export const getDoctors = async (): Promise<Doctor[]> => {
  const { data } = await api.get<Doctor[]>("/doctors");
  return data;
};
