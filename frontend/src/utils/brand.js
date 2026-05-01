export const getWhatsAppLink = (
  phone = "8801334705101",
  message = "Hi, I’m interested in your services. Please get back to me."
) => {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phone}?text=${encodedMessage}`;
};


export const getPhoneNumber = () => "tel:+8801334705101";

export const getBrandName = () => "DigiWeb";

export const getBrandLogo = () => "/digiweb1.png";

export const getMetaTitle = () => "DigiWeb";
export const getMetaDescription = () => "DigiWeb";
