import { ArrayRule, StringRule } from "sanity";

// String validation

type StringSizeBounds = [number, number];
type NamedStringSizeBounds = keyof typeof stringSizeBoundsMap;

const stringSizeBoundsMap = {
  label: [2, 30],
  heading: [5, 60],
  description: [100, 300],
  name: [3, 30],
} satisfies Record<string, StringSizeBounds>;

export const createStringValidation = (size: NamedStringSizeBounds | StringSizeBounds) => {
  const [min, max] = Array.isArray(size) ? size : stringSizeBoundsMap[size];
  return (r: StringRule) => r.required().min(min).max(max);
};

// Array validation

type ArraySizeBounds = StringSizeBounds;

export const createArrayValidation = <V>([min, max]: ArraySizeBounds) => {
  return (r: ArrayRule<V>) => r.min(min).max(max);
};
