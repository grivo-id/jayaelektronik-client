import React, { useState } from 'react';
import cn from 'classnames';
import { useSearchQuery } from '@framework/product/use-search';
import SearchBox from '@components/common/search-box';
import SearchProduct from '@components/common/search-product';
import SearchResultLoader from '@components/ui/loaders/search-result-loader';
import useFreezeBodyScroll from '@utils/use-freeze-body-scroll';
import Scrollbar from '@components/ui/scrollbar';
import { useUI } from '@contexts/ui.context';
import useDebounce from '@utils/debounce';
import { useTranslation } from 'src/app/i18n/client';

type Props = {
  lang: string;
  className?: string;
  searchId?: string;
  variant?: 'border' | 'fill';
};

const Search = React.forwardRef<HTMLDivElement, Props>(
  (
    {
      className = 'md:w-[730px] 2xl:w-[800px]',
      searchId = 'search',
      variant = 'border',
      lang,
    },
    ref
  ) => {
    const { t } = useTranslation(lang, 'common');
    const {
      displayMobileSearch,
      closeMobileSearch,
      displaySearch,
      closeSearch,
    } = useUI();
    const [searchText, setSearchText] = useState('');
    const debouncedSearchText = useDebounce(searchText, 300);

    const [inputFocus, setInputFocus] = useState<boolean>(false);
    const { data, isLoading, error } = useSearchQuery(
      {
        page: 1,
        limit: 25,
        sort: 'desc',
        product_is_show: true,
        product_search: debouncedSearchText,
      },
      {
        enabled: debouncedSearchText.trim().length > 0,
      }
    );

    useFreezeBodyScroll(
      inputFocus === true || displaySearch || displayMobileSearch
    );
    function handleSearch(e: React.SyntheticEvent) {
      e.preventDefault();
    }
    function handleAutoSearch(e: React.FormEvent<HTMLInputElement>) {
      setSearchText(e.currentTarget.value);
    }
    function clear() {
      setSearchText('');
      setInputFocus(false);
      closeMobileSearch();
      closeSearch();
    }
    function enableInputFocus() {
      setInputFocus(true);
    }

    return (
      <div
        ref={ref}
        className={cn(
          'w-full transition-all duration-200 ease-in-out',
          className
        )}
      >
        <div
          className={cn(
            'overlay cursor-pointer invisible w-full h-full opacity-0 flex top-0 ltr:left-0 rtl:right-0 transition-all duration-300 fixed',
            {
              open: displayMobileSearch,
              'input-focus-overlay-open': inputFocus === true,
              'open-search-overlay': displaySearch,
            }
          )}
          onClick={() => clear()}
        />
        {/* End of overlay */}

        <div className="relative z-30 flex flex-col justify-center w-full shrink-0">
          <div className="flex flex-col w-full mx-auto">
            <SearchBox
              searchId={searchId}
              name="search"
              value={searchText}
              onSubmit={handleSearch}
              onChange={handleAutoSearch}
              onClear={clear}
              onFocus={() => enableInputFocus()}
              variant={variant}
              lang={lang}
            />
          </div>
          {/* End of searchbox */}

          {searchText && (
            <div className="w-full absolute top-[56px] ltr:left-0 rtl:right-0 bg-brand-light rounded-md flex flex-col overflow-hidden shadow-dropDown z-30">
              <Scrollbar className="os-host-flexbox">
                <div className="w-full max-h-[380px]">
                  {isLoading
                    ? Array.from({ length: 15 }).map((_, idx) => (
                        <div
                          key={`search-result-loader-key-${idx}`}
                          className="py-2.5 ltr:pl-5 rtl:pr-5 ltr:pr-10 rtl:pl-10 scroll-snap-align-start"
                        >
                          <SearchResultLoader
                            key={idx}
                            uniqueKey={`top-search-${idx}`}
                          />
                        </div>
                      ))
                    : data?.data.map((item, index) => (
                        <div
                          key={`search-result-key-${index}`}
                          className="py-2.5 ps-5 pe-10 border-b border-black/5 scroll-snap-align-start transition-colors duration-200 hover:bg-fill-four"
                          onClick={clear}
                        >
                          <SearchProduct item={item} key={index} lang={lang} />
                        </div>
                      ))}
                </div>
              </Scrollbar>
              {data?.data && (
                <div className="text-start  text-sm px-4 py-2 mt-2 border-t flex flex-row items-center gap-1">
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
            </div>
          )}
          {/* End of search result */}
        </div>
      </div>
    );
  }
);

Search.displayName = 'Search';
export default Search;
