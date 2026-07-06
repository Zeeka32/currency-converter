import { Button as ButtonPrimitive } from "@base-ui/react/button";
import classes from "./button.module.css";
import type { ReactNode } from "react";

function Button({
  className = "",
  favorited = false,
  icon,
  children,
  ...props
}: ButtonPrimitive.Props & {
  favorited?: boolean;
  icon?: string | ReactNode;
}) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={`${classes.button} ${
        favorited ? classes.favorited : ""
      } ${className}`}
      {...props}
    >
      {typeof icon === "string" && icon && (
        <img src={icon} className={classes.icon} alt="button icon" />
      )}

      {typeof icon !== "string" && icon}

      {children}
    </ButtonPrimitive>
  );
}

export { Button };
