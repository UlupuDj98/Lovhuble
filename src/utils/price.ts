export function formatPrice(amount: number): string {
  return `€${Number(amount ?? 0).toFixed(2).replace('.', ',')}`
}
