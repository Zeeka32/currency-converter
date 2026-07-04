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
    <InputField
      {...args}
      value={value}
      inputMode="decimal"
      onChange={(event) => {
        setValue(formatNumberInput(event.target.value));
      }}
    />
  );
}

const meta = {
  title: "Components/InputField",
  component: InputField,
  args: {
    id: "search",
    label: "SEARCH",
    placeholder: "0",
    defaultValue: "",
    disabled: false,
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

export const Disabled: Story = {
  args: {
    id: "disabled",
    label: "SEND",
    disabled: true,
    defaultValue: "1000",
  },
};

export const BlackBackground: Story = {
  decorators: [
    (Story) => (
      <div
        style={{
          background: "#0A0A0A",
          padding: "40px",
          minHeight: "160px",
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export const MultipleFieldsOnBlackBackground: Story = {
  decorators: [
    (Story) => (
      <div
        style={{
          background: "#0A0A0A",
          padding: "40px",
          minHeight: "220px",
        }}
      >
        <Story />
      </div>
    ),
  ],
  render: () => {
    const [searchValue, setSearchValue] = useState("");
    const [weaponValue, setWeaponValue] = useState("");

    return (
      <div
        style={{
          display: "flex",
          gap: "16px",
          maxWidth: "100%",
        }}
      >
        <InputField
          id="search-dark"
          label="SEARCH"
          placeholder="0"
          value={searchValue}
          inputMode="decimal"
          onChange={(event) => {
            setSearchValue(formatNumberInput(event.target.value));
          }}
        />

        <InputField
          id="weapon-dark"
          label="WEAPON"
          placeholder="0"
          value={weaponValue}
          inputMode="decimal"
          onChange={(event) => {
            setWeaponValue(formatNumberInput(event.target.value));
          }}
        />
      </div>
    );
  },
};
