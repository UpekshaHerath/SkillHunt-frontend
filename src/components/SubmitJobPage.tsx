"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import API from "@/utils/axiosInstance";
import { toast } from "react-toastify";

const formSchema = z.object({
  company: z.string().min(1, "Company is required"),
  position: z.string().min(1, "Position is required"),
  status: z.enum([
    "Interview",
    "Declined",
    "Pending",
    "Applied",
    "Rejected",
    "Accepted",
    "Withdrawn",
    "Offered",
    "Hired",
    "Not Hired",
  ]),
  location: z.string().min(1, "Location is required"),
  salary: z.string().min(1, "Salary is required"),
  description: z.string().min(1, "Description is required"),
  jobType: z.enum([
    "full-time",
    "part-time",
    "freelance",
    "contract",
    "internship",
    "temporary",
    "remote",
  ]),
  requirements: z
    .array(z.string().min(1, "Requirement cannot be empty"))
    .min(1, "At least one requirement is needed"),
});

type FormValues = z.infer<typeof formSchema>;

export default function AddJobForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      company: "",
      position: "",
      status: "Pending",
      location: "",
      salary: "",
      description: "",
      jobType: "full-time",
      requirements: [""],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "requirements",
  } as never);

  const onSubmit = async (values: FormValues) => {
    try {
      const response = await API.post("/jobs", values);
      if (response.status === 201) {
        toast.success("New job added successfully");
        form.reset();
      } else {
        toast.error("An error occurred while job creation.");
      }
    } catch (error) {
      toast.error("An error occurred while job creation.");
      console.error(error);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto my-10">
      <CardHeader>
        <CardTitle>Add New Job</CardTitle>
        <CardDescription>
          Enter the details for the new job position.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter company name" {...field} />
                    </FormControl>
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
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(value)}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {[
                          "Interview",
                          "Declined",
                          "Pending",
                          "Applied",
                          "Rejected",
                          "Accepted",
                          "Withdrawn",
                          "Offered",
                          "Hired",
                          "Not Hired",
                        ].map((status) => (
                          <SelectItem key={status} value={status}>
                            {status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a job type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {[
                          "full-time",
                          "part-time",
                          "freelance",
                          "contract",
                          "internship",
                          "temporary",
                          "remote",
                        ].map((type) => (
                          <SelectItem key={type} value={type}>
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter job location" {...field} />
                    </FormControl>
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
                      <Input placeholder="Enter salary" {...field} />
                    </FormControl>
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
                    <Textarea
                      placeholder="Enter job description"
                      {...field}
                      className="h-32"
                    />
                  </FormControl>
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
                  <div className="space-y-2">
                    {fields.map((field, index) => (
                      <FormField
                        key={field.id}
                        control={form.control}
                        name={`requirements.${index}`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <div className="flex items-center space-x-2">
                                <Input {...field} />
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="icon"
                                  onClick={() => remove(index)}
                                >
                                  X
                                </Button>
                              </div>
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                  <div className="flex">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => append("")}
                    >
                      Add Requirement
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Separator />

            <Button type="submit" className="w-full">
              Submit Job
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
