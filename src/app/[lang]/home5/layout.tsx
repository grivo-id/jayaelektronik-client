import StandardLayout from '@layouts/home5/layout';

export default function DefaultLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: {
    lang: string;
  };
}) {
  return <StandardLayout lang={lang}>{children}</StandardLayout>;
}
