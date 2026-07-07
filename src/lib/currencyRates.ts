import type { CurrencyCode } from "@/shared/constants/flagIcons";

export type CurrencyPairValue = {
  from: CurrencyCode;
  to: CurrencyCode;
};

export type CurrencyRate = {
  date: string;
  base: CurrencyCode;
  quote: CurrencyCode;
  rate: number;
};

export function formatRateDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function getPreviousRateDates() {
  const today = new Date();

  const latest = new Date(today);
  latest.setDate(today.getDate() - 1);

  const previous = new Date(today);
  previous.setDate(today.getDate() - 2);

  return {
    latestDate: formatRateDate(latest),
    previousDate: formatRateDate(previous),
  };
}

export function flattenRates(
  queries: { data?: CurrencyRate[] }[],
): CurrencyRate[] {
  return queries.flatMap((query) => query.data ?? []);
}

export function pairKey(from: CurrencyCode, to: CurrencyCode) {
  return `${from}-${to}`;
}

export function buildPairRateMap(rates: CurrencyRate[]) {
  return new Map(
    rates.map((rate) => [pairKey(rate.base, rate.quote), rate.rate]),
  );
}

export function getPairRate(
  rateMap: Map<string, number>,
  pair: CurrencyPairValue,
) {
  return rateMap.get(pairKey(pair.from, pair.to)) ?? null;
}

export function getAbsoluteChange(
  latestRate: number | null,
  previousRate: number | null,
) {
  if (latestRate === null || previousRate === null) return null;

  return latestRate - previousRate;
}

export function getPercentChange(
  latestRate: number | null,
  previousRate: number | null,
) {
  if (latestRate === null || previousRate === null || previousRate === 0) {
    return null;
  }

  return ((latestRate - previousRate) / previousRate) * 100;
}

export function getUniqueCurrenciesFromPairs(
  pairs: CurrencyPairValue[],
  exclude?: CurrencyCode,
) {
  const currencies = new Set<CurrencyCode>();

  pairs.forEach(({ from, to }) => {
    currencies.add(from);
    currencies.add(to);
  });

  if (exclude) {
    currencies.delete(exclude);
  }

  return [...currencies].sort();
}

export function buildReferenceRateMap(
  rates: CurrencyRate[],
  referenceBase: CurrencyCode,
) {
  const rateMap = new Map<CurrencyCode, number>();

  rateMap.set(referenceBase, 1);

  rates.forEach((rate) => {
    rateMap.set(rate.quote, rate.rate);
  });

  return rateMap;
}

export function getCrossRate(
  referenceRateMap: Map<CurrencyCode, number>,
  pair: CurrencyPairValue,
) {
  const fromRate = referenceRateMap.get(pair.from);
  const toRate = referenceRateMap.get(pair.to);

  if (!fromRate || !toRate) return null;

  return toRate / fromRate;
}