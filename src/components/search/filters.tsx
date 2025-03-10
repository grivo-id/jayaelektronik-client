import { CategoryFilter } from './category-filter';
import { BrandFilter } from './brand-filter';
import SelectedFilters from './selected-filters';

export const ShopFilters: React.FC<{ lang: string }> = ({ lang }) => {
  return (
    <div className="space-y-10">
      <SelectedFilters lang={lang} />
      <CategoryFilter lang={lang} />
      <BrandFilter lang={lang} />
    </div>
  );
};
