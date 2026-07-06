import { currencies, type CurrencyCode } from "@/shared/constants/flagIcons";
import classes from "./MultiConvertTable.module.css";
import { useMemo, useState } from "react";
import {
  CurrencyFlag,
  FavoriteButton,
  GenericCurrencyCard,
  StaticNumberStack,
} from "../ui/CurrencyCard/currencyCard";
import { useCurrencyConverter } from "@/shared/contexts/currencyConverterContext";
import { useCurrencies } from "@/shared/api/frankfurter";

type CurrencyFromList = (typeof currencies)[number];

type ApiCurrencyRate = {
  date: string;
  base: CurrencyCode;
  quote: CurrencyCode;
  rate: number;
};

type CurrencyRowData = {
  code: CurrencyCode;
  convertedAmount: number;
  sourceUnit: number;
  currency: CurrencyFromList;
};

const MultiConvertTable = () => {
  const [activeCodes, setActiveCodes] = useState<CurrencyCode[]>([]);

  const { amount, sourceCurrency } = useCurrencyConverter();
  const { data: currencyData = [] } = useCurrencies(sourceCurrency.code);

  const rows: CurrencyRowData[] = useMemo(() => {
    return (currencyData as ApiCurrencyRate[]).flatMap((item) => {
      const currency = currencies.find((c) => c.code === item.quote);

      if (!currency) return [];

      return [
        {
          code: item.quote,
          convertedAmount: amount * item.rate,
          sourceUnit: item.rate,
          currency,
        },
      ];
    });
  }, [currencyData, amount]);

  function handleOnFavoriteClick(code: CurrencyCode) {
    setActiveCodes((prev) => {
      if (prev.includes(code)) {
        return prev.filter((activeCode) => activeCode !== code);
      }

      return [...prev, code];
    });
  }

  return (
    <div className={classes.table}>
      <div className={classes.header}>
        <div className={classes.left}>
          <h3 className={classes["left-header"]}>MULTI-CURRENCY</h3>
          <h3>{`${amount} FROM ${sourceCurrency.code}`}</h3>
        </div>

        <div className={classes.right}>
          <p>{`${rows.length} PAIRS`}</p>
        </div>
      </div>

      {rows.map((row) => (
        <GenericCurrencyCard
          key={row.code}
          left={
            <CurrencyFlag
              currency={row.currency}
              title={row.currency.code}
              subtitle={row.currency.name}
            />
          }
          right={
            <div className={classes.container}>
              <StaticNumberStack
                headerNumber={Number(row.convertedAmount.toFixed(2))}
                contentNumber={Number(row.sourceUnit.toFixed(2))}
              />

              <FavoriteButton
                active={activeCodes.includes(row.code)}
                onClick={() => handleOnFavoriteClick(row.code)}
              />
            </div>
          }
        />
      ))}
    </div>
  );
};

export default MultiConvertTable;
