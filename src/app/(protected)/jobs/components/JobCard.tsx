import Link from "next/link";
import { Job } from "../model";

type JobCardProps = {
  job: Job;
};

export default function JobCard({ job }: JobCardProps) {
  return (
    <Link
      href={`/jobs/${job.id}`}
      className="block bg-white p-6 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-all hover:bg-gray-50"
    >
      <h2 className="text-xl font-semibold text-gray-800 mb-1">{job.title}</h2>
      <p className="text-sm text-gray-600">{job.location}</p>
      <p className="text-sm text-blue-600 font-medium mt-1">
        EGP {job.salary.toLocaleString()}
      </p>
      <p className="text-sm text-gray-700 mt-2 line-clamp-3">
        {job.description}
      </p>
    </Link>
  );
}
