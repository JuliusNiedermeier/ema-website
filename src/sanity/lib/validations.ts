import { ArrayRule, StringRule } from "sanity";

// String validation

type StringSizeBounds = [number, number];
type NamedStringSizeBounds = keyof typeof stringSizeBoundsMap;

const stringSizeBoundsMap = {
  label: [2, 30],
  heading: [5, 60],
  "short-description": [20, 100],
  description: [100, 300],
  name: [3, 30],
} satisfies Record<string, StringSizeBounds>;

const getSize = (size: NamedStringSizeBounds | StringSizeBounds) => {
  return Array.isArray(size) ? size : stringSizeBoundsMap[size];
};

export const createStringValidation = (size: NamedStringSizeBounds | StringSizeBounds) => {
  const [min, max] = getSize(size);
  return (r: StringRule) => r.required().min(min).max(max);
};

export const validateString = (value: string | undefined, size: NamedStringSizeBounds | StringSizeBounds) => {
  if (!value) return false;
  const [min, max] = getSize(size);
  return value.length >= min && value.length <= max;
};

// Array validation

type ArraySizeBounds = StringSizeBounds;

export const createArrayValidation = <V>([min, max]: ArraySizeBounds) => {
  return (r: ArrayRule<V>) => r.min(min).max(max);
};
