import { ReactNode } from "react";
import { getUserFromCookie } from "@/lib/auth";
import { redirect } from "next/navigation";
import Navbar from "@/shared/components/Navbar";
import Sidebar from "@/shared/components/Sidebar";

export default async function ProtectedLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await getUserFromCookie();

  if (!user) {
    redirect("/login");
  }

  return (
    <>
      <div className="flex min-h-screen flex-col">
        <Navbar fullname={user.fullname} role={user.role} />
        <div className="flex flex-1">
          <Sidebar role={user.role} />
          <main className="flex-1 p-4">{children}</main>
        </div>
      </div>
    </>
  );
}
