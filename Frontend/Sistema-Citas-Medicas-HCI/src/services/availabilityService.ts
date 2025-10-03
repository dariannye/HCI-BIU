import api from "./axiosClient";
import type { Availability } from "../types/availability";

export const getDoctors = async (): Promise<Availability[]> => {
  const { data } = await api.get<Availability[]>("/availability");
  return data;
};