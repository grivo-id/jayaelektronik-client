import { NextResponse } from 'next/server';
import acceptLanguage from 'accept-language';

const fallbackLng = 'ina';
const languages = ['ina', 'en'];

acceptLanguage.languages(languages);

export const config = {
  // matcher: '/:lng*'
  matcher: [
    '/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|sitemap.xml|robots.txt).*)',
  ],
};

const cookieName = 'i18next';

export function middleware(req: any) {
  if (
    req.nextUrl.pathname.indexOf('icon') > -1 ||
    req.nextUrl.pathname.indexOf('chrome') > -1
  )
    return NextResponse.next();

  const firstSegment = req.nextUrl.pathname.split('/')[1];

  // if (
  //   firstSegment &&
  //   !languages.includes(firstSegment) &&
  //   !req.nextUrl.pathname.startsWith('/_next') &&
  //   !req.nextUrl.pathname.startsWith('/api')
  // ) {
  //   return new Response('Not Found', {
  //     status: 404,
  //     headers: {
  //       'Content-Type': 'text/plain',
  //     },
  //   });
  // }

  let lang;
  if (req.cookies.has(cookieName))
    lang = acceptLanguage.get(req.cookies.get(cookieName).value);
  if (!lang) lang = acceptLanguage.get(req.headers.get('Accept-Language'));
  if (!lang) lang = fallbackLng;

  // Redirect if path is empty or is the homepage
  if (
    (!req.nextUrl.pathname || req.nextUrl.pathname === '/') &&
    !req.nextUrl.pathname.startsWith('/_next')
  ) {
    return NextResponse.redirect(new URL(`/${lang}`, req.url));
  }

  if (req.headers.has('referer')) {
    const refererUrl = new URL(req.headers.get('referer'));
    const lngInReferer = languages.find((l) =>
      refererUrl.pathname.startsWith(`/${l}`)
    );
    const response = NextResponse.next();
    if (lngInReferer) response.cookies.set(cookieName, lngInReferer);
    return response;
  }

  return NextResponse.next();
}
