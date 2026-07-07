import { lazy, Suspense } from "react";
import {
  getGraphStats,
  useCurrencyGraphData,
  type GraphRange,
} from "@/shared/api/frankfurter";
import Card from "../ui/Card/Card";
import { GraphTaps } from "../ui/GraphTaps/graphTaps";
import classes from "./history.module.css";
import type { CurrencyCode } from "@/shared/constants/flagIcons";
import { useCurrencyConverter } from "@/shared/contexts/currencyConverterContext";
import Empty from "../ui/Empty/empty";
import SimpleLoader from "../ui/InputField/SimpleLoader/simpleLoader";

const CurrencyGraph = lazy(() =>
  import("../CurrencyGraph/currencyGraph").then((module) => ({
    default: module.CurrencyGraph,
  })),
);

const cards = ({
  open,
  last,
  change,
  percentChange,
}: {
  open: number;
  last: number;
  change: number;
  percentChange: number;
}) => {
  return [
    {
      title: "OPEN",
      value: open,
      change: "normal" as const,
    },
    {
      title: "LAST",
      value: last,
      change: "normal" as const,
    },
    {
      title: "CHANGE",
      value: change.toFixed(2),
      change: "change" as const,
    },
    {
      title: "% CHANGE",
      value: percentChange.toFixed(2),
      change: "%" as const,
    },
  ];
};

function History() {
  const { sourceCurrency, targetCurrency, selectedGraphRange } =
    useCurrencyConverter();

  const {
    data = [],
    isLoading,
    isFetching,
    isError,
    fetchStatus,
  } = useCurrencyGraphData({
    base: sourceCurrency.code as CurrencyCode,
    quote: targetCurrency.code as CurrencyCode,
    range: selectedGraphRange as GraphRange,
  });

  const isLoadingState = isLoading || isFetching;
  const hasNoData = !isLoadingState && data.length === 0;
  const isPaused = fetchStatus === "paused";

  if (isError || isPaused || hasNoData) {
    return (
      <Empty
        header="No chart data available"
        body={`We couldn't load rate history for ${sourceCurrency.code}/${targetCurrency.code} right now. This usually clears up in a minute.`}
      />
    );
  }

  const graphStats = getGraphStats(data);

  return (
    <div className={classes["history"]}>
      <div className={classes["header"]}>
        <div className={classes["cards"]}>
          {cards(graphStats).map((card) => (
            <Card
              key={card.title}
              change={card.change}
              number={Number(card.value)}
              title={card.title}
              isLoading={isLoadingState}
            />
          ))}
        </div>

        <div className={classes["graph-buttons-container"]}>
          <GraphTaps />
        </div>
      </div>

      <Suspense fallback={<SimpleLoader />}>
        <CurrencyGraph
          data={data}
          isLoading={isLoadingState}
          baseCode={sourceCurrency.code as CurrencyCode}
          quoteCode={targetCurrency.code as CurrencyCode}
          range={selectedGraphRange as GraphRange}
        />
      </Suspense>
    </div>
  );
}

export default History;
