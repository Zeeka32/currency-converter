import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button";

const STAR_ICON = "/assets/images/icon-star.svg";
const STAR_FILLED_ICON = "/assets/images/icon-star-filled.svg";

const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  args: {
    children: "Button",
    favorited: false,
    icon: "",
  },
  argTypes: {
    favorited: {
      control: "boolean",
    },
    icon: {
      control: "select",
      options: ["", STAR_ICON, STAR_FILLED_ICON],
    },
    children: {
      control: "text",
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const NotFavorited: Story = {
  args: {
    children: "Not favorited",
    favorited: false,
  },
};

export const Favorited: Story = {
  args: {
    children: "Favorited",
    favorited: true,
  },
};

export const StarIcon: Story = {
  args: {
    icon: STAR_ICON,
    favorited: false,
    "aria-label": "Add to favorites",
  },
};

export const StarFilledIcon: Story = {
  args: {
    icon: STAR_FILLED_ICON,
    favorited: true,
    "aria-label": "Remove from favorites",
  },
};

export const StarIconWithText: Story = {
  args: {
    children: "Add favorite",
    icon: STAR_ICON,
    favorited: false,
  },
};

export const StarFilledIconWithText: Story = {
  args: {
    children: "Favorited",
    icon: STAR_FILLED_ICON,
    favorited: true,
  },
};
