'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import ActiveLink from '@components/ui/active-link';
import { IoChevronForward } from 'react-icons/io5';
import { IoHomeOutline } from 'react-icons/io5';
import { ROUTES } from '@utils/routes';
import { useTranslation } from 'src/app/i18n/client';

interface Props {
  children: any;
}

const BreadcrumbItem: React.FC<Props> = ({ children, ...props }) => {
  return (
    <li
      className="text-sm text-brand-muted px-2.5 transition duration-200 ease-in ltr:first:pl-0 rtl:first:pr-0 ltr:last:pr-0 rtl:last:pl-0 hover:text-brand-dark"
      {...props}
    >
      {children}
    </li>
  );
};

const BreadcrumbSeparator: React.FC<Props> = ({ children, ...props }) => {
  return (
    <li className="text-base text-brand-dark" {...props}>
      {children}
    </li>
  );
};

function convertBreadcrumbTitle(string: string) {
  const productIdPattern = /^[A-Z0-9]+\./;
  const stringWithoutId = string.replace(productIdPattern, '');

  return decodeURIComponent(stringWithoutId)
    .replace(/-/g, ' ')
    .replace(/oe/g, 'ö')
    .replace(/ae/g, 'ä')
    .replace(/ue/g, 'ü')
    .toLowerCase();
}

function useBreadcrumb() {
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

export const ProductDetailBreadcrumbItems = (props: any) => {
  let children: any = React.Children.toArray(props.children);

  children = children.map((child: string, index: number) => (
    <BreadcrumbItem key={`breadcrumb_item${index}`}>{child}</BreadcrumbItem>
  ));

  const lastIndex = children.length - 1;

  children = children.reduce((acc: any, child: string, index: number) => {
    const notLast = index < lastIndex;
    if (notLast) {
      acc.push(
        child,
        <BreadcrumbSeparator key={`breadcrumb_sep${index}`}>
          {props.separator}
        </BreadcrumbSeparator>
      );
    } else {
      acc.push(child);
    }
    return acc;
  }, []);

  return (
    <div className="flex items-center ">
      <ol className="flex items-center w-full overflow-hidden">{children}</ol>
    </div>
  );
};

type BreadProps = {
  separator?: any;
  lang: string;
};

export default function ProductDetailBreadcrumb({
  separator = (
    <IoChevronForward className="text-brand-dark text-opacity-40 text-15px" />
  ),
  lang,
}: BreadProps) {
  const breadcrumbs = useBreadcrumb();
  const { t } = useTranslation(lang, 'common');
  return (
    <ProductDetailBreadcrumbItems separator={separator}>
      <ActiveLink
        legacyBehavior
        href={`${ROUTES.HOME}`}
        activeClassName="font-semibold text-heading"
        lang={lang}
      >
        <a className="inline-flex ">
          <IoHomeOutline className="ltr:mr-1.5 rtl:ml-1.5 text-brand-dark text-15px" />
          {t('breadcrumb-home')}
        </a>
      </ActiveLink>

      {breadcrumbs?.map((breadcrumb: any) => (
        <ActiveLink
          href={`${breadcrumb.href}`}
          activeClassName="text-heading"
          key={breadcrumb.href}
          legacyBehavior
          lang={lang}
        >
          <a className="capitalize">
            {convertBreadcrumbTitle(breadcrumb.breadcrumb)}
          </a>
        </ActiveLink>
      ))}
    </ProductDetailBreadcrumbItems>
  );
}
