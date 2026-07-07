import SimpleLoader from "../InputField/SimpleLoader/simpleLoader";
import classes from "./card.module.css";
import { TriangleIcon } from "@phosphor-icons/react";

const Card = ({
  title,
  number,
  isLoading,
  change,
  isPercent = false,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  title: string;
  isLoading?: boolean;
  number: number;
  isPercent?: boolean;
  change: "normal" | "change" | "%";
}) => {
  const isChange = change === "change" || change === "%";
  const isPositive = number >= 0;

  return (
    <div className={`${classes.card} ${className}`} {...props}>
      {isLoading ? (
        <SimpleLoader />
      ) : (
        <div className={classes.stack}>
          <h3>{title}</h3>
          <div className={classes.container}>
            {isChange ? (
              <>
                {change === "%" &&
                  (isPositive ? (
                    <TriangleIcon color={"var(--green-500)"} weight="fill" />
                  ) : (
                    <TriangleIcon
                      color={"var(--red-500)"}
                      weight="fill"
                      className="rotate-180"
                    />
                  ))}
                <p className={`${isPositive ? classes.green : classes.red}`}>
                  {JSON.stringify(number) + (isPercent ? "%" : "")}
                </p>
              </>
            ) : (
              <p>{JSON.stringify(number) + (isPercent ? "%" : "")}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
