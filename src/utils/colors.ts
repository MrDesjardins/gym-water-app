// https://medialab.github.io/iwanthue/
export const colorByRep = [
  "#bcd6eb",
  "#8a96f7",
  "#72ddee",
  "#81a0f0",
  "#5cb6c6",
  "#47a2f7",
  "#8cb1bd",
  "#66a1e5",
  "#9cacc6",
  "#45adec",
  "#a7ade3",
  "#60bce8",
  "#74aff3",
  "#84b9d6",
  "#7aa0d3",
  "#95bbef",
];

/**
 * Convert a hex color to rgba.
 *
 * This function is memoized. While simple, making it so reduce of 1/3 the drawing time.
 *
 * @param hexColorValue: string that start with #
 */
export const hex2rgba = ((): ((hexColorValue: string, a: number) => string) => {
  const m = new Map();
  const expensiveHex2rgba = (hexColorValue: string, a: number) => {
    if (m.has(hexColorValue)) {
      return m.get(hexColorValue);
    }
    const r = parseInt(hexColorValue.slice(1, 3), 16);
    const g = parseInt(hexColorValue.slice(3, 5), 16);
    const b = parseInt(hexColorValue.slice(5, 7), 16);
    const result = `rgba(${r}, ${g}, ${b}, ${a})`;
    m.set(hexColorValue, result);
    return result;
  };
  return expensiveHex2rgba;
})();
