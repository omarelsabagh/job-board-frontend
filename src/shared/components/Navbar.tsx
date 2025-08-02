"use client";

import { logout } from "@/app/(auth)/login/service";
import { UserRole } from "@/app/(protected)/users/model";
import { useRouter } from "next/navigation";

type Props = {
  fullname: string;
  role: UserRole;
};

export default function Navbar({ fullname, role }: Props) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <nav className="bg-white shadow flex justify-between items-center px-6 py-3 mb-6">
      <div className="font-bold text-xl">Job Board</div>
      <div className="flex gap-4 items-center">
        <span className="text-gray-600">
          {fullname} ({role})
        </span>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
