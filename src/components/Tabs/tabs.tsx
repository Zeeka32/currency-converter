import { useMemo, useState, type ReactNode } from "react";
import { useMediaQuery } from "usehooks-ts";

import MultiConvertTable from "../MultiConvertTable/MultiConvertTable";
import { TapButton } from "../ui/TapButton/tapButton";
import History from "../History/history";
import FavoriteTable from "../FavoriteTable/favoriteTable";
import { Dropdown, type DropdownItem } from "../ui/Dropdown/dropdown";
import LogTable from "../LogTable/logTable";
import { useCurrencyConverter } from "@/shared/contexts/currencyConverterContext";

import classes from "./tabs.module.css";

type TabType = "history" | "compare" | "favorite" | "log";

type TabItem = {
  value: TabType;
  label: string;
  count: number;
  render: () => ReactNode;
};

function getTabs({
  favoritesCount,
  logsCount,
}: {
  favoritesCount: number;
  logsCount: number;
}): TabItem[] {
  return [
    {
      value: "history",
      label: "HISTORY",
      render: () => <History />,
      count: -1,
    },
    {
      value: "compare",
      label: "COMPARE",
      render: () => <MultiConvertTable />,
      count: -1,
    },
    {
      value: "favorite",
      label: "FAVORITES",
      render: () => <FavoriteTable />,
      count: favoritesCount,
    },
    {
      value: "log",
      label: "LOG",
      render: () => <LogTable />,
      count: logsCount,
    },
  ];
}

function Tabs() {
  const [activeTab, setActiveTab] = useState<TabType>("history");
  const isDesktop = useMediaQuery("(min-width: 520px)");

  const { logs, favorites } = useCurrencyConverter();

  const tabs = useMemo(
    () =>
      getTabs({
        favoritesCount: favorites.length,
        logsCount: logs.length,
      }),
    [favorites.length, logs.length],
  );

  const dropdownItems: DropdownItem[] = useMemo(
    () =>
      tabs.map(({ value, label, count }) => ({
        value,
        label,
        count,
      })),
    [tabs],
  );

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
              count={tab.count}
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
      <div key={activeTab} className={classes["active-tab"]}>
        {activeComponent?.render()}
      </div>
    </div>
  );
}

export default Tabs;
