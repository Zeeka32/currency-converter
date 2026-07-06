import type { Meta, StoryObj } from "@storybook/react";
import { useState, type ComponentProps } from "react";
import { Dropdown, type DropdownItem } from "./dropdown";

const tabItems: DropdownItem[] = [
  {
    value: "history",
    label: "HISTORY",
  },
  {
    value: "compare",
    label: "COMPARE",
  },
  {
    value: "favorites",
    label: "FAVORITES",
    count: 10,
  },
  {
    value: "log",
    label: "LOG",
    count: 8,
  },
];

const currencyItems: DropdownItem[] = [
  {
    value: "USD",
    label: "USD",
  },
  {
    value: "EUR",
    label: "EUR",
  },
  {
    value: "GBP",
    label: "GBP",
  },
  {
    value: "JPY",
    label: "JPY",
  },
];

type DropdownProps = ComponentProps<typeof Dropdown>;

function DropdownWithState({
  selectedValue,
  onSelectedValueChange: _onSelectedValueChange,
  ...props
}: DropdownProps) {
  const [value, setValue] = useState(selectedValue);

  return (
    <Dropdown
      {...props}
      selectedValue={value}
      onSelectedValueChange={setValue}
    />
  );
}

const meta = {
  title: "Components/Dropdown",
  component: Dropdown,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    items: tabItems,
    selectedValue: "history",
    onSelectedValueChange: () => {},
    placeholder: "SELECT",
  },
  render: (args) => <DropdownWithState {...args} />,
} satisfies Meta<typeof Dropdown>;

export default meta;

type Story = StoryObj<typeof meta>;

export const TabsDropdown: Story = {
  args: {
    items: tabItems,
    selectedValue: "history",
  },
};

export const FavoritesSelected: Story = {
  args: {
    items: tabItems,
    selectedValue: "favorites",
  },
};

export const LogSelected: Story = {
  args: {
    items: tabItems,
    selectedValue: "log",
  },
};

export const CurrencyDropdown: Story = {
  args: {
    items: currencyItems,
    selectedValue: "USD",
  },
};

export const WithPlaceholder: Story = {
  args: {
    items: tabItems,
    selectedValue: "",
    placeholder: "SELECT TAB",
  },
};
