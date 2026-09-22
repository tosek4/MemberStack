export const addDays = (dateString: string, days: number) => {
  if (!dateString || !days) {
    return ''
  }
  const date = new Date(`${dateString}T00:00:00`)

  date.setDate(date.getDate() + days)

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}
