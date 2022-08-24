export function addAlphaInRGBStringColor(
  rgbcolor: string,
  opacity: number
): string {
  var numbersWithComma = rgbcolor.replace(/\D/g, ",");

  const arrayNumbers = numbersWithComma
    .split(",")
    .filter((value) => value != "");

  return `rgba(${arrayNumbers[0]} ,${arrayNumbers[1]},${arrayNumbers[2]},${opacity})`;
}
