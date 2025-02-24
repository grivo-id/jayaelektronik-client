export const redirectToWhatsAppCSIndonesia = () => {
  const phoneNumber = '+6281394757477';
  //   const phoneNumber = '+62816270158';

  let message = `Halo Admin Jaya Elektronik,\n saya membutuhkan bantuan support terkait:\n`;

  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;
  window.open(whatsappURL, '_blank');
};

export const redirectToWhatsAppCSEn = () => {
  const phoneNumber = '+6281394757477';
  //   const phoneNumber = '+62816270158';

  let message = `Hello Jaya Elektronik Admin,\n I need support regarding:\n`;

  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;
  window.open(whatsappURL, '_blank');
};
