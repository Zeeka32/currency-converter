import { useState, type ReactNode } from "react";
import { useMediaQuery } from "usehooks-ts";

import MultiConvertTable from "../MultiConvertTable/MultiConvertTable";
import { TapButton } from "../ui/TapButton/tapButton";
import History from "../History/history";
import FavoriteTable from "../FavoriteTable/favoriteTable";
import { Dropdown, type DropdownItem } from "../ui/Dropdown/dropdown";

import classes from "./tabs.module.css";
import LogTable from "../LogTable/logTable";

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

const tabs = [
  {
    value: "history",
    label: "HISTORY",
    render: () => <History />,
  },
  {
    value: "compare",
    label: "COMPARE",
    render: () => (
      <MultiConvertTable data={mockData} amount={1000} sourceUnit="USD" />
    ),
  },
  {
    value: "favorite",
    label: "FAVORITES",
    count: 10,
    render: () => <FavoriteTable data={mockData} sourceCode="USD" />,
  },
  {
    value: "log",
    label: "LOG",
    count: 8,
    render: () => <LogTable data={mockData} amount={1000} sourceUnit="USD" />,
  },
] as const satisfies readonly {
  value: string;
  label: string;
  count?: number;
  render: () => ReactNode;
}[];

type TabType = (typeof tabs)[number]["value"];

const dropdownItems: DropdownItem[] = tabs.map(({ value, label }) => ({
  value,
  label,
}));

function Tabs() {
  const [activeTab, setActiveTab] = useState<TabType>("history");
  const isDesktop = useMediaQuery("(min-width: 520px)");

  const activeComponent = tabs.find((tab) => tab.value === activeTab);

  function handleTabChange(value: string) {
    setActiveTab(value as TabType);
  }

  return (
    <div className={classes.tabs}>
      {isDesktop ? (
        <div className={classes.buttons}>
          {tabs.map((tab) => (
            <TapButton
              key={tab.value}
              selected={activeTab === tab.value}
              onClick={() => setActiveTab(tab.value)}
            >
              {tab.label}
            </TapButton>
          ))}
        </div>
      ) : (
        <Dropdown
          items={dropdownItems}
          selectedValue={activeTab}
          onSelectedValueChange={handleTabChange}
        />
      )}

      {activeComponent?.render()}
    </div>
  );
}

export default Tabs;
