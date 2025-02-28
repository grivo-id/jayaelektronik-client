'use client';

import { useCategoriesQuery } from '@framework/category/get-all-categories';
import { ROUTES } from '@utils/routes';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { IoChevronDown, IoChevronUp } from 'react-icons/io5';
import { useTranslation } from 'src/app/i18n/client';

type Props = {
  lang: string;
  closeSidebar: Function;
};

export default function CategoryListMenu({ lang, closeSidebar }: Props) {
  const router = useRouter();
  const { t } = useTranslation(lang, 'menu');
  const {
    data,
    isLoading: loading,
    error,
  } = useCategoriesQuery({
    limit: 99,
  });
  const [isOpenCategory, setIsOpenCategory] = useState<boolean>(false);
  const [openSubCategories, setOpenSubCategories] = useState<{
    [key: string]: boolean;
  }>({});

  const toggleCategory = () => {
    setIsOpenCategory(!isOpenCategory);
  };

  const toggleSubCategory = (categoryId: string | number) => {
    setOpenSubCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  const handleClose = (categoryId: string | number) => {
    toggleSubCategory(categoryId);
    closeSidebar();
  };

  const categories = data?.categories?.data;

  return (
    <div className="relative w-full py-1">
      <div
        onClick={toggleCategory}
        className="py-2 transition duration-300 ease-in-out menu-item ltr:pl-5 rtl:pr-5 md:ltr:pl-7 md:rtl:pr-7 ltr:pr-4 rtl:pl-4 text-brand-dark cursor-pointer"
      >
        <span className=" w-full flex justify-between items-center">
          {t('menu-categories')}
          {isOpenCategory ? (
            <IoChevronUp className="text-brand-dark" />
          ) : (
            <IoChevronDown className="text-brand-dark" />
          )}
        </span>
      </div>
      {isOpenCategory && categories && (
        <div className="pl-5 mt-0">
          {categories.map((category) => (
            <div key={category.id} className="">
              <div
                className="font-medium flex justify-between items-center cursor-pointer pl-2 pr-4 py-2"
                onClick={() =>
                  category.children &&
                  category.children.length > 0 &&
                  toggleSubCategory(category.id)
                }
              >
                <span className="text-sm text-brand-muted font-normal">
                  - {category.name}
                </span>

                {category.children &&
                  category.children.length > 0 &&
                  (openSubCategories[category.id] ? (
                    <IoChevronUp className="text-brand-dark" />
                  ) : (
                    <IoChevronDown className="text-brand-dark" />
                  ))}
              </div>
              {category.children &&
                category.children.length > 0 &&
                openSubCategories[category.id] && (
                  <div className="pl-3 flex flex-col gap-0">
                    {category.children.map((child) => (
                      <div
                        key={child.id}
                        onClick={() => {
                          handleClose(category.id);
                          router.push(
                            `/${lang}${ROUTES.SEARCH}?category=${child.slug}`
                          );
                        }}
                        className="text-sm text-brand-dark pl-4 py-2 "
                      >
                        {child.name}
                      </div>
                    ))}
                  </div>
                )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
