import classes from "./logTable.module.css";
import { type ComponentProps } from "react";
import {
  CurrencyConversion,
  DiscardFavoriteButton,
  GenericCurrencyCard,
  LogTimeConversion,
} from "../ui/CurrencyCard/currencyCard";
import { Button } from "../ui/Button/button";
import { useCurrencyConverter } from "@/shared/contexts/currencyConverterContext";
import Empty from "../ui/Empty/empty";
import { formatTimeAgo } from "@/lib/formatTimeAgo";

type LogTableProps = ComponentProps<"div">;

const LogTable = ({ className = "", ...props }: LogTableProps) => {
  const { logs, deleteLog, clearLogs } = useCurrencyConverter();

  function handleOnDeleteClick(id: string) {
    deleteLog(id);
  }

  if (logs.length === 0) {
    return (
      <Empty
        header="No conversions logged yet."
        body="Every conversion is recorded here automatically when you tap LOG CONVERSION. Your log is private to this session and this browser."
      />
    );
  }

  return (
    <div className={`${classes.table} ${className}`} {...props}>
      <div className={classes.header}>
        <div className={classes.left}>
          <h3>CONVERSION LOG</h3>
        </div>

        <div className={classes.right}>
          <p>{`${logs.length} LOGGED`}</p>
          <Button className={classes["button"]} onClick={clearLogs}>
            CLEAR ALL
          </Button>
        </div>
      </div>

      {logs.map((log) => (
        <GenericCurrencyCard
          key={log.id}
          left={
            <LogTimeConversion
              from={log.from}
              to={log.to}
              time={formatTimeAgo(log.createdAt)}
            />
          }
          right={
            <div className="flex items-center gap-2">
              <CurrencyConversion
                sourceAmount={log.amount}
                targetAmount={log.convertedAmount}
              />
              <DiscardFavoriteButton
                onClick={() => handleOnDeleteClick(log.id)}
              />
            </div>
          }
        />
      ))}
    </div>
  );
};

export default LogTable;
