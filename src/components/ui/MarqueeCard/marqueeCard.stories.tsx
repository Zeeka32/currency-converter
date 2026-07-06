import type { Meta, StoryObj } from "@storybook/react";
import { MarqueeCard } from "./marqueeCard";

const meta: Meta<typeof MarqueeCard> = {
  title: "Components/MarqueeCard",
  component: MarqueeCard,
};

export default meta;

type Story = StoryObj<typeof MarqueeCard>;

export const Positive: Story = {
  args: {
    from: "USD",
    to: "EUR",
    rate: 0.92,
    change: 1.34,
  },
};

export const Negative: Story = {
  args: {
    from: "USD",
    to: "JPY",
    rate: 146.31,
    change: -0.87,
  },
};

export const NoChange: Story = {
  args: {
    from: "EUR",
    to: "GBP",
    rate: 0.86,
    change: 0,
  },
};

export const MultipleCards: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 16 }}>
      <MarqueeCard from="USD" to="EUR" rate={0.92} change={1.34} />

      <MarqueeCard from="USD" to="JPY" rate={146.31} change={-0.87} />

      <MarqueeCard from="EUR" to="GBP" rate={0.86} change={0.12} />

      <MarqueeCard from="CAD" to="CHF" rate={0.61} change={-2.15} />
    </div>
  ),
};
