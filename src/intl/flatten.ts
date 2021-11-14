export function flatten(data: Record<string, unknown>): Record<string, string> {
  const toReturn: Record<string, string> = {};
  for (const i in data) {
    if (typeof data[i] === 'object') {
      const flatObject = flatten(data[i] as Record<string, unknown>);
      for (const x in flatObject) {
        toReturn[i + '.' + x] = flatObject[x];
      }
    } else {
      toReturn[i] = data[i] as string;
    }
  }
  return toReturn;
}
