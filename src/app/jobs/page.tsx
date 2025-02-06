"use client";

import JobDetails from "@/components/JobDetails";
import JobList from "@/components/JobList";
import { Button } from "@/components/ui/button";
import { Job } from "@/types/JobType";
import API from "@/utils/axiosInstance";
import Link from "next/link";
import { BriefcaseBusiness } from "lucide-react";
import React, { useEffect, useState } from "react";
import LoadingScreen from "@/components/loading";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

export default function JobListingPage() {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [Loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await API.get("/jobs");
        setJobs(res.data.jobs);
        setLoading(false);
      } catch (error) {
        toast.error("An error occurred while fetching jobs.");
        console.error(error);
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleSelectJob = (job: Job) => {
    setSelectedJob(job);
  };

  if (Loading) {
    return <LoadingScreen />;
  }

  return (
    <main className="flex h-[calc(100vh-70px)] p-4">
      <div className="w-1/3 shadow-md rounded-lg overflow-hidden">
        <div className="p-4">
          <motion.h1
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.4,
              scale: { type: "spring", visualDuration: 0.6, bounce: 0.5 },
            }}
            className="text-2xl font-bold text-center pb-8"
          >
            👇 My Created Jobs
          </motion.h1>
          <JobList
            jobs={jobs}
            selectedJobId={selectedJob?._id || null}
            onSelectJob={handleSelectJob}
          />
        </div>
      </div>
      <div className="w-2/3 pl-4">
        <Link href="/jobs/new" className="flex items-center gap-2 mb-4">
          <Button className="flex items-center gap-2 mb-4">
            <BriefcaseBusiness />
            New Job
          </Button>
        </Link>
        <JobDetails job={selectedJob} />
      </div>
    </main>
  );
}
