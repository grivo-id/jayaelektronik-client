import { OrderApiResponse, ProductFromOrderResult } from '@framework/types';

export function convertRupiah(amount: number): string {
  return `Rp${amount.toLocaleString("id-ID")}`; 
};

// Checkout
export const redirectToWhatsAppCartEn = (orderResult: OrderApiResponse) => {
  // const phoneNumber = '+62816270158';
  const phoneNumber = '+6281356530099';

  let message = `Hi,\n\nI would like to place an order: ${orderResult.order_id} with products:\n`;
  orderResult.products.forEach(
    (item: ProductFromOrderResult, index: number) => {
      message += `${index + 1}. ${item.product_name} - Quantity: ${item.product_qty} - Subtotal: ${convertRupiah(item.product_subtotal)}\n`;
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

export const redirectToWhatsAppCartIna = (orderResult: OrderApiResponse) => {
  // const phoneNumber = '+62816270158';
  const phoneNumber = '+6281356530099';

  let message = `Halo,\n\nSaya ingin melakukan pemesanan: ${orderResult.order_id} dengan produk:\n`;
  orderResult.products.forEach(
    (item: ProductFromOrderResult, index: number) => {
      message += `${index + 1}. ${item.product_name} - Jumlah: ${item.product_qty} - Subtotal: ${convertRupiah(item.product_subtotal)}\n`;
    }
  );

  const defaultAddress = JSON.parse(
    sessionStorage.getItem('default_address') || '{}'
  );
  message += `\n*Alamat Pengiriman:*\n`;
  message += `- *Kirim Ke:* ${defaultAddress.shipping_address_title}\n`;
  message += `- *Alamat Lengkap*: ${defaultAddress.shipping_address_desc}\n\n`;

  if (orderResult.coupon_code) {
    message += `Kupon Digunakan: ${orderResult.coupon_code}\n`;
  }

  message += `*Total*: Rp${orderResult.order_grand_total.toLocaleString()}\n\n`;
  message += `Terima kasih!`;

  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;
  window.open(whatsappURL, '_blank');
};

//Customer Care
export const redirectToWhatsAppCSIndonesia = () => {
  const phoneNumber = '+62816270158';

  let message = `Halo Admin Jaya Elektronik,\n saya membutuhkan bantuan support terkait:\n`;

  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;
  window.open(whatsappURL, '_blank');
};

export const redirectToWhatsAppCSEn = () => {
  const phoneNumber = '+62816270158';

  let message = `Hello Jaya Elektronik Admin,\n I need support regarding:\n`;

  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;
  window.open(whatsappURL, '_blank');
};
