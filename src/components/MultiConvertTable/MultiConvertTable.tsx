import { currencies, type CurrencyCode } from "@/shared/constants/flagIcons";
import classes from "./MultiConvertTable.module.css";
import { useState, type ComponentProps } from "react";
import {
  CurrencyFlag,
  FavoriteButton,
  GenericCurrencyCard,
  StaticNumberStack,
} from "../ui/CurrencyCard/currencyCard";

type CurrencyFromList = (typeof currencies)[number];

type MultiConvertTableProps = ComponentProps<"div"> & {
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

const MultiConvertTable = ({
  amount,
  sourceUnit,
  data,
  className = "",
  ...props
}: MultiConvertTableProps) => {
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
          <h3 className={classes["left-header"]}>MULTI-CURRENCY</h3>
          <h3>{`${amount} FROM ${sourceUnit}`}</h3>
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
                headerNumber={row.convertedAmount}
                contentNumber={row.sourceUnit}
              ></StaticNumberStack>
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
