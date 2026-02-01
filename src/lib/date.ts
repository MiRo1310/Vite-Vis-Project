export function getLocalTimeString(date: string) {
  return new Date(date).toLocaleTimeString();
}

export function localDateStringToDate(date: string) {
  const [day, month, year] = date.split(".").map(Number);

  if (isNaN(day) || isNaN(month) || isNaN(year)) {
    throw new Error("Invalid date format");
  }

  return new Date(year, month - 1, day);
}
