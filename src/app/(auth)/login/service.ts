import axios from "@/lib/axios";
import { FormFields } from "./schema";

export const login = (data: FormFields) => {
  return axios.post("/auth/login", data);
};

export const logout = () => {
  return axios.post("/auth/logout");
};
