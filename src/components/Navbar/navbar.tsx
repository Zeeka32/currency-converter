import classes from "./navbar.module.css";
import Logo from "../../../public/assets/images/logo.svg";
import { useMediaQuery } from "usehooks-ts";
import { Marquee } from "../Marquee/marquee";
import { useEffect, useState } from "react";

const sampleItems = [
  { from: "USD" as const, to: "EUR" as const, rate: 0.92, change: 1.34 },
  { from: "USD" as const, to: "JPY" as const, rate: 146.31, change: -0.87 },
  { from: "EUR" as const, to: "GBP" as const, rate: 0.86, change: 0.12 },
  { from: "CAD" as const, to: "CHF" as const, rate: 0.61, change: -2.15 },
  { from: "AUD" as const, to: "USD" as const, rate: 0.66, change: 0.45 },
];

function Navbar() {
  const matches = useMediaQuery("(min-width: 340px)");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 0);
    }

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`${classes["navbar-main"]} ${
        isScrolled ? classes.scrolled : ""
      }`}
    >
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
