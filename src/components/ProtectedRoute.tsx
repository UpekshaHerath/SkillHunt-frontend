'use client';

import { ReactNode, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import LoadingScreen from './loading';

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const authContext = useContext(AuthContext);
  const router = useRouter();


  if (!authContext) {
    console.error('AuthContext not found. Make sure to wrap the app in AuthProvider.');
    return null;
  }

  const { user } = authContext;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (authContext.user === null) {
      console.log('User not authenticated, redirecting to login');
      router.push('/auth/sign-in'); 
    }
  }, [user, router, authContext.user]);

  if (user === null) {
    return <LoadingScreen />;
  }

  return <>{children}</>;
}
