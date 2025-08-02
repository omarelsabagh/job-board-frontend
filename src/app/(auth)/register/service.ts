import axios from "@/lib/axios";
import { FormFields } from "./schema";

export const register = (data: FormFields) => {
  return axios.post("/users/register", data);
};
