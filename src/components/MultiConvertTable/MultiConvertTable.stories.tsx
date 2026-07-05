import type { Meta, StoryObj } from "@storybook/react";
import MultiConvertTable from "./MultiConvertTable";

const meta = {
  title: "Components/MultiConvertTable",
  component: MultiConvertTable,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof MultiConvertTable>;

export default meta;

type Story = StoryObj<typeof meta>;

const mockData = [
  {
    code: "USD" as const,
    convertedAmount: 100,
    sourceUnit: 1.0,
  },
  {
    code: "EUR" as const,
    convertedAmount: 92.5,
    sourceUnit: 0.925,
  },
  {
    code: "GBP" as const,
    convertedAmount: 78.2,
    sourceUnit: 0.782,
  },
  {
    code: "JPY" as const,
    convertedAmount: 14850,
    sourceUnit: 148.5,
  },
  {
    code: "CAD" as const,
    convertedAmount: 135.6,
    sourceUnit: 1.356,
  },
  {
    code: "AUD" as const,
    convertedAmount: 152.1,
    sourceUnit: 1.521,
  },
];

export const Default: Story = {
  args: {
    amount: 1000,
    sourceUnit: "USD",
    data: mockData,
  },
};

export const Empty: Story = {
  args: {
    amount: 0,
    sourceUnit: "USD",
    data: [],
  },
};

export const SingleRow: Story = {
  args: {
    amount: 500,
    sourceUnit: "EUR",
    data: [
      {
        code: "EUR",
        convertedAmount: 500,
        sourceUnit: 1,
      },
    ],
  },
};
