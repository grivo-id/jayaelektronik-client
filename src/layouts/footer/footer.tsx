'use client';

import Widgets from '@layouts/footer/widget/widget';
import Copyright from '@layouts/footer/copyright';
import { footer } from './data';
const { widgets, payment } = footer;

interface FooterProps {
  variant?: 'default' | 'medium';
  lang: string;
}

const Footer: React.FC<FooterProps> = ({ variant = 'default', lang }) => {
  return (
    <footer className="footer-one bg-white text-gray-400 border-t border-gray-300/75 ">
      <Widgets widgets={widgets} variant={variant} lang={lang} />
      <Copyright payment={payment} variant={variant} lang={lang} />
    </footer>
  );
};

export default Footer;
