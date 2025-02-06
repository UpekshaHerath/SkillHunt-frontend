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
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const authContext = useContext(AuthContext);
  const user = authContext?.user;
  const logout = authContext?.logout;
  const pathname = usePathname();

  return (
    <div className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm dark:shadow-gray-800">
      <div className="flex h-14 items-center px-10">
        <div className="flex">
          <Link className="mr-6 flex items-center space-x-2" href="/">
            <motion.span
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
              className="font-bold text-xl"
            >
              SkillHunt
            </motion.span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="flex items-center space-x-2">
            <ModeToggle />
            {pathname !== "/jobs" && user && (
              <Link href="/jobs">
                <Button>My Created Jobs</Button>
              </Link>
            )}
            {user ? (
              <>
                <div className="flex items-center">
                  <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
                    <DropdownMenuTrigger
                      className="justify-center items-center align-center"
                      asChild
                    >
                      <Button
                        variant="ghost"
                        className="h-10 w-10 rounded-full items-center justify-center"
                      >
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src="/images/avatar.png"
                            alt="@username"
                          />
                          <AvatarFallback>P</AvatarFallback>
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
                          className="flex items-center text-red-600"
                          href={"/auth/sign-in"}
                        >
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
