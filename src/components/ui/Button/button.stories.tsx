import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button";
import { StarIcon as PhosphorStarIcon } from "@phosphor-icons/react";

const STAR_ICON = "/assets/images/icon-star.svg";
const STAR_FILLED_ICON = (
  <PhosphorStarIcon weight="fill" size={16} color="#000000" />
);

const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  args: {
    children: "Button",
    favorited: false,
  },
  argTypes: {
    favorited: {
      control: "boolean",
    },
    icon: {
      control: false,
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

export const StarOutlineIcon: Story = {
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
