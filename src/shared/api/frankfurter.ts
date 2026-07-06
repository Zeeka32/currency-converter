import { useQuery } from "@tanstack/react-query";

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