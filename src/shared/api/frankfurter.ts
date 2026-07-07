import { useQueries, useQuery } from "@tanstack/react-query";
import type { CurrencyCode } from "../constants/flagIcons";

const url = "https://api.frankfurter.dev/v2";

const fetchCurrencyBase = async (query: string = "") => {
  const response = await fetch(
    `${url}/rates?base=${encodeURIComponent(query)}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch currency data");
  }

  return response.json();
};

export const useCurrencies = (query: string = "") => {
  return useQuery({
    queryKey: ["currencies", query],
    queryFn: () => fetchCurrencyBase(query),
    staleTime: 1000 * 60 * 5,
    enabled: query.trim().length >= 2,
  });
};

const fetchCurrencyBaseToQuotes = async (
  base: CurrencyCode,
  quotes: CurrencyCode[],
  date?: string, // YYYY-MM-DD
) => {
  const params = new URLSearchParams({
    base,
    quotes: quotes.join(","),
  });

  if (date) {
    params.set("date", date);
  }

  const response = await fetch(`${url}/rates?${params.toString()}`);

  if (!response.ok) {
    throw new Error("Failed to fetch currency data");
  }

  return response.json();
};

export const useBasesToQuotes = (
  favorites: { from: CurrencyCode; to: CurrencyCode }[],
  date?: string,
) => {
  const grouped = favorites.reduce<Record<CurrencyCode, Set<CurrencyCode>>>(
    (acc, { from, to }) => {
      if (!acc[from]) {
        acc[from] = new Set();
      }

      acc[from].add(to);

      return acc;
    },
    {} as Record<CurrencyCode, Set<CurrencyCode>>,
  );

  return useQueries({
    queries: Object.entries(grouped).map(([from, tos]) => ({
      queryKey: ["rates", from, [...tos].sort(), date],
      queryFn: () =>
        fetchCurrencyBaseToQuotes(from as CurrencyCode, [...tos], date),
    })),
  });
};
