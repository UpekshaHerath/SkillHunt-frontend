"use client";

import JobDetails from "@/components/JobDetails";
import JobList from "@/components/JobList";
import { Job } from "@/types/JobType";
import API from "@/utils/axiosInstance";
import React, { useEffect, useState } from "react";

export default function JobListingPage() {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [Loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchJobs = async () => {
      const res = await API.get("/jobs");
      setJobs(res.data.jobs);
      setLoading(false);
    };
    try {
      fetchJobs();
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    console.log(jobs);
  }, [jobs]);

  const handleSelectJob = (job: Job) => {
    setSelectedJob(job);
  };

  if (Loading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="flex h-[calc(100vh-70px)] p-4">
      <div className="w-1/3 shadow-md rounded-lg overflow-hidden">
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">Job Listings</h1>
          <JobList
            jobs={jobs}
            selectedJobId={selectedJob?._id || null}
            onSelectJob={handleSelectJob}
          />
        </div>
      </div>
      <div className="w-2/3 pl-4">
        <JobDetails job={selectedJob} />
      </div>
    </main>
  );
}
