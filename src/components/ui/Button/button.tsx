import { Button as ButtonPrimitive } from "@base-ui/react/button";
import classes from "./button.module.css";

function Button({
  className = "",
  favorited = false,
  icon = "",
  children,
  ...props
}: ButtonPrimitive.Props & {
  favorited?: boolean;
  icon?: string;
}) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={`${classes.button} ${favorited ? classes.favorited : ""} ${className}`}
      {...props}
    >
      {icon && <img src={icon} className={classes.icon} alt="button icon" />}
      {children}
    </ButtonPrimitive>
  );
}

export { Button };
