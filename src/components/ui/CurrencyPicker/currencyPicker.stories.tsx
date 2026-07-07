import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { CurrencyPicker } from "./currencyPicker";
import { currencies, type Currency } from "@/shared/constants/flagIcons";

const usdCurrency =
  currencies.find((currency) => currency.code === "USD") ?? currencies[0];

const eurCurrency =
  currencies.find((currency) => currency.code === "EUR") ?? currencies[0];

function CurrencyPickerStory({
  initialCurrency,
}: {
  initialCurrency: Currency;
}) {
  const [selectedCurrency, setSelectedCurrency] =
    useState<Currency>(initialCurrency);

  return (
    <CurrencyPicker
      selectedCurrency={selectedCurrency}
      setSelectedCurrency={setSelectedCurrency}
    />
  );
}

const meta = {
  title: "Components/CurrencyPicker",
  tags: ["autodocs"],
  component: CurrencyPicker,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    selectedCurrency: usdCurrency,
    setSelectedCurrency: () => {},
  },
  decorators: [
    (Story) => (
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          width: "100%",
          minHeight: "520px",
          padding: "40px",
        }}
      >
        <Story />
      </div>
    ),
  ],
  argTypes: {
    selectedCurrency: {
      table: {
        disable: true,
      },
    },
    setSelectedCurrency: {
      table: {
        disable: true,
      },
    },
  },
  render: (args) => (
    <CurrencyPickerStory
      key={args.selectedCurrency.code}
      initialCurrency={args.selectedCurrency}
    />
  ),
} satisfies Meta<typeof CurrencyPicker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const EURSelected: Story = {
  args: {
    selectedCurrency: eurCurrency,
  },
};
