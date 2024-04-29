export const groupBy = <T>(items: T[], keySelector: (item: T) => string): Record<string, T[]> => {
  return items.reduce((groups: Record<string, T[]>, item: T) => {
    const key = keySelector(item);
    if (!groups[key]) groups[key] = [];
    groups[key].push(item);
    return groups;
  }, {});
};
