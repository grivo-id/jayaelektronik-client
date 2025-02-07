'use client';

import SearchBox from '@components/common/search-box';
import SearchProduct from '@components/common/search-product';
import SearchResultLoaderMobile from './search-content-loader';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@components/components/ui/sheet';
import SearchIcon from '@components/icons/search-icon';
import { useUI } from '@contexts/ui.context';
import { useSearchQuery } from '@framework/product/use-search';
import { useState } from 'react';

type Props = {
  lang: string;
};

export default function SearchMobile({ lang }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [inputFocus, setInputFocus] = useState<boolean>(false);
  const { displayMobileSearch, closeMobileSearch, displaySearch, closeSearch } =
    useUI();
  const { data, isLoading } = useSearchQuery({
    text: searchText,
  });

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
      <SheetContent className="w-full max-w-[1023px] md:max-w-[578px] ">
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
