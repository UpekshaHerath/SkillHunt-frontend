import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Job } from "@/types/JobType";
import { motion } from "framer-motion";

interface JobCardProps {
  job: Job;
  isSelected: boolean;
  onClick: () => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, isSelected, onClick }) => {
  return (
    <motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.8 }}>
      <Card
        className={`mb-4 cursor-pointer transition-colors ${
          isSelected ? "bg-blue-100 border-blue-500" : "hover:bg-gray-100"
        }`}
        onClick={onClick}
      >
        <CardHeader>
          <CardTitle>{job.company}</CardTitle>
          <CardDescription>{job.position}</CardDescription>
        </CardHeader>
        <CardContent>
          <Badge variant={getStatusVariant(job.status)}>{job.status}</Badge>
        </CardContent>
      </Card>
    </motion.div>
  );
};

function getStatusVariant(
  status: Job["status"]
): "default" | "secondary" | "destructive" | "outline" {
  switch (status) {
    case "Applied":
      return "secondary";
    case "Interview":
      return "default";
    case "Offer":
      return "outline";
    case "Rejected":
      return "destructive";
    default:
      return "default";
  }
}

export default JobCard;
