import type { Meta, StoryObj } from "@storybook/react";
import { MarqueeView, type MarqueeItem } from "./marquee";

const meta: Meta<typeof MarqueeView> = {
  title: "Components/Marquee",
  component: MarqueeView,
};

export default meta;

type Story = StoryObj<typeof MarqueeView>;

const sampleItems: MarqueeItem[] = [
  { from: "USD", to: "EUR", rate: 0.92, change: 1.34 },
  { from: "USD", to: "JPY", rate: 146.31, change: -0.87 },
  { from: "EUR", to: "GBP", rate: 0.86, change: 0.12 },
  { from: "CAD", to: "CHF", rate: 0.61, change: -2.15 },
  { from: "AUD", to: "USD", rate: 0.66, change: 0.45 },
];

export const Default: Story = {
  args: {
    items: sampleItems,
  },
};

export const PositiveOnly: Story = {
  args: {
    items: sampleItems.map((item) => ({
      ...item,
      change: Math.abs(item.change),
    })),
  },
};

export const NegativeMarket: Story = {
  args: {
    items: sampleItems.map((item) => ({
      ...item,
      change: -Math.abs(item.change),
    })),
  },
};

export const SingleItem: Story = {
  args: {
    items: [{ from: "USD", to: "EUR", rate: 0.92, change: 1.34 }],
  },
};

export const DenseMarket: Story = {
  args: {
    items: [
      ...sampleItems,
      ...sampleItems.map((item) => ({
        ...item,
        rate: item.rate * 1.1,
        change: item.change * -1,
      })),
    ],
  },
};

export const Empty: Story = {
  args: {
    items: [],
  },
};
