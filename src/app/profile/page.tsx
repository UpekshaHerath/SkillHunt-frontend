"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";

const formSchema = z.object({
  name: z.string().min(3).max(50),
  email: z.string().email(),
  password: z.string().min(6),
  bio: z.string().max(500).optional(),
  profilePicture: z.string().optional(),
  mobileNumber: z.string().optional(),
  country: z.string().optional(),
  city: z.string().optional(),
  postalCode: z.string().optional(),
  CV_URL: z.string().optional(),
});

// Mock user data (replace this with actual data fetching logic)
const mockUserData = {
  name: "John Doe",
  email: "john@example.com",
  password: "******", // You wouldn't actually send the password to the client
  bio: "A passionate developer",
  profilePicture: "/placeholder.svg?height=128&width=128",
  mobileNumber: "+1 (555) 123-4567",
  country: "United States",
  city: "New York",
  postalCode: "10001",
  CV_URL: "https://example.com/john-doe-cv.pdf",
};

export default function UserProfileForm() {
  const [isEditing, setIsEditing] = useState(false);
  const [avatarSrc, setAvatarSrc] = useState<string>(
    mockUserData.profilePicture
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: mockUserData,
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // Here you would typically send the form data to your backend
    setIsEditing(false);
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setAvatarSrc(result);
        form.setValue("profilePicture", result);
      };
      reader.readAsDataURL(file);
    }
  };

  const renderField = (
    label: string,
    value: string,
    formField: JSX.Element
  ) => (
    <div className="space-y-1">
      {label != "" ? <Label>{label}</Label> : null}
      {isEditing ? (
        formField
      ) : (
        <p className="text-sm text-gray-600">{value || "Not provided"}</p>
      )}
    </div>
  );

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>User Profile</CardTitle>
              <CardDescription>
                View or edit your profile information
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                checked={isEditing}
                onCheckedChange={setIsEditing}
                id="edit-mode"
              />
              <Label htmlFor="edit-mode">Edit Mode</Label>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="flex flex-col items-center justify-center space-y-4 sm:space-y-0">
                <div className="flex">
                  <Avatar className="w-32 h-32">
                    <AvatarImage src={avatarSrc} alt="Profile picture" />
                    <AvatarFallback>
                      {mockUserData.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </div>
                {isEditing && (
                  <div className="mt-2">
                    <Label
                      htmlFor="avatar"
                      className="cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md inline-block"
                    >
                      Change Profile Picture
                    </Label>
                    <Input
                      id="avatar"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleAvatarChange}
                    />
                  </div>
                )}
                <div className="flex items-center justify-center w-full">
                  {renderField(
                    "",
                    mockUserData.name,
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {renderField(
                  "Email",
                  mockUserData.email,
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {renderField(
                  "Mobile Number",
                  mockUserData.mobileNumber || "",
                  <FormField
                    control={form.control}
                    name="mobileNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input type="tel" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>

              {isEditing && (
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormDescription>
                        Leave blank to keep current password
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {renderField(
                "Bio",
                mockUserData.bio || "",
                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {renderField(
                  "Country",
                  mockUserData.country || "",
                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {renderField(
                  "City",
                  mockUserData.city || "",
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {renderField(
                  "Postal Code",
                  mockUserData.postalCode || "",
                  <FormField
                    control={form.control}
                    name="postalCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {renderField(
                  "CV URL",
                  mockUserData.CV_URL || "",
                  <FormField
                    control={form.control}
                    name="CV_URL"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input type="url" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>

              {isEditing && (
                <Button type="submit" className="w-full">
                  Save Changes
                </Button>
              )}
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
