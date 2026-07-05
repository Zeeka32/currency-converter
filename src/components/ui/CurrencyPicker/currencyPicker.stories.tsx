import type { Meta, StoryObj } from "@storybook/react";
import { CurrencyPicker } from "./currencyPicker";

const meta = {
  title: "Components/CurrencyPicker",
  tags: ["autodocs"],
  component: CurrencyPicker,
  decorators: [
    (Story) => (
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          width: "100%",
          padding: "40px",
        }}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CurrencyPicker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
