'use client'

import JobDetails from '@/components/JobDetails';
import JobList from '@/components/JobList';
import { Job, jobs } from '@/data/jobs';
import React, { useState } from 'react';


export default function JobListingPage() {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const handleSelectJob = (job: Job) => {
    setSelectedJob(job);
  };

  return (
    <main className="flex h-screen p-4">
      <div className="w-1/3 shadow-md rounded-lg overflow-hidden">
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">Job Listings</h1>
          <JobList
            jobs={jobs}
            selectedJobId={selectedJob?.id || null}
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
