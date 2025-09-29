import api from "./axiosClient";
import type { User } from "../types/user";
import type { AuthResponse } from "../types/auth";

export const login = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  const { data } = await api.post<AuthResponse>("/auth/login", { email, password });
  localStorage.setItem("token", data.token);
  return data;
};

export const register = async (user: User): Promise<User> => {
  const { data } = await api.post<User>("/auth/register", user);
  return data;
};
