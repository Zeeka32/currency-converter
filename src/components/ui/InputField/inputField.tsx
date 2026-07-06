import { Input as InputPrimitive } from "@base-ui/react/input";
import classes from "./inputField.module.css";
import { CurrencyPicker } from "../CurrencyPicker/currencyPicker";

function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      data-slot="label"
      className={`${classes.label} ${className}`}
      {...props}
    />
  );
}

function FieldLabel({ ...props }: React.ComponentProps<typeof Label>) {
  return <Label data-slot="field-label" {...props} />;
}

function Field({ className = "", ...props }: React.ComponentProps<"div">) {
  return (
    <div
      role="group"
      data-slot="field"
      className={`${classes.field} ${className}`}
      {...props}
    />
  );
}

export function InputField({
  className = "",
  id,
  label,
  receive = false,
  ...props
}: React.ComponentProps<"input"> & {
  label: string;
  receive?: boolean;
}) {
  return (
    <Field className={className}>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <div className={classes["input-area"]}>
        <InputPrimitive
          id={id}
          autoComplete="off"
          type="text"
          className={`${classes.input} ${receive ? classes.receive : ""}`}
          {...props}
        />
        <CurrencyPicker />
      </div>
    </Field>
  );
}
