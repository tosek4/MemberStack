export const formatPrice = (
  price: number,
  currency: string,
): string => {
  if (!currency) {
    return price.toLocaleString('en-GB')
  }

  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency,
  }).format(price)
}