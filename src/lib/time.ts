export const toLocaleTime = (time: string) => {
  const date = new Date(time)
  return date.toLocaleString()
}
