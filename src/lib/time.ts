export const toLocaleTime = (time: number | string) => {
  const date = new Date(time)
  return date.toLocaleString()
}
