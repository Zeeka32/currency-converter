import Card from "../ui/Card/Card";
import { GraphTaps } from "../ui/GraphTaps/graphTaps";
import classes from "./history.module.css";

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

function History() {
  return (
    <div className={classes["history"]}>
      <div className={classes["header"]}>
        <div className={classes["cards"]}>
          {cards.map((card) => (
            <Card
              change={card.change}
              number={card.value}
              title={card.title}
              key={card.title}
            ></Card>
          ))}
        </div>
        <div className={classes["graph-buttons-container"]}>
          <GraphTaps />
        </div>
      </div>

      <div className="w-full h-94.25 bg-[#202022]">GRAPH</div>
    </div>
  );
}

export default History;
