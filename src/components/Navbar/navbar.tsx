import classes from "./navbar.module.css";
import Logo from "../../../public/assests/images/logo.svg";
import { useMediaQuery } from "usehooks-ts";

function Navbar() {
  const matches = useMediaQuery("(min-width: 310px)");

  return (
    <div className={classes["navbar-main"]}>
      <img src={Logo} alt="FX Checker logo" className={classes["logo-image"]} />
      <div className={classes["navbar-text"]}>
        55 CURRENCIES {matches && "· EOD · ECB DATA"}
      </div>
    </div>
  );
}

export default Navbar;
