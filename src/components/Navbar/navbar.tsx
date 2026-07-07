import classes from "./navbar.module.css";
import Logo from "/assets/images/logo.svg";
import { useMediaQuery } from "usehooks-ts";
import { Marquee } from "../Marquee/marquee";
import { useEffect, useState } from "react";

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

      <Marquee />
    </div>
  );
}

export default Navbar;
