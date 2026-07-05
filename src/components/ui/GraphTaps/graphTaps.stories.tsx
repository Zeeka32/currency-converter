import type { Meta, StoryObj } from "@storybook/react";
import { GraphTaps } from "./graphTaps";

const meta = {
  title: "Components/GraphTaps",
  component: GraphTaps,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof GraphTaps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
