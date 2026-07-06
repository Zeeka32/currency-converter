import { Button as PrimitiveButton } from "@base-ui/react/button";
import { InputField } from "../ui/InputField/inputField";
import classes from "./content.module.css";
import ExchangeIcon from "/assets/images/icon-exchange.svg";
import { Button } from "../ui/Button/button";
import Tabs from "../Tabs/tabs";

function Content() {
  return (
    <div className={classes["content-main"]}>
      <h2 className={classes["content-header"]}>CHECK THE RATE</h2>
      <div className={classes["rate-section"]}>
        <div className={classes["rate-section-top"]}>
          <InputField label="SEND" />
          <PrimitiveButton className={classes["exchange-button"]}>
            <img src={ExchangeIcon}></img>
          </PrimitiveButton>
          <InputField label="RECEIVE" />
        </div>
        <div className={classes["rate-section-bottom"]}>
          <div className={classes["bottom-left"]}>1 USD = 0.8530 EUR</div>
          <div className={classes["bottom-right"]}>
            <Button>FAVORITE</Button>
            <Button>LOG CONVERSION</Button>
          </div>
        </div>
      </div>
      <Tabs />
    </div>
  );
}

export default Content;
