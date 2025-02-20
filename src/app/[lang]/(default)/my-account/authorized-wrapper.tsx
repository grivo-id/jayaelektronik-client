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
    if (!token) {
      router.replace('/');
    }
  }, [router]);

  return <>{children}</>;
}

// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { useUI } from '@contexts/ui.context';

// export default function AuthorizedRouteWrapper({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const { isAuthorized } = useUI();
//   const router = useRouter();
//   const [isChecking, setIsChecking] = useState(true);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     const checkAuth = () => {
//       // Check both context and sessionStorage
//       const token = sessionStorage.getItem('token');
//       const isUserAuthorized = isAuthorized || !!token;

//       setIsAuthenticated(isUserAuthorized);
//       setIsChecking(false);

//       if (!isUserAuthorized) {
//         router.replace('/');
//       }
//     };

//     checkAuth();
//   }, [isAuthorized, router]);

//   // Show loading state while checking authentication
//   if (isChecking) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <span>Loading...</span>
//       </div>
//     );
//   }

//   // Only render children if authenticated
//   if (!isAuthenticated) {
//     return null;
//   }

//   return <>{children}</>;
// }
