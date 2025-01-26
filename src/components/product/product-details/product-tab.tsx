import { useState } from 'react';
import { Tab } from '@headlessui/react';
import Heading from '@components/ui/heading';
import ProductReviewRating from './product-review-rating';

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

type Props = {
  lang: string;
  product_desc?: any;
};

export default function ProductDetailsTab({ lang, product_desc }: Props) {
  let [tabHeading] = useState({
    Product_Details: '',
    // Review_Rating: '',
  });

  return (
    <div className="w-full xl:px-2 py-11 lg:py-14 xl:py-16 sm:px-0">
      <Tab.Group>
        <Tab.List className="block border-b border-border-base">
          {Object.keys(tabHeading).map((item) => (
            <Tab
              key={item}
              className={({ selected }) =>
                classNames(
                  'relative font-semibold inline-block transition-all text-18px lg:text-[20px] leading-5  focus:outline-none pb-3 lg:pb-5 hover:text-brand ltr:mr-8 rtl:ml-8',
                  selected
                    ? 'text-brand-dark  after:absolute after:w-full after:h-0.5 after:bottom-0 after:translate-y-[1px] after:ltr:left-0 after:rtl:right-0 after:bg-brand'
                    : 'text-gray-400'
                )
              }
            >
              {item.split('_').join(' ')}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-6 lg:mt-9">
          <Tab.Panel className="lg:flex">
            <div className="text-sm sm:text-15px text-brand-muted leading-[2em] space-y-4 lg:space-y-5 xl:space-y-7">
              <span dangerouslySetInnerHTML={{ __html: product_desc }} />
            </div>
          </Tab.Panel>
          {/* <Tab.Panel>
            <ProductReviewRating lang={lang} />
          </Tab.Panel> */}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
