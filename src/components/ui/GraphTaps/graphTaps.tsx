import { Button as ButtonPrimitive } from "@base-ui/react/button";
import classes from "./graphTaps.module.css";
import { useCurrencyConverter } from "@/shared/contexts/currencyConverterContext";
import { type GraphRange } from "@/shared/contexts/currencyReducer";

const taps: GraphRange[] = ["1D", "1W", "1M", "3M", "1Y", "5Y"];

function GraphTaps() {
  const { selectedGraphRange, setSelectedGraphRange } = useCurrencyConverter();

  return (
    <div className={classes.tabs}>
      {taps.map((tap) => (
        <ButtonPrimitive
          key={tap}
          data-slot="button"
          aria-pressed={selectedGraphRange === tap}
          className={`${classes.button} ${
            selectedGraphRange === tap ? classes.active : ""
          }`}
          onClick={() => setSelectedGraphRange(tap)}
        >
          {tap}
        </ButtonPrimitive>
      ))}
    </div>
  );
}

export { GraphTaps };
