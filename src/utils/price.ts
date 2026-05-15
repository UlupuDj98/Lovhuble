export function formatPrice(amount: number): string {
  return `€${(amount/100).toFixed(2).replace('.', ',')}`
}
