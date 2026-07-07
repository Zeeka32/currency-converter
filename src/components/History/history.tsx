import {
  getGraphStats,
  useCurrencyGraphData,
  type GraphRange,
} from "@/shared/api/frankfurter";
import { CurrencyGraph } from "../CurrencyGraph/currencyGraph";
import Card from "../ui/Card/Card";
import { GraphTaps } from "../ui/GraphTaps/graphTaps";
import classes from "./history.module.css";
import type { CurrencyCode } from "@/shared/constants/flagIcons";
import { useCurrencyConverter } from "@/shared/contexts/currencyConverterContext";
import Empty from "../ui/Empty/empty";

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
  } = useCurrencyGraphData({
    base: sourceCurrency.code as CurrencyCode,
    quote: targetCurrency.code as CurrencyCode,
    range: selectedGraphRange as GraphRange,
  });

  const graphStats = getGraphStats(data);

  const isLoadingState = isLoading || isFetching;
  const hasNoData = !isLoadingState && data.length === 0;
  console.log(data);

  if (isError || hasNoData) {
    return (
      <Empty
        header="No chart data available"
        body="We couldn't load rate history for USD/EUR right now. This usually clears up in a minute."
      />
    );
  }

  return (
    <div className={classes["history"]}>
      <div className={classes["header"]}>
        <div className={classes["cards"]}>
          {cards(graphStats).map((card) => (
            <Card
              change={card.change}
              number={Number(card.value)}
              title={card.title}
              key={card.title}
              isLoading={isLoadingState}
            ></Card>
          ))}
        </div>
        <div className={classes["graph-buttons-container"]}>
          <GraphTaps />
        </div>
      </div>
      <CurrencyGraph />
    </div>
  );
}

export default History;
