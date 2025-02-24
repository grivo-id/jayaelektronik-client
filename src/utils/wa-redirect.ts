import { OrderApiResponse, ProductFromOrderResult } from '@framework/types';

export const redirectToWhatsAppCart = (userData: any) => {
  const phoneNumber = '+62816270158';
  const cartString = localStorage.getItem('razor-cart');

  // Parse twice since the string is double-escaped
  const storedCart = JSON.parse(JSON.parse(cartString || '{"items":[]}'));

  let message = `Hi Jaya Elektronik,\n\nI would like to place an order with the following details:\n\n`;

  // Add user information
  message += `*Customer Details:*\n`;
  message += `- *Name*: ${userData.user_fname} ${userData.user_lname}\n`;
  message += `- *Email*: ${userData.user_email}\n`;
  message += `- *Phone*: ${userData.user_phone}\n\n`;

  // Add shipping address
  const defaultAddress = JSON.parse(
    sessionStorage.getItem('default_address') || '{}'
  );
  message += `*Shipping Address:*\n`;
  message += `- *Title*: ${defaultAddress.shipping_address_title}\n`;
  message += `- *Address*: ${defaultAddress.shipping_address_desc}\n\n`;

  // Add product details from localStorage
  message += `*Order Details:*\n`;
  storedCart.items.forEach((item: any, index: number) => {
    message += `*Product ${index + 1}:*\n`;
    message += `- *Name*: ${item.name}\n`;
    message += `- *Quantity*: ${item.quantity}\n`;
    message += `- *Price*: Rp${item.price.toLocaleString()}\n`;
    message += `- *Total*: Rp${item.itemTotal.toLocaleString()}\n\n`;
  });

  message += `*Total Order*: Rp${storedCart.total.toLocaleString()}\n\n`;
  message += `Please let me know if you need any further information.\n\nThank you!`;

  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;
  window.open(whatsappURL, '_blank');
};

export const redirectToWhatsAppCartV2 = (orderResult: OrderApiResponse) => {
  const phoneNumber = '+62816270158';

  let message = `Hi,\n\nI would like to place an order: ${orderResult.order_id} with products:\n`;
  orderResult.products.forEach(
    (item: ProductFromOrderResult, index: number) => {
      message += `${index + 1}. ${item.product_name}\n`;
    }
  );

  const defaultAddress = JSON.parse(
    sessionStorage.getItem('default_address') || '{}'
  );
  message += `\n*Shipping Address:*\n`;
  message += `- *Ship To:*: ${defaultAddress.shipping_address_title}\n`;
  message += `- *Full Address*: ${defaultAddress.shipping_address_desc}\n\n`;

  if (orderResult.coupon_code) {
    message += `Coupon Used: ${orderResult.coupon_code}\n`;
  }

  message += `*Total*: Rp${orderResult.order_grand_total.toLocaleString()}\n\n`;
  message += `Thank you!`;

  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;
  window.open(whatsappURL, '_blank');
};
