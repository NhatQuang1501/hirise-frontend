import React from "react";
import { JobCardItem } from "@/types/job";
import JobCard from "@/components/job/JobCard";

interface JobListingSectionProps {
  jobs: JobCardItem[];
  isLoading: boolean;
  error: string | null;
  onSaveJob: (id: string) => void;
  onViewJob: (id: string) => void;
}

const JobListingSection: React.FC<JobListingSectionProps> = ({
  jobs,
  isLoading,
  error,
  onSaveJob,
  onViewJob,
}) => {
  if (isLoading) {
    return (
      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-2xl font-bold">Job Listings</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="h-96 animate-pulse rounded-lg bg-gray-200" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-2xl font-bold">Job Listings</h2>
          <div className="rounded-lg bg-red-50 p-6 text-center text-red-600">
            <p>{error}</p>
            <button
              className="mt-4 rounded-md bg-red-100 px-4 py-2 font-medium text-red-600 hover:bg-red-200"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (jobs.length === 0) {
    return (
      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-2xl font-bold">Job Listings</h2>
          <div className="rounded-lg bg-gray-50 p-12 text-center">
            <h3 className="mb-2 text-xl font-semibold">No Jobs Found</h3>
            <p className="text-gray-600">There are no jobs matching your search criteria.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-12">
      <div className="container mx-auto px-4">
        <h2 className="mb-8 text-2xl font-bold">Job Listings</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onSaveJob={() => onSaveJob(job.id)}
              onClick={() => onViewJob(job.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default JobListingSection;
