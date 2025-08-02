export enum UserRole {
  ADMIN = "ADMIN",
  JOBSEEKER = "JOBSEEKER",
}

export type User = {
  id: number;
  fullname: string;
  email: string;
  role: UserRole;
};
