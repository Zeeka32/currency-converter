// src/components/Button/Button.stories.tsx

import type { Meta, StoryObj } from "@storybook/react";
import { TapButton } from "./tapButton";

const meta = {
  title: "Components/Button",
  component: TapButton,
  tags: ["autodocs"],
  args: {
    children: "HISTORY",
    selected: false,
    count: 0,
  },
  argTypes: {
    children: {
      control: "text",
      description: "Button text",
    },
    selected: {
      control: "boolean",
      description: "Shows selected underline state",
    },
    count: {
      control: {
        type: "number",
        min: 0,
      },
      description: "Optional counter badge",
    },
  },
} satisfies Meta<typeof TapButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithCount: Story = {
  args: {
    count: 12,
  },
};

export const Selected: Story = {
  args: {
    selected: true,
  },
};

export const SelectedWithCount: Story = {
  args: {
    selected: true,
    count: 4,
  },
};

export const BlackBackground: Story = {
  decorators: [
    (Story) => (
      <div
        style={{
          background: "#0A0A0A",
          padding: "40px",
          minHeight: "120px",
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export const MultipleButtons: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        gap: "8px",
        alignItems: "center",
      }}
    >
      <TapButton selected>HISTORY</TapButton>
      <TapButton>COMPARE</TapButton>
      <TapButton count={8}>FAVORITES</TapButton>
      <TapButton count={12}>LOG</TapButton>
    </div>
  ),
};

export const MultipleButtonsOnBlackBackground: Story = {
  decorators: [
    (Story) => (
      <div
        style={{
          background: "#0A0A0A",
          padding: "40px",
          minHeight: "120px",
        }}
      >
        <Story />
      </div>
    ),
  ],
  render: () => (
    <div
      style={{
        display: "flex",
        gap: "8px",
        alignItems: "center",
      }}
    >
      <TapButton selected>HISTORY</TapButton>
      <TapButton>COMPARE</TapButton>
      <TapButton count={8}>FAVORITES</TapButton>
      <TapButton count={12}>LOG</TapButton>
    </div>
  ),
};
