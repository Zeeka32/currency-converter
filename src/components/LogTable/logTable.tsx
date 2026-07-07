import { currencies, type CurrencyCode } from "@/shared/constants/flagIcons";
import classes from "./logTable.module.css";
import { useState, type ComponentProps } from "react";
import {
  CurrencyConversion,
  CurrencyFlag,
  DiscardFavoriteButton,
  FavoriteButton,
  GenericCurrencyCard,
  LogTimeConversion,
  StaticNumberStack,
} from "../ui/CurrencyCard/currencyCard";
import { Button } from "../ui/Button/button";
import { useCurrencyConverter } from "@/shared/contexts/currencyConverterContext";

type CurrencyFromList = (typeof currencies)[number];

type LogTableProps = ComponentProps<"div">;

const LogTable = ({ className = "", ...props }: LogTableProps) => {
  const { logs, deleteLog, clearLogs } = useCurrencyConverter();
  function handleOnDeleteClick(id: string) {
    deleteLog(id);
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
              time={log.createdAt}
            ></LogTimeConversion>
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
