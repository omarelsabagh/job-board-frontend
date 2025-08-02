import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import { UserRole } from "@/app/(protected)/users/model";

export type UserTokenData = {
  sub: number;
  role: UserRole;
  fullname: string;
};

export async function getAccessToken() {
  const cookieStore = await cookies();

  const token = cookieStore.get("access_token")?.value;

  return token ?? null;
}

export async function getUserFromCookie(): Promise<UserTokenData | null> {
  const token = await getAccessToken();
  if (!token) return null;

  try {
    return jwtDecode<UserTokenData>(token);
  } catch {
    return null;
  }
}
