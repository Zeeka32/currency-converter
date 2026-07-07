import { type ComponentProps, useMemo } from "react";
import type { CurrencyCode } from "@/shared/constants/flagIcons";
import classes from "./marquee.module.css";
import { MarqueeCard } from "../ui/MarqueeCard/marqueeCard";
import { CircleIcon } from "@phosphor-icons/react";
import { useReferenceRatesForPairs } from "@/shared/api/frankfurter";
import {
  buildReferenceRateMap,
  getCrossRate,
  getPercentChange,
  getPreviousRateDates,
  type CurrencyPairValue,
} from "@/lib/currencyRates";

const popularPairs: CurrencyPairValue[] = [
  { from: "EUR", to: "USD" },
  { from: "EUR", to: "GBP" },
  { from: "EUR", to: "JPY" },
  { from: "EUR", to: "CHF" },
  { from: "EUR", to: "AUD" },
  { from: "EUR", to: "CAD" },

  { from: "GBP", to: "USD" },
  { from: "GBP", to: "JPY" },
  { from: "GBP", to: "CHF" },
  { from: "GBP", to: "AUD" },
  { from: "GBP", to: "CAD" },

  { from: "AUD", to: "JPY" },
  { from: "AUD", to: "USD" },

  { from: "CAD", to: "JPY" },

  { from: "NZD", to: "JPY" },
  { from: "NZD", to: "USD" },

  { from: "USD", to: "CAD" },
  { from: "USD", to: "JPY" },
  { from: "USD", to: "CHF" },
  { from: "USD", to: "EGP" },
  { from: "USD", to: "CNY" },
  { from: "USD", to: "INR" },
  { from: "USD", to: "BRL" },
  { from: "USD", to: "TRY" },
  { from: "USD", to: "ZAR" },
];

type MarqueeProps = ComponentProps<"div">;

const REFERENCE_BASE: CurrencyCode = "EUR";

export function Marquee({ className = "", ...props }: MarqueeProps) {
  const { latestDate, previousDate } = getPreviousRateDates();

  const latest = useReferenceRatesForPairs(
    popularPairs,
    latestDate,
    REFERENCE_BASE,
  );

  const previous = useReferenceRatesForPairs(
    popularPairs,
    previousDate,
    REFERENCE_BASE,
  );

  const latestReferenceRateMap = useMemo(() => {
    return buildReferenceRateMap(latest.data ?? [], REFERENCE_BASE);
  }, [latest.data]);

  const previousReferenceRateMap = useMemo(() => {
    return buildReferenceRateMap(previous.data ?? [], REFERENCE_BASE);
  }, [previous.data]);

  return (
    <div className={`${classes.marquee} ${className}`} {...props}>
      <div className={classes.header}>
        <CircleIcon size={10} weight="fill" />
        <h4>Live Markets</h4>
      </div>

      <div className={classes.track}>
        {popularPairs.map((pair) => {
          const latestRate = getCrossRate(latestReferenceRateMap, pair);
          const previousRate = getCrossRate(previousReferenceRateMap, pair);
          const change = getPercentChange(latestRate, previousRate);

          return (
            <MarqueeCard
              key={`${pair.from}-${pair.to}`}
              from={pair.from}
              to={pair.to}
              rate={latestRate ?? 0}
              change={change ?? 0}
            />
          );
        })}
      </div>
    </div>
  );
}
