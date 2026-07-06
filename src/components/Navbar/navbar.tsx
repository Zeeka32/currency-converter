import classes from "./navbar.module.css";
import Logo from "../../../public/assets/images/logo.svg";
import { useMediaQuery } from "usehooks-ts";
import { Marquee } from "../Marquee/marquee";

const sampleItems: any[] = [
  { from: "USD", to: "EUR", rate: 0.92, change: 1.34 },
  { from: "USD", to: "JPY", rate: 146.31, change: -0.87 },
  { from: "EUR", to: "GBP", rate: 0.86, change: 0.12 },
  { from: "CAD", to: "CHF", rate: 0.61, change: -2.15 },
  { from: "AUD", to: "USD", rate: 0.66, change: 0.45 },
];

function Navbar() {
  const matches = useMediaQuery("(min-width: 310px)");

  return (
    <div className={classes["navbar-main"]}>
      <div className={classes["navbar-top"]}>
        <img
          src={Logo}
          alt="FX Checker logo"
          className={classes["logo-image"]}
        />
        <div className={classes["navbar-text"]}>
          55 CURRENCIES {matches && "· EOD · ECB DATA"}
        </div>
      </div>
      <Marquee items={sampleItems} />
    </div>
  );
}

export default Navbar;
