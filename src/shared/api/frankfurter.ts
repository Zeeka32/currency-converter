import { useMemo } from "react";
import { useQueries, useQuery } from "@tanstack/react-query";
import type { CurrencyCode } from "../constants/flagIcons";
import {
  getUniqueCurrenciesFromPairs,
  type CurrencyPairValue,
} from "../../lib/currencyRates";

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
  date?: string,
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

export const useBaseToQuotes = (
  base: CurrencyCode,
  quotes: CurrencyCode[],
  date?: string,
  enabled = true,
) => {
  const sortedQuotes = useMemo(() => [...quotes].sort(), [quotes]);

  return useQuery({
    queryKey: ["rates", base, sortedQuotes, date],
    queryFn: () => fetchCurrencyBaseToQuotes(base, sortedQuotes, date),
    staleTime: 1000 * 60 * 5,
    enabled: enabled && sortedQuotes.length > 0,
  });
};

export const useBasesToQuotes = (
  pairs: CurrencyPairValue[],
  date?: string,
) => {
  const grouped = useMemo(() => {
    return pairs.reduce<Partial<Record<CurrencyCode, Set<CurrencyCode>>>>(
      (acc, { from, to }) => {
        if (!acc[from]) {
          acc[from] = new Set();
        }

        acc[from].add(to);

        return acc;
      },
      {},
    );
  }, [pairs]);

  return useQueries({
    queries: Object.entries(grouped).map(([from, tos]) => {
      const quotes = [...tos].sort();

      return {
        queryKey: ["rates", from, quotes, date],
        queryFn: () =>
          fetchCurrencyBaseToQuotes(from as CurrencyCode, quotes, date),
        staleTime: 1000 * 60 * 5,
      };
    }),
  });
};

export const useReferenceRatesForPairs = (
  pairs: CurrencyPairValue[],
  date?: string,
  referenceBase: CurrencyCode = "EUR",
) => {
  const quotes = useMemo(() => {
    return getUniqueCurrenciesFromPairs(pairs, referenceBase);
  }, [pairs, referenceBase]);

  return useBaseToQuotes(referenceBase, quotes, date, pairs.length > 0);
};