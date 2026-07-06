import { Button as PrimitiveButton } from "@base-ui/react/button";
import { InputField } from "../ui/InputField/inputField";
import classes from "./content.module.css";
import ExchangeIcon from "/assets/images/icon-exchange.svg";
import ExchangeIconVertical from "/assets/images/icon-exchange-vertical.svg";
import { Button } from "../ui/Button/button";
import Tabs from "../Tabs/tabs";
import { useMediaQuery } from "usehooks-ts";
import { useCurrencyConverter } from "@/shared/contexts/currencyConverterContext";
import { useEffect, useState } from "react";
import { useCurrencies } from "@/shared/api/frankfurter";

function Content() {
  const matches700 = useMediaQuery("(min-width: 700px)");
  const matches375 = useMediaQuery("(min-width: 375px)");

  const {
    setAmount,
    amount,
    sourceCurrency,
    setSourceCurrency,
    targetCurrency,
    setTargetCurrency,
  } = useCurrencyConverter();

  const { data: currencyData } = useCurrencies(sourceCurrency.code);

  useEffect(() => {
    if (!currencyData) {
      return;
    }

    const targetCurrencyRate = currencyData.find(
      (currency: any) => currency.quote === targetCurrency.code,
    )?.rate;

    if (targetCurrencyRate !== undefined) {
      const result = amount * targetCurrencyRate;
      setConversionResult(result);
    }
  }, [amount, sourceCurrency, targetCurrency, currencyData]);

  const targetCurrencyRate = currencyData?.find(
    (currency: any) => currency.quote === targetCurrency.code,
  )?.rate;

  const [conversionResult, setConversionResult] = useState<number | null>(
    amount * (targetCurrencyRate || 0),
  );

  const handleConversion = () => {
    if (targetCurrencyRate !== undefined) {
      const result = amount * targetCurrencyRate;
      setConversionResult(Number(result.toFixed(2)));
    }
  };

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
            onValueChange={(e) => {
              setAmount(e);
              handleConversion();
            }}
          />
          <PrimitiveButton
            className={classes["exchange-button"]}
            onClick={() => {
              const tempCurrency = sourceCurrency;
              setAmount(Math.round(conversionResult) || 0);
              setSourceCurrency(targetCurrency);
              setTargetCurrency(tempCurrency);
              handleConversion();
            }}
          >
            <img src={matches700 ? ExchangeIcon : ExchangeIconVertical}></img>
          </PrimitiveButton>
          <InputField
            currency={targetCurrency}
            setCurrency={setTargetCurrency}
            value={conversionResult}
            placeholder="0"
            className="w-full"
            receive
            label="RECEIVE"
            disabled
          />
        </div>
        <div className={classes["rate-section-bottom"]}>
          <div
            className={classes["bottom-left"]}
          >{`1 ${sourceCurrency.code} = ${targetCurrencyRate?.toFixed(4)} ${targetCurrency.code}`}</div>
          <div className={classes["bottom-right"]}>
            <Button className={classes.button}>FAVORITE</Button>
            <Button className={classes.button}>
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
