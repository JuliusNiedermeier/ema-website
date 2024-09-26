export const mapRange = (inputValue: number, inputRange: [number, number], outputRange: [number, number]) => {
  const [inMin, inMax] = inputRange;
  const [outMin, outMax] = outputRange;

  // Calculate the proportion of the input value within the input range
  const inputProportion = (inputValue - inMin) / (inMax - inMin);

  // Calculate the corresponding value in the output range
  return outMin + inputProportion * (outMax - outMin);
};
