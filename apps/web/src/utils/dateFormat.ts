export const formatDate = (
  value: string | Date,
): string => {
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(value))
}

export const getCurrentDate = (): string => {
  const date = new Date()

  return date.toISOString().split('T')[0]
}