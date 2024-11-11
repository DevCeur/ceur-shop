interface FormatProductPriceOptions {
  price: number;
}

export const formatProductPrice = ({ price }: FormatProductPriceOptions) => {
  const priceFormatter = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  });

  const formattedPrice = priceFormatter.format(price);

  return formattedPrice;
};
