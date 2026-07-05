import { type ComponentProps } from "react";
import type { CurrencyCode } from "@/shared/constants/flagIcons";
import classes from "./marquee.module.css";
import { MarqueeCard } from "../ui/MarqueeCard/marqueeCard";
import { CircleIcon } from "@phosphor-icons/react";

type MarqueeProps = ComponentProps<"div"> & {
  items: {
    from: CurrencyCode;
    to: CurrencyCode;
    rate: number;
    change: number;
  }[];
};

export function Marquee({ items, className = "", ...props }: MarqueeProps) {
  return (
    <div className={`${classes.marquee} ${className}`} {...props}>
      <div className={classes.header}>
        <CircleIcon size={10} weight="fill" /> <h4>Live Markets</h4>
      </div>
      <div className={classes.track}>
        {items.map((item) => (
          <MarqueeCard
            key={`${item.from}-${item.to}`}
            from={item.from}
            to={item.to}
            rate={item.rate}
            change={item.change}
          />
        ))}
        {items.map((item) => (
          <MarqueeCard
            key={`${item.from}-${item.to}`}
            from={item.from}
            to={item.to}
            rate={item.rate}
            change={item.change}
          />
        ))}
      </div>
    </div>
  );
}
