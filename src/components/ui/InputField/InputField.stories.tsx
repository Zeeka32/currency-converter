// src/components/InputField/InputField.stories.tsx

import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { InputField } from "./inputField";
import { formatNumberInput } from "@/lib/formatNumbers";

function NumberInputStory(args: React.ComponentProps<typeof InputField>) {
  const [value, setValue] = useState(() =>
    formatNumberInput(String(args.defaultValue ?? "")),
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
        value={value}
        inputMode="decimal"
        onChange={(event) => {
          setValue(formatNumberInput(event.target.value));
        }}
      />
    </div>
  );
}

function MultipleFieldsStory() {
  const [sendValue, setSendValue] = useState("");
  const [receiveValue, setReceiveValue] = useState("");

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
        inputMode="decimal"
        onChange={(event) => {
          setSendValue(formatNumberInput(event.target.value));
        }}
      />

      <InputField
        id="receive"
        label="RECEIVE"
        placeholder="0"
        receive
        value={receiveValue}
        inputMode="decimal"
        onChange={(event) => {
          setReceiveValue(formatNumberInput(event.target.value));
        }}
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
    onChange: {
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
