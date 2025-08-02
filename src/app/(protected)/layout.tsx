import { ReactNode } from "react";
import { getAccessToken } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function ProtectedLayout({
  children,
}: {
  children: ReactNode;
}) {
  const token = await getAccessToken();

  if (!token) {
    redirect("/login");
  }

  return <>{children}</>;
}
