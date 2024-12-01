'use client'

import React, { useState } from 'react';
import JobList from '../components/JobList';
import JobDetails from '../components/JobDetails';
import { jobs } from '../data/jobs';
import { Job } from '@/types/JobType';

export default function JobListingPage() {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const handleSelectJob = (job: Job) => {
    setSelectedJob(job);
  };

  return (
    <main className="flex h-screen bg-gray-100 p-4">
      <div className="w-1/3 bg-white shadow-md rounded-lg overflow-hidden">
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