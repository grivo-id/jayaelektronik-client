'use client';

import { useEffect, useState } from 'react';
import { useBannersQuery } from '@framework/banner-ads/banner-ads';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export default function BannerPopupProvider() {
  const [isOpen, setIsOpen] = useState(false);
  const opt = {};
  const { data, isLoading, error } = useBannersQuery(opt);

  const banner = data?.data[0];
  const shouldShowBanner = banner && banner.banner_popup_is_show;

  useEffect(() => {
    const seenBanners = JSON.parse(
      sessionStorage.getItem('jayaPopupBanner') || '{}'
    );
    const hasSeen = banner ? seenBanners[banner.banner_popup_id] : false;

    if (shouldShowBanner && !hasSeen) {
      const isExpired = new Date(banner.banner_popup_expired_date) < new Date();

      if (!isExpired) {
        setIsOpen(true);
      }
    }
  }, [banner, shouldShowBanner]);

  const handleClose = () => {
    if (banner) {
      const seenBanners = JSON.parse(
        sessionStorage.getItem('jayaPopupBanner') || '{}'
      );
      seenBanners[banner.banner_popup_id] = true;
      sessionStorage.setItem('jayaPopupBanner', JSON.stringify(seenBanners));
    }
    setIsOpen(false);
  };

  if (!shouldShowBanner || !isOpen) {
    return null;
  }

  if (isLoading) {
    return null;
  }

  if (!isLoading && error) {
    return null;
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed z-[999999] inset-0 w-full h-full flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/40"
            onClick={handleClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />
          <motion.div
            className="max-w-3xl relative"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 20,
              duration: 0.5,
            }}
          >
            <motion.button
              onClick={handleClose}
              className="absolute right-2 top-2 p-1 rounded-full bg-white/80 text-gray-800 hover:bg-white z-10 shadow-md"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X />
            </motion.button>
            <Image
              src={banner.banner_popup_image}
              alt={banner.banner_popup_title || 'Promotional Banner'}
              width={800}
              height={800}
              className="cover rounded-lg shadow-xl"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
