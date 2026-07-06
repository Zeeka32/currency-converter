import { currencies, type CurrencyCode } from "@/shared/constants/flagIcons";
import classes from "./favoriteTable.module.css";
import { useState, type ComponentProps } from "react";
import {
  CurrencyPair,
  FavoriteButton,
  GenericCurrencyCard,
  NumberStack,
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

const FavoriteTable = ({
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
          <h3>PINNED PAIRS</h3>
        </div>

        <div className={classes.right}>
          <p>{`${rows.length} FAVORITES`}</p>
        </div>
      </div>

      {rows.map((row) => (
        <GenericCurrencyCard
          key={row.code}
          left={<CurrencyPair from="AED" to="AUD" />}
          right={
            <div className={classes.container}>
              <NumberStack
                headerNumber={row.convertedAmount}
                contentNumber={row.sourceUnit}
              ></NumberStack>
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

export default FavoriteTable;
