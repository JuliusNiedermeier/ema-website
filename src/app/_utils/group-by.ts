export const groupBy = <Item, Key extends string>(
  items: Item[],
  keySelector: (item: Item) => Key,
): Partial<Record<Key, Item[]>> => {
  return items.reduce((groups: Partial<Record<string, Item[]>>, item: Item) => {
    const key = keySelector(item);
    if (!groups[key]) groups[key] = [];
    groups[key].push(item);
    return groups;
  }, {});
};
