import axios from "@/lib/axios";
import { FormFields } from "./schema";

export const login = (data: FormFields) => {
  return axios.post("/auth/login", data);
};
