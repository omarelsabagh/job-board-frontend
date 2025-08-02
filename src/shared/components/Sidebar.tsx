"use client";

import { UserRole } from "@/app/(protected)/users/model";
import { cn } from "@/lib/class-merge";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  role: UserRole;
};

const linksByRole = {
  JOBSEEKER: [
    { href: "/jobs", label: "Browse Jobs" },
    { href: "/applications", label: "My Applications" },
  ],
  ADMIN: [
    { href: "/jobs", label: "My Jobs" },
    { href: "/admin/jobseekers", label: "Jobseekers List" },
  ],
};

export default function Sidebar({ role }: Props) {
  const pathname = usePathname();
  const links = linksByRole[role] ?? [];

  return (
    <aside className="w-64 bg-white border-r shadow-md p-4 hidden md:block">
      <nav className="space-y-2">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "block px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-blue-100 text-blue-600"
                  : "text-gray-700 hover:bg-gray-100"
              )}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
