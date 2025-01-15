'use client';

import { redirect, useSearchParams } from 'next/navigation';

export default function Page() {
  const searchParams = useSearchParams();
  const params = searchParams.get('token');
  redirect(`/en/verify-email?token=${params}`);

  return null;
}
