"use client";

import { useState, useContext, ChangeEvent, FormEvent } from "react";
import { register } from "../../../services/auth";
import { AuthContext } from "../../../context/AuthContext";
import { useRouter } from "next/navigation";
import { CredentialsType } from "@/types/Credentials";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import Link from "next/link";

export default function SignInPage() {
  const [credentials, setCredentials] = useState<CredentialsType>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const { login: setAuthToken } = useContext(AuthContext)!;
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(credentials)
    try {
      const { token } = await register(credentials);
      console.log('hi')
      setAuthToken(token);
      router.push("/jobs");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
        setError(error.message);
      } else {
        console.error("An error occurred during login.");
        setError("An error occurred during login.");
      }
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex justify-center mt-20">
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Sign up</CardTitle>
        <CardDescription>
          Enter your details to create a new account...
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="Email"
              value={credentials.email}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              name="password"
              placeholder="Password"
              value={credentials.password}
              onChange={handleChange}
            />
          </div>
          {error && (
            <div className="flex items-center space-x-2 text-red-500">
              <AlertCircle size={20} />
              <span>{error}</span>
            </div>
          )}
          <Button type="submit" className="w-full">
            Sign up
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-gray-500">
          <span>Already&apos; have an account?</span>{" "}
          <Link href="/auth/sign-in" className="font-medium text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </CardFooter>
    </Card>
    </div>
  );
}
