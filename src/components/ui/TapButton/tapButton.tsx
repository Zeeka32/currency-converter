import { Button as ButtonPrimitive } from "@base-ui/react/button";
import classes from "./button.module.css";

function TapButton({
  className = "",
  selected = false,
  count = 0,
  children,
  ...props
}: ButtonPrimitive.Props & {
  selected?: boolean;
  count?: number;
}) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={`${classes.button} ${selected ? classes.selected : ""} ${className}`}
      {...props}
    >
      {children}
      {count > 0 && (
        <span className={classes.counter}>
          {count >= 99 ? `${99}+` : count}
        </span>
      )}
    </ButtonPrimitive>
  );
}

export { TapButton };
