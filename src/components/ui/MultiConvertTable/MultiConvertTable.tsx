import {
  countryIcons,
  currencies,
  type Currency,
  type CurrencyCode,
} from "@/shared/constants/flagIcons";
import classes from "./MultiConvertTable.module.css";
import { Button } from "@base-ui/react/button";
import { useState } from "react";

type MultiConvertTable = React.ComponentProps<"div"> & {
  amount: number;
  sourceUnit: CurrencyCode;
  data: {
    code: CurrencyCode;
    convertedAmount: number;
    sourceUnit: number;
  }[];
};

const MultiConvertTable = ({
  amount,
  sourceUnit,
  data,
  className,
  ...props
}: MultiConvertTable) => {
  if (!data.length)
    return (
      <div className={`${classes.card} ${className}`} {...props}>
        <h2>No Avilable Countries Currently</h2>
      </div>
    );

  const [activeIndicies, setActiveIndicies] = useState<number[]>([]);
  const selectedCurrencies: Currency[] = [];

  for (const d of data) {
    const currency = currencies.find((c) => c.code === d.code);

    if (!currency) continue;

    selectedCurrencies.push(currency);
  }

  function handleOnStarClick(index: number) {
    if (activeIndicies.includes(index)) {
      setActiveIndicies(activeIndicies.filter((i) => i !== index));
      return;
    }
    setActiveIndicies([...activeIndicies, index]);
  }

  return (
    <div className={`${classes.table} ${className}`} {...props}>
      <div className={classes.header}>
        <div className={classes.left}>
          <h3 className={classes["left-header"]}> MULTI-CURRENCY</h3>
          <h3>{`${amount} FROM ${sourceUnit}`}</h3>
        </div>
        <div className={classes.right}>
          <p>{`${selectedCurrencies.length} PAIRS`}</p>
        </div>
      </div>

      {data.map((element, index: number) => (
        <div key={index} className={classes.row}>
          <div className={classes.container}>
            <img
              src={countryIcons[selectedCurrencies[index].countryIcon].src}
              alt={countryIcons[selectedCurrencies[index].countryIcon].alt}
            ></img>
            <div className={classes.stack}>
              <div>{selectedCurrencies[index].code}</div>
              <p>{selectedCurrencies[index].name}</p>
            </div>
          </div>

          <div className={classes.container}>
            <div className={classes.stack}>
              <div>{element.convertedAmount}</div>
              <p>{element.sourceUnit}</p>
            </div>
            <Button
              className={`${classes.button} ${
                activeIndicies.includes(index) ? classes.green : ""
              }`}
              onClick={() => handleOnStarClick(index)}
            >
              <img
                src={
                  activeIndicies.includes(index)
                    ? "/assets/images/icon-star-filled.svg"
                    : "/assets/images/icon-star.svg"
                }
                alt="star"
              ></img>
            </Button>{" "}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MultiConvertTable;
