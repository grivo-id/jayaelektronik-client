'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthorizedRouteWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const token = sessionStorage.getItem('token');

    if (!isValidToken(token)) {
      router.replace('/');
    }
  }, [router]);

  return <>{children}</>;
}

function isValidToken(token: string | null): boolean {
  if (!token) return false; 

  try {
    const parsedToken = JSON.parse(token);
    return parsedToken.expires_in > Date.now();
  } catch (error) {
    // console.error('Invalid token format:', error);
    return false;
  }
}