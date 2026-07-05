import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { currencies } from "@/shared/constants/flagIcons";

import {
  GenericCurrencyCard,
  CurrencyFlag,
  CurrencyPair,
  NumberStack,
  CurrencyConversion,
  FavoriteButton,
  DiscardFavoriteButton,
  StaticNumberStack,
} from "./currencyCard";

const meta: Meta<typeof GenericCurrencyCard> = {
  title: "Components/CurrencyCard System",
  component: GenericCurrencyCard,
};

export default meta;
type Story = StoryObj<typeof GenericCurrencyCard>;

/* -------------------------------------------------------------------------- */
/* 1. Base empty                                                               */
/* -------------------------------------------------------------------------- */

export const BaseEmpty: Story = {
  render: () => (
    <GenericCurrencyCard left={<div>LEFT</div>} right={<div>RIGHT</div>} />
  ),
};

/* -------------------------------------------------------------------------- */
/* 2. CurrencyFlag                                                            */
/* -------------------------------------------------------------------------- */

export const FlagLeft: Story = {
  render: () => (
    <GenericCurrencyCard
      left={
        <CurrencyFlag
          currency={{ countryIcon: "us" } as any}
          title="USD"
          subtitle="US Dollar"
        />
      }
      right={<div />}
    />
  ),
};

/* -------------------------------------------------------------------------- */
/* 3. CurrencyPair                                                            */
/* -------------------------------------------------------------------------- */

export const PairLeft: Story = {
  render: () => (
    <GenericCurrencyCard
      left={<CurrencyPair from="USD" to="EUR" />}
      right={<div />}
    />
  ),
};

/* -------------------------------------------------------------------------- */
/* 6. CurrencyConversion                                                      */
/* -------------------------------------------------------------------------- */

export const Conversion: Story = {
  render: () => (
    <GenericCurrencyCard
      left={<CurrencyPair from="USD" to="JPY" />}
      right={<CurrencyConversion sourceAmount={1000} targetAmount={150000} />}
    />
  ),
};

/* -------------------------------------------------------------------------- */
/* 7. Favorite toggle                                                         */
/* -------------------------------------------------------------------------- */

export const FavoriteToggle: Story = {
  render: () => {
    const [active, setActive] = useState(false);

    return (
      <GenericCurrencyCard
        left={<CurrencyPair from="USD" to="EUR" />}
        right={
          <FavoriteButton
            active={active}
            onClick={() => setActive((v) => !v)}
          />
        }
      />
    );
  },
};

/* -------------------------------------------------------------------------- */
/* 8. Discard button                                                          */
/* -------------------------------------------------------------------------- */

export const Discard: Story = {
  render: () => (
    <GenericCurrencyCard
      left={
        <CurrencyFlag currency={{ countryIcon: "eu" } as any} title="EUR" />
      }
      right={<DiscardFavoriteButton onClick={() => {}} />}
    />
  ),
};

export const PairWithConversionAndDelete: Story = {
  render: () => {
    const pairs = [
      {
        id: "USD-EUR",
        from: "USD",
        to: "EUR",
        source: 1000,
        target: 920,
      },
      {
        id: "USD-JPY",
        from: "USD",
        to: "JPY",
        source: 1000,
        target: 150000,
      },
      {
        id: "EUR-GBP",
        from: "EUR",
        to: "GBP",
        source: 500,
        target: 430,
      },
    ] as const;

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {pairs.map((pair) => (
          <GenericCurrencyCard
            key={pair.id}
            left={<CurrencyPair from={pair.from} to={pair.to} />}
            right={
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <CurrencyConversion
                  sourceAmount={pair.source}
                  targetAmount={pair.target}
                />
                <DiscardFavoriteButton onClick={() => {}} />
              </div>
            }
          />
        ))}
      </div>
    );
  },
};

export const FavoriteItem: Story = {
  render: () => {
    const [active, setActive] = useState(true);

    return (
      <GenericCurrencyCard
        left={<CurrencyPair from="USD" to="EUR" />}
        right={
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <NumberStack headerNumber={920} contentNumber={12.5} />
            <FavoriteButton
              active={active}
              onClick={() => setActive((prev) => !prev)}
            />
          </div>
        }
      />
    );
  },
};

export const Logged: Story = {
  render: () => (
    <GenericCurrencyCard
      left={
        <div className="flex flex-col md:flex-row gap-2 ">
          <p className="text-(--Neutral-200)">{"20M"}</p>
          <CurrencyPair from={"USD"} to={"JPY"} />
        </div>
      }
      right={
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <CurrencyConversion sourceAmount={1000} targetAmount={150000} />
          <DiscardFavoriteButton onClick={() => {}} />
        </div>
      }
    />
  ),
};

export const Compare: Story = {
  render: () => {
    const [active, setActive] = useState(false);

    return (
      <GenericCurrencyCard
        left={
          <CurrencyFlag
            currency={currencies.find((c) => c.code === "EUR")!}
            title="EUR"
            subtitle="Euro"
          />
        }
        right={
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <StaticNumberStack headerNumber={920} contentNumber={1000} />
            <FavoriteButton
              active={active}
              onClick={() => setActive((prev) => !prev)}
            />
          </div>
        }
      />
    );
  },
};
