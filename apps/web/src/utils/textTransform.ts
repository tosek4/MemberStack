export const getInitials = (name: string) => {
  if (!name) return ''
  return name
    .split(' ')
    .map((n) => n.charAt(0))
    .join('')
    .slice(0, 2)
    .toUpperCase()
}
