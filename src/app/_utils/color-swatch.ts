import { CSSProperties } from "react";

export type HSLValue = { h: number; s: number; l: number };
export type HSLColorSwatch = { primary: HSLValue; secondary: HSLValue };

export const ensureValidHSL = (hsl?: Partial<HSLValue>, scaleDecimalPercentages: boolean = true): HSLValue => {
  const factor = scaleDecimalPercentages ? 100 : 1;
  return { h: hsl?.h || 0, s: (hsl?.s || 0) * factor, l: (hsl?.l || 0) * factor };
};

export const createColorSwatch = (hsl: HSLValue): HSLColorSwatch => {
  return {
    primary: hsl,
    secondary: { ...hsl, s: hsl.s + 10, l: hsl.l + 4 },
  };
};

export const createHSLString = ({ h, s, l }: HSLValue) => `hsl(${h}deg ${s}% ${l}%)`;

export const createColorThemeStyles = (hsl: HSLValue): CSSProperties => {
  const { primary, secondary } = createColorSwatch(hsl);
  return {
    "--themed-primary": createHSLString(primary),
    "--themed-secondary": createHSLString(secondary),
  };
};
