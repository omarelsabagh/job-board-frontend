export enum JobStatus {
  OPEN,
  CLOSED,
}

export type Job = {
  id: string;
  title: string;
  description: string;
  location: string;
  salary: number;
  status: JobStatus;
  createdByUser?: {
    id: number;
    fullname: string;
    email: string;
  };
};
