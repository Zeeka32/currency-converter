import { type ComponentProps } from "react";
import type { CurrencyCode } from "@/shared/constants/flagIcons";
import classes from "./marquee.module.css";
import { MarqueeCard } from "../ui/MarqueeCard/marqueeCard";
import { CircleIcon } from "@phosphor-icons/react";
import { useBasesToQuotes } from "@/shared/api/frankfurter";

const popularPairs: { from: CurrencyCode; to: CurrencyCode }[] = [
  // Major pairs
  { from: "EUR", to: "USD" },
  { from: "GBP", to: "USD" },
  { from: "USD", to: "JPY" },
  { from: "USD", to: "CHF" },
  { from: "AUD", to: "USD" },
  { from: "USD", to: "CAD" },
  { from: "NZD", to: "USD" },

  // EUR crosses
  { from: "EUR", to: "GBP" },
  { from: "EUR", to: "JPY" },
  { from: "EUR", to: "CHF" },
  { from: "EUR", to: "AUD" },
  { from: "EUR", to: "CAD" },

  // GBP crosses
  { from: "GBP", to: "JPY" },
  { from: "GBP", to: "CHF" },
  { from: "GBP", to: "AUD" },
  { from: "GBP", to: "CAD" },

  // Commodity currencies
  { from: "AUD", to: "JPY" },
  { from: "CAD", to: "JPY" },
  { from: "NZD", to: "JPY" },

  // Emerging market pairs
  { from: "USD", to: "EGP" },
  { from: "USD", to: "CNY" },
  { from: "USD", to: "INR" },
  { from: "USD", to: "BRL" },
  { from: "USD", to: "TRY" },
  { from: "USD", to: "ZAR" },
];

type MarqueeProps = ComponentProps<"div">;
export function Marquee({ className = "", ...props }: MarqueeProps) {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const dayBefore = new Date(today);
  dayBefore.setDate(today.getDate() - 2);
  const formatDate = (date: Date) => date.toISOString().split("T")[0];
  const latest = useBasesToQuotes(popularPairs, formatDate(yesterday));
  const beforeLatest = useBasesToQuotes(popularPairs, formatDate(dayBefore));
  const latestRates = latest.flatMap((query) => query.data ?? []);
  const dayBeforeRates = beforeLatest.flatMap((query) => query.data ?? []);

  return (
    <div className={`${classes.marquee} ${className}`} {...props}>
      <div className={classes.header}>
        <CircleIcon size={10} weight="fill" /> <h4>Live Markets</h4>
      </div>

      <div className={classes.track}>
        {popularPairs.map((pair) => {
          const latestRate = latestRates.find(
            (rate: any) => rate.base === pair.from && rate.quote === pair.to,
          );

          const previousRate = dayBeforeRates.find(
            (rate: any) => rate.base === pair.from && rate.quote === pair.to,
          );

          const change =
            latestRate && previousRate
              ? ((latestRate.rate - previousRate.rate) / previousRate.rate) *
                100
              : null;

          return (
            <MarqueeCard
              key={`${pair.from}-${pair.to}`}
              from={pair.from}
              to={pair.to}
              rate={latestRate?.rate ?? 0}
              change={change !== null ? Number(change) : 0}
            />
          );
        })}
      </div>
    </div>
  );
}
