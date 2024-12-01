import { Job } from "@/types/JobType";

export const jobs: Job[] = [
  {
    id: 1,
    company: "TechCorp",
    position: "Frontend Developer",
    status: "Applied",
    location: "New York, NY",
    salary: "$80,000 - $120,000",
    description:
      "We are seeking a talented Frontend Developer to join our dynamic team...",
    requirements: [
      "3+ years of experience with React",
      "Strong understanding of JavaScript and TypeScript",
      "Experience with responsive design and CSS frameworks",
    ],
  },
  {
    id: 2,
    company: "DataSystems Inc.",
    position: "Data Scientist",
    status: "Interview",
    location: "San Francisco, CA",
    salary: "$100,000 - $150,000",
    description:
      "Join our data science team to work on cutting-edge machine learning projects...",
    requirements: [
      "MS or PhD in Computer Science, Statistics, or related field",
      "Experience with Python and data analysis libraries",
      "Strong background in machine learning algorithms",
    ],
  },
  {
    id: 3,
    company: "CloudNet",
    position: "DevOps Engineer",
    status: "Offer",
    location: "Seattle, WA",
    salary: "$90,000 - $130,000",
    description:
      "We're looking for a skilled DevOps Engineer to help us scale our cloud infrastructure...",
    requirements: [
      "5+ years of experience in DevOps or Site Reliability Engineering",
      "Proficiency with AWS or Azure cloud platforms",
      "Experience with containerization and orchestration technologies",
    ],
  },
  {
    id: 4,
    company: "MobileTech",
    position: "iOS Developer",
    status: "Rejected",
    location: "Austin, TX",
    salary: "$85,000 - $125,000",
    description:
      "Join our mobile development team to create innovative iOS applications...",
    requirements: [
      "3+ years of experience developing iOS applications",
      "Proficiency in Swift and Objective-C",
      "Experience with Core Data and RESTful APIs",
    ],
  },
  {
    id: 5,
    company: "SecureNet",
    position: "Cybersecurity Analyst",
    status: "Applied",
    location: "Washington, D.C.",
    salary: "$95,000 - $140,000",
    description:
      "We are seeking a skilled Cybersecurity Analyst to protect our systems and data...",
    requirements: [
      "Bachelor's degree in Computer Science or related field",
      "CISSP or CEH certification preferred",
      "Experience with threat detection and incident response",
    ],
  },
];
