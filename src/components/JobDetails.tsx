import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Job } from '@/types/JobType';

interface JobDetailsProps {
  job: Job | null;
}

const JobDetails: React.FC<JobDetailsProps> = ({ job }) => {
  if (!job) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-gray-500 text-lg">Select a job to view details</p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-[calc(100vh-40px)]">
      <Card>
        <CardHeader>
          <CardTitle>{job.position}</CardTitle>
          <CardDescription>{job.company}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Badge variant={getStatusVariant(job.status)}>{job.status}</Badge>
          </div>
          <div className="mb-4">
            <p className="text-gray-600">Location: {job.location}</p>
            <p className="text-gray-600">Salary: {job.salary}</p>
          </div>
          <div className="mb-6">
            <h4 className="text-lg font-semibold mb-2">Description</h4>
            <p className="text-gray-700">{job.description}</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-2">Requirements</h4>
            <ul className="list-disc list-inside text-gray-700">
              {job.requirements.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </ScrollArea>
  );
};

function getStatusVariant(status: Job['status']): "default" | "secondary" | "destructive" | "outline" {
  switch (status) {
    case 'Applied':
      return "secondary";
    case 'Interview':
      return "default";
    case 'Offer':
      return "outline";
    case 'Rejected':
      return "destructive";
    default:
      return "default";
  }
}

export default JobDetails;

