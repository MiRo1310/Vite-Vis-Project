export const filterEnum = (_enum: Record<string, string>, filtered: string[]) => {
  const array = [];
  for (const val in _enum) {
    if (filtered.some((f) => val.toLocaleLowerCase().includes(f.toLocaleLowerCase()))) {
      continue;
    }
    array.push(val);
  }
  return array;
};
