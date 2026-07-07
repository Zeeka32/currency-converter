import { useQueries, useQuery } from "@tanstack/react-query";
import type { CurrencyCode } from "../constants/flagIcons";
import { useMemo } from "react";
import { getUniqueCurrenciesFromPairs, type CurrencyPairValue } from "@/lib/currencyRates";

const url = "https://api.frankfurter.dev/v2";

export type GraphRange = "1D" | "1W" | "1M" | "3M" | "1Y" | "5Y";

export type CurrencyGraphPoint = {
  date: string;
  rate: number;
};

type FrankfurterRateRow = {
  date: string;
  base: CurrencyCode;
  quote: CurrencyCode;
  rate: number;
};

function formatApiDate(date: Date) {
  return date.toISOString().split("T")[0];
}

function getGraphRangeConfig(range: GraphRange) {
  switch (range) {
    case "1D":
      return { days: 7, limit: 2 };
    case "1W":
      return { days: 10 };
    case "1M":
      return { days: 31 };
    case "3M":
      return { days: 93 };
    case "1Y":
      return { days: 370, group: "week" as const };
    case "5Y":
      return { days: 365 * 5, group: "month" as const };
    default:
      return { days: 31 };
  }
}

function normalizeGraphRates(
  data: unknown,
  quote: CurrencyCode,
): CurrencyGraphPoint[] {
  if (!Array.isArray(data)) return [];

  return data
    .filter((row): row is FrankfurterRateRow => {
      if (!row || typeof row !== "object") return false;

      const rateRow = row as FrankfurterRateRow;

      return (
        typeof rateRow.date === "string" &&
        rateRow.quote === quote &&
        typeof rateRow.rate === "number"
      );
    })
    .map((row) => ({
      date: row.date,
      rate: row.rate,
    }))
    .sort((a, b) => a.date.localeCompare(b.date));
}

async function fetchCurrencyGraphData({
  base,
  quote,
  range,
}: {
  base: CurrencyCode;
  quote: CurrencyCode;
  range: GraphRange;
}) {
  const { days, group, limit } = getGraphRangeConfig(range);

  const endDate = new Date();
  const startDate = new Date(endDate);
  startDate.setDate(endDate.getDate() - days);

  const params = new URLSearchParams({
    base,
    quotes: quote,
    from: formatApiDate(startDate),
    to: formatApiDate(endDate),
  });

  if (group) {
    params.set("group", group);
  }

  const response = await fetch(`${url}/rates?${params.toString()}`);

  if (!response.ok) {
    throw new Error("Failed to fetch graph data");
  }

  const data = await response.json();
  const graphData = normalizeGraphRates(data, quote);

  return limit ? graphData.slice(-limit) : graphData;
}

export function useCurrencyGraphData({
  base,
  quote,
  range,
}: {
  base: CurrencyCode;
  quote: CurrencyCode;
  range: GraphRange;
}) {
  return useQuery({
    queryKey: ["currency-graph", base, quote, range],
    queryFn: () => fetchCurrencyGraphData({ base, quote, range }),
    staleTime: 1000 * 60 * 5,
    enabled: base !== quote,
  });
}

export function getGraphStats(data: CurrencyGraphPoint[]) {
  if (data.length === 0) {
    return {
      open: 0,
      last: 0,
      change: 0,
      percentChange: 0,
    };
  }

  const open = data[0].rate;
  const last = data[data.length - 1].rate;
  const change = last - open;
  const percentChange = open === 0 ? 0 : (change / open) * 100;

  return {
    open,
    last,
    change,
    percentChange,
  };
}

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