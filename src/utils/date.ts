export const toDateString = (date: any, reverse?: boolean) => {
  const strs = new Date(date).toISOString().split('T')
  let dates = strs[0].split('-')
  reverse && (dates = dates.reverse())
  return dates.map((e) => `00${e}`.slice(+e > 31 ? -4 : -2)).join('/')
}
