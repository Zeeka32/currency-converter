import { type CurrencyCode } from "@/shared/constants/flagIcons";
import classes from "./favoriteTable.module.css";
import { type ComponentProps, useMemo } from "react";
import {
  CurrencyPair,
  FavoriteButton,
  GenericCurrencyCard,
  NumberStack,
} from "../ui/CurrencyCard/currencyCard";
import { useCurrencyConverter } from "@/shared/contexts/currencyConverterContext";
import { useBasesToQuotes } from "@/shared/api/frankfurter";
import {
  buildPairRateMap,
  flattenRates,
  getAbsoluteChange,
  getPairRate,
  getPreviousRateDates,
} from "@/lib/currencyRates";
import Empty from "../ui/Empty/empty";

type FavoriteTableProps = ComponentProps<"div">;

const FavoriteTable = ({ className = "", ...props }: FavoriteTableProps) => {
  const { favorites, toggleFavorite } = useCurrencyConverter();

  const { latestDate, previousDate } = getPreviousRateDates();

  const latest = useBasesToQuotes(favorites, latestDate);
  const beforeLatest = useBasesToQuotes(favorites, previousDate);

  const latestRateMap = useMemo(() => {
    return buildPairRateMap(flattenRates(latest));
  }, [latest]);

  const previousRateMap = useMemo(() => {
    return buildPairRateMap(flattenRates(beforeLatest));
  }, [beforeLatest]);

  function handleOnFavoriteClick(from: CurrencyCode, to: CurrencyCode) {
    toggleFavorite(from, to);
  }

  if (favorites.length === 0) {
    return (
      <Empty
        header="No pinned pairs yet."
        body="pin a pair to track its rate here. Tap the star icon on any conversion or comparison row."
      />
    );
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
        const latestRate = getPairRate(latestRateMap, fav);
        const previousRate = getPairRate(previousRateMap, fav);
        const change = getAbsoluteChange(latestRate, previousRate);

        return (
          <GenericCurrencyCard
            key={`${fav.from}-${fav.to}`}
            left={<CurrencyPair from={fav.from} to={fav.to} />}
            right={
              <div className={classes.container}>
                <NumberStack
                  headerNumber={latestRate ?? 0}
                  contentNumber={change ?? 0}
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
