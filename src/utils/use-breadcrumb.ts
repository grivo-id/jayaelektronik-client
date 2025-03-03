'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function convertBreadcrumbTitle(string: string) {
  return decodeURIComponent(string)
    .replace(/-/g, ' ')
    .replace(/oe/g, 'ö')
    .replace(/ae/g, 'ä')
    .replace(/ue/g, 'ü')
    .toLowerCase();
}

export default function useBreadcrumb() {
  const pathname = usePathname();
  const [breadcrumbs, setBreadcrumbs] = useState<any>(null);
  useEffect(() => {
    if (pathname) {
      const linkPath = pathname.split('/');
      linkPath.shift();
      linkPath.shift();

      const pathArray = linkPath.map((path, i) => {
        return {
          breadcrumb: path,
          href: '/' + linkPath.slice(0, i + 1).join('/'),
        };
      });

      setBreadcrumbs(pathArray);
    }
  }, [pathname]);

  return breadcrumbs;
}
