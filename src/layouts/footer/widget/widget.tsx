import WidgetLink from './widget-link';
import WidgetAbout from './widget-about-us';
import Container from '@components/ui/container';
import { footer } from '../data';
import cn from 'classnames';
import { useUI } from '@contexts/ui.context';

interface WidgetsProps {
  lang: string;
  variant?: 'default' | 'medium';
  widgets: {
    id: number;
    widgetTitle: string;
    lists: any;
  }[];
}

const Widgets: React.FC<WidgetsProps> = ({
  lang,
  widgets,
  variant = 'default',
}) => {
  const { social } = footer;
  const { isAuthorized } = useUI();
  // console.log(isLoading, error)
  // console.log(isAuthorized);

  const getFilteredLists = (widgetId: number, lists: any[]) => {
    if (widgetId === 2) {
      if (isAuthorized) {
        return lists.filter((item) =>
          [
            'link-account',
            'link-checkout',
            'link-myoder',
            'link-wishlist',
          ].includes(item.title)
        );
      } else {
        return lists.filter((item) =>
          ['link-signin', 'link-signup', 'link-checkout'].includes(item.title)
        );
      }
    }

    return lists;
  };

  return (
    <Container>
      <div className="grid grid-cols-2 md:grid-cols-7 xl:grid-cols-12 gap-5 sm:gap-9 lg:gap-11 xl:gap-7 pb-[50px] pt-10 md:pt-16">
        <WidgetAbout
          social={social}
          className="col-span-full sm:col-span-1 md:col-span-3"
          lang={lang}
        />
        {widgets?.slice(0, 3)?.map((widget) => (
          <WidgetLink
            key={`footer-widget--key${widget.id}`}
            data={{
              ...widget,
              lists: getFilteredLists(widget.id, widget.lists),
            }}
            className="pb-3.5 sm:pb-0 col-span-1 md:col-span-2"
            lang={lang}
          />
        ))}
      </div>
    </Container>
  );
};

export default Widgets;
