import React from 'react';

import { ScrollArea } from "@/components/ui/scroll-area"
import { Job } from '@/types/JobType';
import JobCard from './JobCard';

interface JobListProps {
  jobs: Job[];
  selectedJobId: number | null;
  onSelectJob: (job: Job) => void;
}

const JobList: React.FC<JobListProps> = ({ jobs, selectedJobId, onSelectJob }) => {
  return (
    <ScrollArea className="h-[calc(100vh-120px)]">
      <div className="pr-4">
        {jobs.map((job) => (
          <JobCard
            key={job._id}
            job={job}
            isSelected={job._id === selectedJobId}
            onClick={() => onSelectJob(job)}
          />
        ))}
      </div>
    </ScrollArea>
  );
};

export default JobList;

