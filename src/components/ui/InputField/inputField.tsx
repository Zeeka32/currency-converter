import { Input as InputPrimitive } from "@base-ui/react/input";
import classes from "./inputField.module.css";
import { CurrencyPicker } from "../CurrencyPicker/currencyPicker";
import { formatNumberInput, unformatNumberInput } from "@/lib/formatNumbers";
import { useEffect, useState } from "react";
import type { Currency } from "@/shared/constants/flagIcons";

function Label({ className = "", ...props }: React.ComponentProps<"label">) {
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

type InputFieldProps = Omit<
  React.ComponentProps<"input">,
  "value" | "onChange"
> & {
  label: string;
  value?: number | string;
  receive?: boolean;
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  onValueChange?: (value: number) => void;
};

export function InputField({
  className = "",
  id,
  label,
  value = "",
  onValueChange,
  currency,
  setCurrency,
  receive = false,
  ...props
}: InputFieldProps) {
  const [inputValue, setInputValue] = useState(() =>
    value === "" || value === undefined || value === null
      ? ""
      : formatNumberInput(String(value)),
  );

  useEffect(() => {
    if (document.activeElement?.id === id) return;

    setInputValue(
      value === "" || value === undefined || value === null
        ? ""
        : formatNumberInput(String(value)),
    );
  }, [value, id]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const rawValue = event.target.value;
    const unformattedValue = unformatNumberInput(rawValue);

    const isValidInput = /^\d*\.?\d*$/.test(unformattedValue);

    if (!isValidInput) return;

    setInputValue(rawValue);

    if (unformattedValue === "" || unformattedValue === ".") {
      onValueChange?.(0);
      return;
    }

    onValueChange?.(Number(unformattedValue));
  }

  function handleBlur() {
    const unformattedValue = unformatNumberInput(inputValue);

    if (unformattedValue === "" || unformattedValue === ".") {
      setInputValue("");
      return;
    }

    setInputValue(formatNumberInput(unformattedValue));
  }

  const finalInput = receive
    ? formatNumberInput(Number(unformatNumberInput(inputValue)).toFixed(2))
    : inputValue;

  return (
    <Field className={className}>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>

      <div className={classes["input-area"]}>
        <InputPrimitive
          id={id}
          autoComplete="off"
          type="text"
          inputMode="decimal"
          value={finalInput}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`${classes.input} ${receive ? classes.receive : ""}`}
          {...props}
        />

        <CurrencyPicker
          selectedCurrency={currency}
          setSelectedCurrency={setCurrency}
        />
      </div>
    </Field>
  );
}
