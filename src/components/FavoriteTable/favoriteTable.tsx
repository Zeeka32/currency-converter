import { currencies, type CurrencyCode } from "@/shared/constants/flagIcons";
import classes from "./favoriteTable.module.css";
import { useState, type ComponentProps } from "react";
import {
  CurrencyPair,
  FavoriteButton,
  GenericCurrencyCard,
  NumberStack,
} from "../ui/CurrencyCard/currencyCard";
import { useCurrencyConverter } from "@/shared/contexts/currencyConverterContext";
import { useBasesToQuotes } from "@/shared/api/frankfurter";

const formatDate = (date: Date) => date.toISOString().split("T")[0];

type FavoriteTableProps = ComponentProps<"div">;

const FavoriteTable = ({ className = "", ...props }: FavoriteTableProps) => {
  const { favorites, toggleFavorite } = useCurrencyConverter();
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const dayBefore = new Date(today);
  dayBefore.setDate(today.getDate() - 2);
  const latest = useBasesToQuotes(favorites, formatDate(yesterday));
  const beforeLatest = useBasesToQuotes(favorites, formatDate(dayBefore));

  function handleOnFavoriteClick(from: CurrencyCode, to: CurrencyCode) {
    toggleFavorite(from, to);
  }

  return (
    <div className={`${classes.table} ${className}`} {...props}>
      <div className={classes.header}>
        <div className={classes.left}>
          <h3>PINNED PAIRS</h3>
        </div>

        <div className={classes.right}>
          <p>{`${favorites.length} FAVORITES`}</p>
        </div>
      </div>

      {favorites.map((fav) => {
        const latestRates = latest.flatMap((query) => query.data ?? []);
        const beforeLatestRates = beforeLatest.flatMap(
          (query) => query.data ?? [],
        );

        const latestRate = latestRates.find(
          (rate) => rate.base === fav.from && rate.quote === fav.to,
        );

        const beforeLatestRate = beforeLatestRates.find(
          (rate) => rate.base === fav.from && rate.quote === fav.to,
        );

        let rate = "N/A";
        let change = "N/A";

        if (latestRate) {
          rate = latestRate.rate;
        }

        if (latestRate && beforeLatestRate) {
          change = (latestRate.rate - beforeLatestRate.rate).toString();
        }
        return (
          <GenericCurrencyCard
            key={fav.from}
            left={<CurrencyPair from={fav.from} to={fav.to} />}
            right={
              <div className={classes.container}>
                <NumberStack
                  headerNumber={Number(rate)}
                  contentNumber={Number(change)}
                />

                <FavoriteButton
                  active={true}
                  onClick={() => handleOnFavoriteClick(fav.from, fav.to)}
                />
              </div>
            }
          />
        );
      })}
    </div>
  );
};

export default FavoriteTable;
