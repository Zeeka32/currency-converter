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

type CurrencyFromList = (typeof currencies)[number];

type LogTableProps = ComponentProps<"div"> & {
  amount: number;
  sourceUnit: CurrencyCode;
  data: {
    code: CurrencyCode;
    convertedAmount: number;
    sourceUnit: number;
  }[];
};

type CurrencyRowData = {
  code: CurrencyCode;
  convertedAmount: number;
  sourceUnit: number;
  currency: CurrencyFromList;
};

const LogTable = ({
  amount,
  sourceUnit,
  data,
  className = "",
  ...props
}: LogTableProps) => {
  const [activeCodes, setActiveCodes] = useState<CurrencyCode[]>([]);

  const rows: CurrencyRowData[] = data.flatMap((item): CurrencyRowData[] => {
    const currency = currencies.find((c) => c.code === item.code);

    if (!currency) return [];

    return [
      {
        ...item,
        currency,
      },
    ];
  });

  function handleOnFavoriteClick(code: CurrencyCode) {
    setActiveCodes((prev) => {
      if (prev.includes(code)) {
        return prev.filter((activeCode) => activeCode !== code);
      }

      return [...prev, code];
    });
  }

  return (
    <div className={`${classes.table} ${className}`} {...props}>
      <div className={classes.header}>
        <div className={classes.left}>
          <h3>CONVERSION LOG</h3>
        </div>

        <div className={classes.right}>
          <p>{`${rows.length} LOGGED`}</p>
          <Button className={classes["button"]}>CLEAR ALL</Button>
        </div>
      </div>

      {rows.map((row) => (
        <GenericCurrencyCard
          key={row.code}
          left={
            <LogTimeConversion
              from="USD"
              to="AED"
              time={20}
            ></LogTimeConversion>
          }
          right={
            <div className="flex items-center gap-2">
              <CurrencyConversion sourceAmount={250} targetAmount={1500} />
              <DiscardFavoriteButton onClick={() => {}} />
            </div>
          }
        />
      ))}
    </div>
  );
};

export default LogTable;
