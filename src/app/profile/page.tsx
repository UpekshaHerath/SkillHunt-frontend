"use client";

import { useEffect, useState } from "react";
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
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { UserType } from "@/types/UserType";
import API from "@/utils/axiosInstance";
import { toast } from 'react-toastify';
import LoadingScreen from "@/components/loading";

const formSchema = z.object({
  name: z.string().min(3).max(50),
  email: z.string().email(),
  bio: z.string().max(500).optional(),
  profilePicture: z.string().optional(),
  mobileNumber: z.string().optional(),
  country: z.string().optional(),
  city: z.string().optional(),
  postalCode: z.string().optional(),
  CV_URL: z.string().optional(),
});

const defaultUserData = {
  name: "",
  bio: "",
  profilePicture: "/placeholder.svg?height=128&width=128",
  email: "",
  mobileNumber: "",
  country: "",
  city: "",
  postalCode: "",
  CV_URL: "",
};

export default function UserProfileForm() {
  const [userData, setUserData] = useState<UserType>(defaultUserData);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [avatarSrc, setAvatarSrc] = useState<string>(
    "/placeholder.svg?height=128&width=128"
  );
  // const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  useEffect(() => {
    API.get("/users")
      .then((res) => {
        setUserData(res.data.user);
        setAvatarSrc(res.data.user.profilePicture);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (userData) {
      form.reset(userData);
    }
  }, [userData]);

  // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setAvatarPreview(reader.result as string);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: userData,
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);
      const response = await API.patch("/users", values);
      console.log("Response from API:", response);
      if (response.status === 200) {
        toast.success("Profile updated successfully.");
      } else {
        toast.error("An error occurred while updating your profile.");
      }
      setUserData(values); // Update local state with submitted data
      setIsEditing(false); // Exit edit mode
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }

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

  if (loading) {
    return <LoadingScreen />;
  }

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
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex flex-col items-center md:items-start space-y-4">
                  <Avatar className="w-32 h-32">
                    <AvatarImage src={avatarSrc} alt="Profile picture" />
                    <AvatarFallback>{userData.email.toUpperCase().charAt(0)}</AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <div>
                      <Label
                        htmlFor="avatar"
                        className="cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md inline-block"
                      >
                        Change Picture
                      </Label>
                      <Input
                        id="avatar"
                        type="file"
                        accept="image/*"
                        className="hidden"
                      />
                    </div>
                  )}
                  <div className="w-full">
                    {isEditing ? (
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                {...field}
                                className="text-lg font-semibold"
                                placeholder="Name"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    ) : (
                      <p className="text-lg font-semibold text-center md:text-left">
                        {userData?.name}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex-1">
                  {renderField(
                    "Bio",
                    userData?.bio || "",
                    <FormField
                      control={form.control}
                      name="bio"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Textarea
                              {...field}
                              className="min-h-[150px]"
                              placeholder="Bio"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  {renderField(
                    "Email",
                    userData?.email,
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              type="email"
                              {...field}
                              placeholder="Email"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                  {renderField(
                    "Mobile Number",
                    userData?.mobileNumber || "",
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
                  {renderField(
                    "Country",
                    userData?.country || "",
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
                </div>
                <div className="space-y-6">
                  {renderField(
                    "City",
                    userData.city || "",
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
                    userData.postalCode || "",
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
                    userData.CV_URL || "",
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
