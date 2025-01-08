'use server'

import { z } from 'zod'

const jobSchema = z.object({
  company: z.string().max(50, "Company name must be 50 characters or less"),
  position: z.string().max(100, "Position must be 100 characters or less"),
  status: z.enum(["Interview", "Declined", "Pending", "Applied", "Rejected", "Accepted", "Withdrawn", "Offered", "Hired", "Not Hired"]).default("Pending"),
  location: z.string().max(100, "Location must be 100 characters or less"),
  salary: z.string(),
  description: z.string().max(5000, "Description must be 5000 characters or less"),
  jobType: z.enum(["full-time", "part-time", "freelance"]).default("full-time"),
  requirements: z.array(z.string()).min(1, "At least one requirement is needed")
})

export async function submitJob(formData: FormData) {
  const validatedFields = jobSchema.safeParse({
    company: formData.get('company'),
    position: formData.get('position'),
    status: formData.get('status'),
    location: formData.get('location'),
    salary: formData.get('salary'),
    description: formData.get('description'),
    jobType: formData.get('jobType'),
    requirements: formData.getAll('requirements')
  })

  if (!validatedFields.success) {
    return { error: validatedFields.error.flatten().fieldErrors }
  }

  console.log(formData);
  // Here you would typically save the job to your database
  // For this example, we'll just return a success message
  return { success: "Job submitted successfully!" }
}

