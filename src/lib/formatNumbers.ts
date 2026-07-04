export function formatNumberInput(value: string) {
  const withoutCommas = value.replace(/,/g, "");

  const cleaned = withoutCommas.replace(/[^\d.]/g, "");

  const firstDotIndex = cleaned.indexOf(".");
  const hasDecimal = firstDotIndex !== -1;

  let integerPart = cleaned;
  let decimalPart = "";

  if (hasDecimal) {
    integerPart = cleaned.slice(0, firstDotIndex);
    decimalPart = cleaned.slice(firstDotIndex + 1).replace(/\./g, "");
  }

  integerPart = integerPart.replace(/^0+(?=\d)/, "");

  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return hasDecimal ? `${formattedInteger}.${decimalPart}` : formattedInteger;
}

export function unformatNumberInput(value: string) {
  return value.replace(/,/g, "");
}