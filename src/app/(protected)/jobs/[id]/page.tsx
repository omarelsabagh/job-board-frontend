"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { getJobById } from "../service";
import LoadingSpinner from "@/shared/components/LoadingSpinner";

export default function JobDetailsPage() {
  const { id } = useParams();
  const router = useRouter();

  const {
    data: job,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["job", id],
    queryFn: () => getJobById(id as string),
    enabled: !!id,
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError || !job)
    return <p className="text-red-600 text-center mt-4">Job not found.</p>;

  return (
    <div className="relative min-h-screen bg-gray-50 px-6 pt-24 pb-16">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="absolute top-6 left-6 flex items-center gap-2 bg-white hover:bg-gray-100 text-gray-800 px-4 py-2 rounded-full shadow-md transition z-10"
      >
        <ArrowLeft size={16} />
        <span className="font-medium text-sm">Back to Jobs</span>
      </button>

      {/* Job Details Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-3xl shadow-2xl p-10 space-y-6 max-w-5xl mx-auto"
      >
        <header className="space-y-2">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            {job.title}
          </h1>
          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
            <span>📍 {job.location}</span>
            <span>💰 ${job.salary}</span>
            <span className="uppercase tracking-wide text-xs bg-gray-200 px-2 py-1 rounded-full">
              {job.status}
            </span>
          </div>
        </header>

        <section className="prose max-w-none text-gray-800">
          <p>{job.description}</p>
        </section>

        {job.createdByUser && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="border-t pt-6"
          >
            <h3 className="font-semibold text-gray-700 mb-1">👤 Posted By</h3>
            <p className="text-gray-900">{job.createdByUser.fullname}</p>
            <p className="text-gray-500 text-sm">{job.createdByUser.email}</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
