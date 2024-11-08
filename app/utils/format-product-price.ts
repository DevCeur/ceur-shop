interface FormatProductPriceOptions {
  price: { value: number; currency: string };
}

export const formatProductPrice = ({ price }: FormatProductPriceOptions) => {
  const priceFormatter = new Intl.NumberFormat("us-US", {
    style: "currency",
    currency: price.currency,
  });

  const formattedPrice = priceFormatter.format(price.value);

  return formattedPrice;
};
