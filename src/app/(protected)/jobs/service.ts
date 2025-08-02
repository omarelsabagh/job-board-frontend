import axios from "@/lib/axios";
import { Job } from "./model";
import { PaginatedResponse } from "@/shared/types/paginated-response";

export const getAllJobs = async ({
  page = 1,
  location = null,
  status = null,
}: {
  page: number;
  location?: string | null;
  status?: string | null;
}) => {
  try {
    const { data } = await axios.get<PaginatedResponse<Job>>("jobs", {
      params: { page, location, status },
    });

    return data;
  } catch (error) {
    throw error;
  }
};

export const getJobById = async (id: string) => {
  try {
    const { data } = await axios.get<Job>(`jobs/${id}`);
    return data;
  } catch (error) {
    throw error;
  }
};
