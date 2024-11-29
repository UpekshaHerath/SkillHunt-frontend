import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "./ModeToggle";

export default function Navbar() {
  return (
    <div className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link className="mr-6 flex items-center space-x-2" href="/">
            <span className="font-bold text-xl">SkillHunt</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="flex items-center space-x-2">
            <ModeToggle />
            <Link href="/jobs">
              <Button>
                Jobs
              </Button>
            </Link>
            <Link href="/auth/sign-in">
              <Button variant="ghost">
                Sign In
              </Button>
            </Link>
            <Link href="/auth/sign-up">
              <Button>Sign Up</Button>
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}
