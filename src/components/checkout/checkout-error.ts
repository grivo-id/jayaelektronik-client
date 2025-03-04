export const displayErrorCheckout = (errorMsg: string, lang: Function) => {
  switch (errorMsg) {
    case 'Coupon already redeemed! Please try another.':
      return lang('error-coupon-redeemed');
    case `Coupon code doesn't exist. Please try another.`:
      return lang('error-coupon-not-found');
    case `Coupon usage limit has been reached.`:
      return lang('error-coupon-limit');
    case 'Order has not reached the minimum product quantity required to use the coupon.':
      return lang('error-coupon-product-qty');
    case `Order has not reached the minimum transaction required to use the coupon.`:
      return lang('error-coupon-price');

    default:
      return lang('error-default-text');
  }
};
