"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function SignUpInForm() {

  return (
    <div className="flex justify-center">
      <form className="space-y-4 w-full max-w-md">
        <div>
          <Label htmlFor="username">Username</Label>
          <Input id="username" name="username" required />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" required />
          {/* {state?.error?.email && (
          <p className="text-sm text-red-500">{state.error.email[0]}</p>
        )} */}
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" required />
          {/* {state?.error?.password && (
          <p className="text-sm text-red-500">{state.error.password[0]}</p>
        )} */}
        </div>
        <Button type="submit" className="w-full">
          {/* {isSubmitting ? 'Signing up...' : 'Sign Up'} */}
          Sign Up
        </Button>
        <Alert>
          <AlertDescription>
            Sign up successful! You can now log in.
          </AlertDescription>
        </Alert>
      </form>
    </div>
  );
}
