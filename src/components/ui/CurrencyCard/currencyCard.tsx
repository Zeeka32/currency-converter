import {
  countryIcons,
  currencies,
  type CurrencyCode,
} from "@/shared/constants/flagIcons";
import classes from "./currency.module.css";
import ArrowRight from "../../../../public/assets/images/icon-arrow-right.svg";
import { Button } from "@base-ui/react/button";
import { type ReactNode } from "react";
import { TriangleIcon } from "@phosphor-icons/react";
import { formatNumberInput } from "@/lib/formatNumbers";

type CurrencyFromList = (typeof currencies)[number];

/* -------------------------------------------------------------------------- */
/* Generic card layout                                                        */
/* -------------------------------------------------------------------------- */

function GenericCurrencyCard({
  left,
  right,
}: {
  left: ReactNode;
  right: ReactNode;
}) {
  return (
    <div className={classes.row}>
      <div className={classes.container}>{left}</div>

      <div className={classes.container}>
        {/* turn this into a slot as well so that the devs can plug any component to the left or right of the card*/}

        {right}
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
        {subtitle && <p className={classes.text}>{subtitle}</p>}
      </div>
    </>
  );
}

function CurrencyPair({ from, to }: { from: CurrencyCode; to: CurrencyCode }) {
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
type NumberStackProps = {
  headerNumber: number;
  contentNumber: number;
};

function NumberStack({ headerNumber, contentNumber }: NumberStackProps) {
  return (
    <div className={classes["number-stack"]}>
      <h4>{formatNumberInput(headerNumber.toString())}</h4>
      <span>
        {contentNumber >= 0 ? (
          <TriangleIcon size={10} weight="fill" color="var(--green-500)" />
        ) : (
          <TriangleIcon
            size={10}
            weight="fill"
            color="var(--red-500)"
            className="rotate-180"
          />
        )}

        <p className={contentNumber >= 0 ? classes.green : classes.red}>
          {(contentNumber >= 0 ? "+" : "-") +
            formatNumberInput(Math.abs(contentNumber).toString())}
        </p>
      </span>
    </div>
  );
}

function StaticNumberStack({ headerNumber, contentNumber }: NumberStackProps) {
  return (
    <div className={classes["number-stack"]}>
      <h4>{formatNumberInput(headerNumber.toString())}</h4>
      <span>
        <p>@ {formatNumberInput(contentNumber.toString())}</p>
      </span>
    </div>
  );
}

type CurrencyConversionProps = {
  sourceAmount: number;
  targetAmount: number;
};

function CurrencyConversion({
  sourceAmount,
  targetAmount,
}: CurrencyConversionProps) {
  return (
    <div className={classes["currency-conversion-container"]}>
      <p className={classes.content}>
        {formatNumberInput(JSON.stringify(sourceAmount))}
      </p>
      <p className={classes.result}>
        {formatNumberInput(JSON.stringify(targetAmount))}
      </p>
    </div>
  );
}

function LogTimeConversion({
  time,
  from,
  to,
}: {
  time: number;
  from: CurrencyCode;
  to: CurrencyCode;
}) {
  return (
    <div className={classes["log-time-conversion"]}>
      <p className={classes["log-time"]}>{time}</p>
      <CurrencyPair from={from} to={to}></CurrencyPair>
    </div>
  );
}

type IconToggleButtonProps = {
  active?: boolean;
  onClick: () => void;
  activeIcon: string;
  inactiveIcon: string;
  activeClassName?: string;
  className?: string;
  alt?: string;
};

function IconToggleButton({
  active = false,
  onClick,
  activeIcon,
  inactiveIcon,
  activeClassName,
  className,
  alt = "icon button",
}: IconToggleButtonProps) {
  return (
    <Button
      type="button"
      className={`${className ?? ""} ${active && activeClassName ? activeClassName : ""}`}
      onClick={onClick}
    >
      <img src={active ? activeIcon : inactiveIcon} alt={alt} />
    </Button>
  );
}

function FavoriteButton({
  active,
  onClick,
}: {
  active: boolean;
  onClick: () => void;
}) {
  return (
    <IconToggleButton
      active={active}
      onClick={onClick}
      className={classes.button}
      activeClassName={classes.green}
      activeIcon="/assets/images/icon-star-filled.svg"
      inactiveIcon="/assets/images/icon-star.svg"
      alt="favorite"
    />
  );
}

function DiscardFavoriteButton({ onClick }: { onClick: () => void }) {
  return (
    <IconToggleButton
      active={false}
      onClick={onClick}
      className={classes["discard-button"]}
      activeIcon="/assets/images/icon-delete-filled.svg"
      inactiveIcon="/assets/images/icon-delete.svg"
      alt="discard favorite"
    />
  );
}

export {
  GenericCurrencyCard,
  CurrencyFlag,
  CurrencyPair,
  NumberStack,
  CurrencyConversion,
  LogTimeConversion,
  DiscardFavoriteButton,
  FavoriteButton,
  IconToggleButton,
  StaticNumberStack,
};
