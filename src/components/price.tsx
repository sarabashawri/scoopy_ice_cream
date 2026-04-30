export function formatSAR(amount: number) {
  return `${amount.toFixed(2)} ر.س`;
}

export function Price({ amount, className }: { amount: number; className?: string }) {
  return <span className={className}>{formatSAR(amount)}</span>;
}
