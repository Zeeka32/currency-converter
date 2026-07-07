// src/components/InputField/InputField.stories.tsx

import { useState, type ComponentProps } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { InputField } from "./inputField";
import { currencies, type Currency } from "@/shared/constants/flagIcons";
import { unformatNumberInput } from "@/lib/formatNumbers";

const usdCurrency =
  currencies.find((currency) => currency.code === "USD") ?? currencies[0];

const eurCurrency =
  currencies.find((currency) => currency.code === "EUR") ?? currencies[0];

function getInitialValue(value: unknown) {
  if (value === "" || value === undefined || value === null) return "";

  return Number(unformatNumberInput(String(value)));
}

function NumberInputStory(args: ComponentProps<typeof InputField>) {
  const [value, setValue] = useState<number | string>(() =>
    getInitialValue(args.defaultValue),
  );

  const [currency, setCurrency] = useState<Currency>(
    args.currency ?? usdCurrency,
  );

  return (
    <div
      style={{
        maxWidth: "420px",
        minHeight: "520px",
        padding: "40px",
      }}
    >
      <InputField
        {...args}
        currency={currency}
        setCurrency={setCurrency}
        value={value}
        inputMode="decimal"
        onValueChange={setValue}
      />
    </div>
  );
}

function MultipleFieldsStory() {
  const [sendValue, setSendValue] = useState<number | string>("");
  const [receiveValue, setReceiveValue] = useState<number | string>("");

  const [sendCurrency, setSendCurrency] = useState<Currency>(usdCurrency);
  const [receiveCurrency, setReceiveCurrency] = useState<Currency>(eurCurrency);

  return (
    <div
      style={{
        display: "flex",
        gap: "16px",
        maxWidth: "100%",
        minHeight: "520px",
        padding: "40px",
        alignItems: "flex-start",
      }}
    >
      <InputField
        id="send"
        label="SEND"
        placeholder="0"
        value={sendValue}
        currency={sendCurrency}
        setCurrency={setSendCurrency}
        inputMode="decimal"
        onValueChange={(value) => {
          setSendValue(value);
          setReceiveValue(value * 0.92);
        }}
      />

      <InputField
        id="receive"
        label="RECEIVE"
        placeholder="0"
        receive
        value={receiveValue}
        currency={receiveCurrency}
        setCurrency={setReceiveCurrency}
        inputMode="decimal"
        onValueChange={setReceiveValue}
      />
    </div>
  );
}

const meta = {
  title: "Components/InputField",
  component: InputField,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  args: {
    id: "send",
    label: "SEND",
    placeholder: "0",
    defaultValue: "",
    disabled: false,
    receive: false,
    isLoading: false,
    currency: usdCurrency,
    setCurrency: () => {},
  },
  argTypes: {
    id: {
      control: "text",
    },
    label: {
      control: "text",
      description: "Input label text",
    },
    placeholder: {
      control: "text",
    },
    defaultValue: {
      control: "text",
      description: "Initial input value",
    },
    disabled: {
      control: "boolean",
    },
    receive: {
      control: "boolean",
      description: "Applies the receive input style",
    },
    isLoading: {
      control: "boolean",
      description: "Shows loader when receive is true",
    },
    className: {
      table: {
        disable: true,
      },
    },
    value: {
      table: {
        disable: true,
      },
    },
    currency: {
      table: {
        disable: true,
      },
    },
    setCurrency: {
      table: {
        disable: true,
      },
    },
    onValueChange: {
      table: {
        disable: true,
      },
    },
  },
  render: (args) => <NumberInputStory {...args} />,
} satisfies Meta<typeof InputField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Receive: Story = {
  args: {
    id: "receive",
    label: "RECEIVE",
    receive: true,
  },
};

export const WithThousands: Story = {
  args: {
    id: "thousands",
    label: "SEND",
    defaultValue: "1000",
  },
};

export const WithDecimal: Story = {
  args: {
    id: "decimal",
    label: "SEND",
    defaultValue: "853.3",
  },
};

export const ReceiveWithDecimal: Story = {
  args: {
    id: "receive-decimal",
    label: "RECEIVE",
    defaultValue: "853.3",
    receive: true,
  },
};

export const ReceiveLoading: Story = {
  args: {
    id: "receive-loading",
    label: "RECEIVE",
    defaultValue: "853.3",
    receive: true,
    isLoading: true,
  },
};

export const Disabled: Story = {
  args: {
    id: "disabled",
    label: "SEND",
    disabled: true,
    defaultValue: "1000",
  },
};

export const MultipleFields: Story = {
  render: () => <MultipleFieldsStory />,
};
