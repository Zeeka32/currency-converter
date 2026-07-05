import {
  countryIcons,
  currencies,
  type CurrencyCode,
} from "@/shared/constants/flagIcons";
import classes from "./currency.module.css";
import ArrowRight from "../../../../public/assets/images/icon-arrow-right.svg";
import { Button } from "@base-ui/react/button";
import { type ReactNode } from "react";

type CurrencyFromList = (typeof currencies)[number];

/* -------------------------------------------------------------------------- */
/* Generic card layout                                                        */
/* -------------------------------------------------------------------------- */

function GenericCurrencyCard({
  left,
  value,
  helper,
  action,
}: {
  left: ReactNode;
  value: ReactNode;
  helper?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className={classes.row}>
      <div className={classes.container}>{left}</div>

      <div className={classes.container}>
        {/* turn this into a slot as well so that the devs can plug any component to the left or right of the card*/}
        <div className={classes.stack}>
          <div>{value}</div>
          {helper && <p>{helper}</p>}
        </div>

        {action}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Left-side variations                                                       */
/* -------------------------------------------------------------------------- */

function CurrencyFlag({
  currency,
  title,
  subtitle,
}: {
  currency: CurrencyFromList;
  title: ReactNode;
  subtitle?: ReactNode;
}) {
  const icon = countryIcons[currency.countryIcon];
  return (
    <>
      <img src={icon.src} alt={icon.alt} />
      <div className={classes.stack}>
        <div>{title}</div>
        {subtitle && <p>{subtitle}</p>}
      </div>
    </>
  );
}

export function CurrencyPair({
  from,
  to,
}: {
  from: CurrencyCode;
  to: CurrencyCode;
}) {
  return (
    <div className={classes.pair}>
      <span>{from}</span>
      <img
        src={ArrowRight}
        className={classes["pair-image"]}
        alt="arrow right icon"
      ></img>
      <span>{to}</span>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Right-side action variations                                               */
/* -------------------------------------------------------------------------- */

function FavoriteButton({
  active,
  onClick,
}: {
  active: boolean;
  onClick: () => void;
}) {
  return (
    <Button
      type="button"
      className={`${classes.button} ${active ? classes.green : ""}`}
      onClick={onClick}
    >
      <img
        src={
          active
            ? "/assets/images/icon-star-filled.svg"
            : "/assets/images/icon-star.svg"
        }
        alt="favorite"
      />
    </Button>
  );
}

export { FavoriteButton, CurrencyFlag, GenericCurrencyCard };
