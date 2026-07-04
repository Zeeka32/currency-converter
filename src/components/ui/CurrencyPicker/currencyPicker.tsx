import { useMemo, useState } from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover/popover";

import { countryIcons, currencies, type Currency } from "@/shared/flagIcons";
import CheveronDown from "../../../../public/assets/images/icon-chevron-down.svg";
import SearchIcon from "../../../../public/assets/images/icon-search.svg";
import { CheckIcon } from "@phosphor-icons/react";

import classes from "./currencyPicker.module.css";

export function CurrencyPicker() {
  const [open, setOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(
    currencies[0],
  );
  const [searchValue, setSearchValue] = useState("");

  const selectedCountry = countryIcons[selectedCurrency.countryIcon];

  const filteredCurrencies = useMemo(() => {
    const search = searchValue.trim().toLowerCase();

    if (!search) return currencies;

    return currencies.filter((currency) => {
      return (
        currency.code.toLowerCase().includes(search) ||
        currency.name.toLowerCase().includes(search)
      );
    });
  }, [searchValue]);

  const popularCurrencies = filteredCurrencies.filter(
    (currency) => currency.popular,
  );

  const otherCurrencies = filteredCurrencies.filter(
    (currency) => !currency.popular,
  );
  function handleSelectCurrency(currency: Currency) {
    setSelectedCurrency(currency);
    setOpen(false);
    setSearchValue("");
  }

  return (
    <div className="flex gap-6 min-w-25 max-w-25">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button className={classes["popover-button"]}>
            <img
              src={selectedCountry.src}
              alt={selectedCountry.alt}
              className={classes["button-flags"]}
            />

            <p className={classes["button-text"]}>{selectedCurrency.code}</p>

            <img
              src={CheveronDown}
              alt="Cheveron Down"
              className={classes["button-chevron"]}
            />
          </button>
        </PopoverTrigger>

        <PopoverContent
          align="end"
          sideOffset={12}
          className={classes["popover-content"]}
        >
          <div className={classes["search-wrapper"]}>
            <img
              src={SearchIcon}
              alt=""
              aria-hidden="true"
              className={classes["search-icon"]}
            />

            <input
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
              placeholder="Search currencies..."
              className={classes["search-input"]}
              autoComplete="off"
              spellCheck={false}
            />
          </div>

          <CurrencySection
            title="POPULAR"
            count={popularCurrencies.length}
            currencies={popularCurrencies}
            selectedCode={selectedCurrency.code}
            onSelect={handleSelectCurrency}
          />

          <CurrencySection
            title="OTHER CURRENCIES"
            count={otherCurrencies.length}
            currencies={otherCurrencies}
            selectedCode={selectedCurrency.code}
            onSelect={handleSelectCurrency}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

function CurrencySection({
  title,
  count,
  currencies,
  selectedCode,
  onSelect,
}: {
  title: string;
  count: number;
  currencies: Currency[];
  selectedCode: string;
  onSelect: (currency: Currency) => void;
}) {
  if (currencies.length === 0) return null;

  return (
    <div className={classes.section}>
      <div className={classes["section-header"]}>
        <p>{title}</p>
        <span>{count}</span>
      </div>

      <div className={classes["currency-list"]}>
        {currencies.map((currency) => {
          const country = countryIcons[currency.countryIcon];
          const selected = currency.code === selectedCode;

          return (
            <button
              key={currency.code}
              type="button"
              className={classes["currency-option"]}
              onClick={() => onSelect(currency)}
            >
              <img
                src={country.src}
                alt={country.alt}
                className={classes["currency-flag"]}
              />

              <span className={classes["currency-code"]}>{currency.code}</span>

              <span className={classes["currency-name"]}>{currency.name}</span>

              {selected && <CheckIcon className={classes["selected-icon"]} />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
