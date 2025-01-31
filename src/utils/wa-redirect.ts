export const redirectToWhatsAppCart = (userData: any) => {
  const phoneNumber = '+6285236891709';
  const cartString = localStorage.getItem('razor-cart');
  console.log('Cart String:', cartString);

  // Parse twice since the string is double-escaped
  const storedCart = JSON.parse(JSON.parse(cartString || '{"items":[]}'));
  console.log('Parsed Cart:', storedCart);

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
