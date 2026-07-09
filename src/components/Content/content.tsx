import { useMemo } from "react";

import { Button as PrimitiveButton } from "@base-ui/react/button";
import { StarIcon } from "@phosphor-icons/react";
import { useMediaQuery } from "usehooks-ts";

import { InputField } from "../ui/InputField/inputField";
import { Button } from "../ui/Button/button";
import Tabs from "../Tabs/tabs";

import { useCurrencyConverter } from "@/shared/contexts/currencyConverterContext";
import { useCurrencies } from "@/shared/api/frankfurter";
import type { CurrencyCode } from "@/shared/constants/flagIcons";

import ExchangeIcon from "/assets/images/icon-exchange.svg";
import ExchangeIconVertical from "/assets/images/icon-exchange-vertical.svg";

import classes from "./content.module.css";

function Content() {
  const matches700 = useMediaQuery("(min-width: 700px)");
  const matches375 = useMediaQuery("(min-width: 375px)");

  const {
    amount,
    setAmount,
    sourceCurrency,
    setSourceCurrency,
    targetCurrency,
    setTargetCurrency,
    isFavorite,
    toggleFavorite,
    addLog,
  } = useCurrencyConverter();

  const {
    data: currencyData,
    isLoading,
    isFetching,
    isError,
  } = useCurrencies(sourceCurrency.code);

  const targetCurrencyRate = useMemo(() => {
    return currencyData?.find(
      (currency: any) => currency.quote === targetCurrency.code,
    )?.rate;
  }, [currencyData, targetCurrency.code]);

  const conversionResult = useMemo(() => {
    if (targetCurrencyRate === undefined) {
      return null;
    }

    return Number((amount * targetCurrencyRate).toFixed(2));
  }, [amount, targetCurrencyRate]);

  const isLoadingState = isLoading || isFetching;

  function handleExchange() {
    const previousSourceCurrency = sourceCurrency;

    setAmount(Number((conversionResult ?? 0).toFixed(2)));
    setSourceCurrency(targetCurrency);
    setTargetCurrency(previousSourceCurrency);
  }

  function handleLogConversion() {
    if (targetCurrencyRate === undefined) {
      return;
    }

    addLog({
      amount,
      convertedAmount: amount * targetCurrencyRate,
      from: sourceCurrency.code as CurrencyCode,
      to: targetCurrency.code as CurrencyCode,
      rate: targetCurrencyRate,
    });
  }

  return (
    <div className={classes["content-main"]}>
      <h2 className={classes["content-header"]}>CHECK THE RATE</h2>

      <div className={classes["rate-section"]}>
        <div className={classes["rate-section-top"]}>
          <InputField
            currency={sourceCurrency}
            setCurrency={setSourceCurrency}
            placeholder="0"
            className="w-full"
            label="SEND"
            value={amount}
            onValueChange={setAmount}
          />

          <PrimitiveButton
            type="button"
            className={classes["exchange-button"]}
            onClick={handleExchange}
            aria-label="Exchange currencies"
          >
            <img
              src={matches700 ? ExchangeIcon : ExchangeIconVertical}
              alt=""
              aria-hidden="true"
            />
          </PrimitiveButton>

          <InputField
            currency={targetCurrency}
            setCurrency={setTargetCurrency}
            value={conversionResult !== null ? conversionResult.toString() : ""}
            placeholder="0"
            isLoading={isLoadingState}
            className="w-full"
            receive
            label="RECEIVE"
            disabled
          />
        </div>

        <div className={classes["rate-section-bottom"]}>
          <div className={classes["bottom-left"]}>
            {`1 ${sourceCurrency.code} = ${
              isLoadingState
                ? "..."
                : isError
                  ? "N/A"
                  : targetCurrencyRate?.toFixed(4)
            } ${targetCurrency.code}`}
          </div>

          <div className={classes["bottom-right"]}>
            <Button
              className={classes.button}
              icon={<StarIcon weight="fill" />}
              favorited={isFavorite(
                sourceCurrency.code as CurrencyCode,
                targetCurrency.code as CurrencyCode,
              )}
              onClick={() =>
                toggleFavorite(
                  sourceCurrency.code as CurrencyCode,
                  targetCurrency.code as CurrencyCode,
                )
              }
            >
              {isFavorite(
                sourceCurrency.code as CurrencyCode,
                targetCurrency.code as CurrencyCode,
              )
                ? "FAVORITED"
                : "FAVORITE"}
            </Button>

            <Button className={classes.button} onClick={handleLogConversion}>
              LOG {matches375 && "CONVERSION"}
            </Button>
          </div>
        </div>
      </div>

      <Tabs />
    </div>
  );
}

export default Content;
