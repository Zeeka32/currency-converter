import { Button as ButtonPrimitive } from "@base-ui/react/button";
import classes from "./graphTaps.module.css";
import { useState } from "react";

type TapType = "1D" | "1W" | "1M" | "3M" | "1Y" | "3Y";

const taps: TapType[] = ["1D", "1W", "1M", "3M", "1Y", "3Y"];

function GraphTaps() {
  const [activeTap, setActiveTap] = useState<TapType>("1D");

  return (
    <div className={classes.tabs}>
      {taps.map((tap) => (
        <ButtonPrimitive
          key={tap}
          data-slot="button"
          aria-pressed={activeTap === tap}
          className={`${classes.button} ${
            activeTap === tap ? classes.active : ""
          }`}
          onClick={() => setActiveTap(tap)}
        >
          {tap}
        </ButtonPrimitive>
      ))}
    </div>
  );
}

export { GraphTaps };
