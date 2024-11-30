'use client';

import { ReactNode, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useRouter } from 'next/navigation';

// Define the props for ProtectedRoute
interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user } = useContext(AuthContext)!; // Non-null assertion: AuthContext is assumed to always be provided
  console.log(user);
  const router = useRouter();
  console.log(router);

  useEffect(() => {
    console.log(user);
    if (!user) {
      router.push('/auth/sign-in'); // Redirect to login if not authenticated
    }
  }, [router, user]);

  return user ? <>{children}</> : null; // Render children if user exists, otherwise render null
}
