interface FormatProductPriceOptions {
  price: number;
}

export const formatProductPrice = ({ price }: FormatProductPriceOptions) => {
  const priceFormatter = new Intl.NumberFormat("us-US", {
    style: "currency",
    currency: "USD",
  });

  const formattedPrice = priceFormatter.format(price);

  return formattedPrice;
};
