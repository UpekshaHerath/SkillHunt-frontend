import React from 'react';
import { Job } from '../data/jobs';
import JobCard from './JobCard';
import { ScrollArea } from "@/components/ui/scroll-area"

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
            key={job.id}
            job={job}
            isSelected={job.id === selectedJobId}
            onClick={() => onSelectJob(job)}
          />
        ))}
      </div>
    </ScrollArea>
  );
};

export default JobList;

