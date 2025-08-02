"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllJobs } from "./service";
import LoadingSpinner from "@/shared/components/LoadingSpinner";
import JobCard from "./components/JobCard";
import { PaginationBar } from "@/shared/components/PaginationBar";
import { motion, AnimatePresence } from "framer-motion";
import FilterBar from "./components/FilterBar";

export default function AvailableJobsPage() {
  const [page, setPage] = useState(1);
  const [location, setLocation] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["jobs", page, location, status],
    queryFn: () => getAllJobs({ page, location, status }),
  });

  const jobs = data?.data ?? [];
  const totalPages = data?.meta.totalPages ?? 1;

  const variants = {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -30 },
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  return (
    <main className="p-6 max-w-6xl mx-auto">
      {isLoading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <LoadingSpinner />
        </div>
      ) : (
        <>
          {jobs.length === 0 ? (
            <div className="text-center text-gray-500">
              <p className="text-lg">No jobs found.</p>
            </div>
          ) : (
            <>
              <FilterBar
                location={location}
                setLocation={setLocation}
                status={status}
                setStatus={setStatus}
                setPage={setPage}
              />
              <AnimatePresence mode="wait">
                <motion.div
                  key={page} // important!
                  variants={variants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                >
                  {jobs.map((job) => (
                    <JobCard key={job.id} job={job} />
                  ))}
                </motion.div>
              </AnimatePresence>

              {/* Pagination Controls */}
              <PaginationBar
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
              />

              {isFetching && (
                <div className="text-sm text-gray-500 mt-2 text-center">
                  Loading more jobs...
                </div>
              )}
            </>
          )}
        </>
      )}
    </main>
  );
}
