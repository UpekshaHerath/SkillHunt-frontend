"use client";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "./ModeToggle";
import { AuthContext } from "@/context/AuthContext";
import { useContext, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { LogOut, User } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const authContext = useContext(AuthContext);
  const user = authContext?.user;
  const logout = authContext?.logout;

  return (
    <div className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center px-10">
        <div className="flex">
          <Link className="mr-6 flex items-center space-x-2" href="/jobs">
            <span className="font-bold text-xl">SkillHunt</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="flex items-center space-x-2">
            <ModeToggle />
            <Link href="/jobs">
              <Button>Jobs</Button>
            </Link>
            {user ? (
              <>
                <div className="flex items-center">
                  <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="relative h-8 w-8 rounded-full"
                      >
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src="/images/avatar.png"
                            alt="@username"
                          />
                          <AvatarFallback>UN</AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="w-56"
                      align="end"
                      forceMount
                    >
                      <DropdownMenuItem asChild>
                        <Link href="/profile" className="flex items-center">
                          <User className="mr-2 h-4 w-4" />
                          <span>View Profile</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link
                          onClick={() => logout && logout()}
                          className="flex items-center text-red-600" href={""}                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          <span>Log Out</span>
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </>
            ) : (
              <>
                <Link href="/auth/sign-up">
                  <Button variant="ghost">Sign Up</Button>
                </Link>
                <Link href="/auth/sign-in">
                  <Button>Sign In</Button>
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
}
