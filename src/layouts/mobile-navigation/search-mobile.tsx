'use client';

import SearchBox from '@components/common/search-box';
import SearchProduct from '@components/common/search-product';
import SearchResultLoaderMobile from './search-content-loader';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@components/components/ui/sheet';
import SearchIcon from '@components/icons/search-icon';
import { useUI } from '@contexts/ui.context';
import { useSearchQuery } from '@framework/product/use-search';
import { useState } from 'react';
import { useTranslation } from 'src/app/i18n/client';
import useDebounce from '@utils/debounce';

type Props = {
  lang: string;
};

export default function SearchMobile({ lang }: Props) {
  const { t } = useTranslation(lang, 'common');
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [inputFocus, setInputFocus] = useState<boolean>(false);
  const debouncedSearchText = useDebounce(searchText, 300);
  const { closeMobileSearch, closeSearch } = useUI();

  const { data, isLoading, error } = useSearchQuery(
    {
      page: 1,
      limit: 7,
      sort: 'desc',
      product_is_show: true,
      product_search: debouncedSearchText,
    },
    {
      enabled: debouncedSearchText.trim().length > 0,
    }
  );

  const products = data?.data || [];

  function handleSearch(e: React.SyntheticEvent) {
    e.preventDefault();
  }
  function handleAutoSearch(e: React.FormEvent<HTMLInputElement>) {
    setSearchText(e.currentTarget.value);
  }
  function clear() {
    setSearchText('');
    setIsOpen(false);
    setInputFocus(false);
    closeMobileSearch();
    closeSearch();
  }
  function enableInputFocus() {
    setInputFocus(true);
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger>
        <SearchIcon />
      </SheetTrigger>
      <SheetContent className="w-full max-w-[1023px] md:max-w-[578px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Search</SheetTitle>
          <SheetDescription className="sr-only">
            Search product here
          </SheetDescription>
        </SheetHeader>
        <div className="py-4">
          <SearchBox
            searchId={'search'}
            name="search"
            value={searchText}
            onSubmit={handleSearch}
            onChange={handleAutoSearch}
            onClear={clear}
            onFocus={() => enableInputFocus()}
            variant={'border'}
            lang={lang}
          />

          <div className="w-full max-h-[380px] py-2">
            {data?.data && (
              <div className="text-start  text-sm px-4 py-2 border-b flex flex-row items-center gap-1">
                <span className={' text-brand-dark '}>
                  {t('total-search-result')}
                </span>
                <span className="text-brand font-medium">
                  {data?.pagination.totalData}
                </span>
                <span className="text-brand-dark ">
                  {t('total-product-found')}
                </span>
              </div>
            )}
            {isLoading
              ? Array.from({ length: 8 }).map((_, idx) => (
                  <div
                    key={`search-result-loader-key-${idx}`}
                    className="py-2.5 scroll-snap-align-start"
                  >
                    <SearchResultLoaderMobile
                      key={idx}
                      uniqueKey={`top-search-${idx}`}
                    />
                  </div>
                ))
              : products?.map((item, index) => (
                  <div
                    key={`search-result-key-${index}`}
                    className="py-2.5 ps-5 pe-10 border-b border-black/5 scroll-snap-align-start transition-colors duration-200 hover:bg-fill-four"
                    onClick={clear}
                  >
                    <SearchProduct item={item} key={index} lang={lang} />
                  </div>
                ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
