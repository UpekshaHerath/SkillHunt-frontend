export interface Job {
    id: number;
    company: string;
    position: string;
    status: 'Applied' | 'Interview' | 'Offer' | 'Rejected';
    location: string;
    salary: string;
    description: string;
    requirements: string[];
  }