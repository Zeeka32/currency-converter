import { TriangleIcon } from "@phosphor-icons/react";
import classes from "./marqueeCard.module.css";
import { formatNumberInput } from "@/lib/formatNumbers";
import type { CurrencyCode } from "@/shared/constants/flagIcons";

/* -------------------------------------------------------------------------- */
/* Right-side action variations                                               */
/* -------------------------------------------------------------------------- */

function ChangeNumber({ number }: { number: number }) {
  return (
    <div className={classes["change-number"]}>
      {number >= 0 ? (
        <TriangleIcon size={10} weight="fill" color="var(--green-500)" />
      ) : (
        <TriangleIcon
          size={10}
          weight="fill"
          color="var(--red-500)"
          className="rotate-180"
        />
      )}

      <p className={number >= 0 ? classes.green : classes.red}>
        {(number >= 0 ? "+" : "-") +
          formatNumberInput(Math.abs(number).toString())}
      </p>
    </div>
  );
}

export function MarqueeCard({
  from,
  to,
  rate,
  change,
}: {
  from: CurrencyCode;
  to: CurrencyCode;
  rate: number;
  change: number;
}) {
  return (
    <div className={classes.card}>
      <p className={classes.ratio}>{`${from}\\${to}`}</p>
      <p>{rate}</p>
      <ChangeNumber number={change}></ChangeNumber>
    </div>
  );
}
