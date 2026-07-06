import type { Meta, StoryObj } from "@storybook/react";
import { Marquee } from "./marquee";
import type { CurrencyCode } from "@/shared/constants/flagIcons";

const meta: Meta<typeof Marquee> = {
  title: "Components/Marquee",
  component: Marquee,
};

export default meta;

type Story = StoryObj<typeof Marquee>;

type Item = {
  from: CurrencyCode;
  to: CurrencyCode;
  rate: number;
  change: number;
};

const sampleItems: Item[] = [
  { from: "USD", to: "EUR", rate: 0.92, change: 1.34 },
  { from: "USD", to: "JPY", rate: 146.31, change: -0.87 },
  { from: "EUR", to: "GBP", rate: 0.86, change: 0.12 },
  { from: "CAD", to: "CHF", rate: 0.61, change: -2.15 },
  { from: "AUD", to: "USD", rate: 0.66, change: 0.45 },
];
/* -------------------------------------------------------------------------- */
/* Default                                                                   */
/* -------------------------------------------------------------------------- */

export const Default: Story = {
  args: {
    items: sampleItems,
  },
};

/* -------------------------------------------------------------------------- */
/* Positive-only ticker                                                       */
/* -------------------------------------------------------------------------- */

export const PositiveOnly: Story = {
  args: {
    items: sampleItems.map((item) => ({
      ...item,
      change: Math.abs(item.change),
    })),
  },
};

/* -------------------------------------------------------------------------- */
/* Negative-heavy market                                                      */
/* -------------------------------------------------------------------------- */

export const NegativeMarket: Story = {
  args: {
    items: sampleItems.map((item) => ({
      ...item,
      change: -Math.abs(item.change),
    })),
  },
};

/* -------------------------------------------------------------------------- */
/* Single row                                                                 */
/* -------------------------------------------------------------------------- */

export const SingleItem: Story = {
  args: {
    items: [{ from: "USD", to: "EUR", rate: 0.92, change: 1.34 }],
  },
};

/* -------------------------------------------------------------------------- */
/* Dense market (stress test)                                                 */
/* -------------------------------------------------------------------------- */

export const DenseMarket: Story = {
  args: {
    items: [
      ...sampleItems,
      ...sampleItems.map((i) => ({
        ...i,
        rate: i.rate * 1.1,
        change: i.change * -1,
      })),
    ],
  },
};

/* -------------------------------------------------------------------------- */
/* Empty state                                                                */
/* -------------------------------------------------------------------------- */

export const Empty: Story = {
  args: {
    items: [],
  },
};
