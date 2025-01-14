'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { submitJob } from '../actions/submit-jobs';
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from 'react-toastify'

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

type JobFormValues = z.infer<typeof jobSchema>

export default function SubmitJobPage() {
  const [requirements, setRequirements] = useState<string[]>([''])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      company: '',
      position: '',
      status: 'Pending',
      location: '',
      salary: '',
      description: '',
      jobType: 'full-time',
      requirements: ['']
    },
  })

  async function onSubmit(data: JobFormValues) {
    setIsSubmitting(true)
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((item) => formData.append(key, item));
        } else {
          formData.append(key, value);
        }
      });
      const result = await submitJob(formData);
      console.log(result);
      toast.success("Job submitted successfully!",
      )
      form.reset()
      setRequirements([''])
    } catch {
      toast.error("Failed to submit job. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto py-10">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Submit a New Job</CardTitle>
          <CardDescription>Fill out the form below to submit a new job listing.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter company name" {...field} />
                      </FormControl>
                      <FormDescription>
                        The name of the company offering the job.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="position"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Position</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter job position" {...field} />
                      </FormControl>
                      <FormDescription>
                        The title of the job position.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select job status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {["Interview", "Declined", "Pending", "Applied", "Rejected", "Accepted", "Withdrawn", "Offered", "Hired", "Not Hired"].map((status) => (
                            <SelectItem key={status} value={status}>{status}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        The current status of the job application.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter job location" {...field} />
                      </FormControl>
                      <FormDescription>
                        The location where the job is based.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="salary"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Salary</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter job salary" {...field} />
                      </FormControl>
                      <FormDescription>
                        The salary range or exact amount for the job.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="jobType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select job type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {["full-time", "part-time", "freelance"].map((type) => (
                            <SelectItem key={type} value={type}>{type}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        The type of employment for this job.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter job description" {...field} className="min-h-[100px]" />
                    </FormControl>
                    <FormDescription>
                      A detailed description of the job and its responsibilities.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="requirements"
                render={() => (
                  <FormItem>
                    <FormLabel>Requirements</FormLabel>
                    <FormControl>
                      <div className="space-y-2">
                        {requirements.map((req, index) => (
                          <div key={index} className="flex">
                            <Input
                              placeholder={`Requirement ${index + 1}`}
                              value={req}
                              onChange={(e) => {
                                const newReqs = [...requirements]
                                newReqs[index] = e.target.value
                                setRequirements(newReqs)
                                form.setValue('requirements', newReqs.filter(Boolean))
                              }}
                              className="mr-2"
                            />
                            {index === requirements.length - 1 && (
                              <Button type="button" variant="outline" onClick={() => setRequirements([...requirements, ''])}>
                                Add
                              </Button>
                            )}
                          </div>
                        ))}
                      </div>
                    </FormControl>
                    <FormDescription>
                      List the requirements for this job. Click Add to add more.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <Button onClick={form.handleSubmit(onSubmit)} className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit Job'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

