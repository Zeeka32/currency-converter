import { useState, type ComponentProps } from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover/popover";

import ChevronDown from "/assets/images/icon-chevron-down.svg";

import classes from "./dropdown.module.css";

export type DropdownItem = {
  value: string;
  label: string;
  count?: number;
};

export function Dropdown({
  items,
  selectedValue,
  onSelectedValueChange,
  placeholder = "Select",
  className = "",
  ...props
}: ComponentProps<"div"> & {
  items: DropdownItem[];
  selectedValue: string;
  onSelectedValueChange: (value: string) => void;
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);

  const selectedItem = items.find((item) => item.value === selectedValue);

  function handleSelect(value: string) {
    onSelectedValueChange(value);
    setOpen(false);
  }

  return (
    <div className={`${classes.wrapper} ${className}`} {...props}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button type="button" className={classes["popover-button"]}>
            <p className={classes["button-text"]}>
              {selectedItem?.label ?? placeholder}
            </p>

            <img
              src={ChevronDown}
              alt=""
              aria-hidden="true"
              className={classes["button-chevron"]}
            />
          </button>
        </PopoverTrigger>

        <PopoverContent
          align="center"
          sideOffset={12}
          className={classes["popover-content"]}
        >
          <div className={classes["items-list"]}>
            {items.map((item) => (
              <button
                key={item.value}
                type="button"
                className={`${classes["dropdown-item"]} ${
                  item.value === selectedValue ? classes.selected : ""
                }`}
                onClick={() => handleSelect(item.value)}
              >
                <span>{item.label}</span>

                {item.count !== undefined && item.count !== -1 && (
                  <span className={classes.counter}>
                    {item.count >= 99 ? "99+" : item.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
