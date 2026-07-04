import type { Meta, StoryObj } from "@storybook/react";
import Card from "./Card";

const meta = {
  title: "Components/Card",
  component: Card,
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

/* -------------------- Basic -------------------- */
export const Default: Story = {
  args: {
    title: "Revenue",
    number: 1200,
    change: "normal",
  },
};

export const PositiveChange: Story = {
  args: {
    title: "Growth",
    number: 25,
    change: "change",
  },
};

export const NegativePercent: Story = {
  args: {
    title: "Drop Rate",
    number: -18,
    change: "%",
  },
};

/* -------------------- Layout Tests -------------------- */
export const GridLayout: Story = {
  args: {
    title: "Default",
    number: 0,
    change: "normal",
  },
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "16px",
        width: "100%",
      }}
    >
      <Card title="Revenue" number={1200} change="normal" />
      <Card title="Users" number={340} change="change" />
      <Card title="Bounce Rate" number={-12} change="%" />
      <Card title="Conversion" number={55} change="change" />
      <Card title="Orders" number={890} change="normal" />
      <Card title="Refunds" number={-5} change="%" />
    </div>
  ),
};
export const FlexLayout: Story = {
  args: {
    title: "Default",
    number: 0,
    change: "normal",
  },
  render: () => (
    <div
      style={{
        display: "flex",
        gap: "12px",
        flexWrap: "wrap",
      }}
    >
      <Card title="Revenue" number={1200} change="normal" />
      <Card title="Users" number={340} change="change" />
      <Card title="Bounce Rate" number={-12} change="%" />
    </div>
  ),
};

/* -------------------- Edge Cases -------------------- */
export const EdgeCases: Story = {
  args: {
    title: "Default",
    number: 0,
    change: "normal",
  },
  render: () => (
    <div style={{ display: "grid", gap: "12px" }}>
      <Card title="Zero" number={0} change="%" />
      <Card title="Big Number" number={9999999} change="normal" />
      <Card title="Negative Change" number={-100} change="change" />
    </div>
  ),
};
