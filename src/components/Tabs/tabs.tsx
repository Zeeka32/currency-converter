import { useState } from "react";
import MultiConvertTable from "../MultiConvertTable/MultiConvertTable";
import { TapButton } from "../ui/TapButton/tapButton";
import classes from "./tabs.module.css";
import Card from "../ui/Card/Card";

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

type TabType = "history" | "compare" | "favorite" | "log";

const tabs: { value: TabType; label: string; render: () => React.ReactNode }[] =
  [
    {
      value: "history",
      label: "HISTORY",
      render: () => <></>,
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
      render: () => <></>,
    },
    {
      value: "log",
      label: "LOG",
      render: () => <></>,
    },
  ];

const cards: {
  title: string;
  value: number;
  change: "normal" | "change" | "%";
}[] = [
  {
    title: "OPEN",
    value: 0.8516,
    change: "normal",
  },
  {
    title: "LAST",
    value: 0.8516,
    change: "normal",
  },
  {
    title: "CHANGE",
    value: 0.016,
    change: "change",
  },
  {
    title: "% CHANGE",
    value: 0.018,
    change: "%",
  },
];

function Tabs() {
  const [activeTab, setActiveTab] = useState<TabType>("history");

  return (
    <div className={classes.tabs}>
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

      {tabs.map((tab) => (tab.value === activeTab ? tab.render() : <></>))}
    </div>
  );
}

export default Tabs;
