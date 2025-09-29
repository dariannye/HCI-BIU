export interface User {
  id?: number;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  role: "patient" | "doctor" | "admin";
  password?: string;
  created_at?: string;
}

