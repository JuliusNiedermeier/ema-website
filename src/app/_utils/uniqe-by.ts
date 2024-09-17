export const uniqueBy = <Item, Key>(items: Item[], extractKey: (item: Item) => Key) => {
  const seenKeys = new Set<Key>();
  return items.filter((item) => {
    const key = extractKey(item);
    return seenKeys.has(key) ? false : seenKeys.add(key);
  });
};
