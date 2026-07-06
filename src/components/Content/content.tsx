import { Button as PrimitiveButton } from "@base-ui/react/button";
import { InputField } from "../ui/InputField/inputField";
import classes from "./content.module.css";
import ExchangeIcon from "/assets/images/icon-exchange.svg";
import ExchangeIconVertical from "/assets/images/icon-exchange-vertical.svg";
import { Button } from "../ui/Button/button";
import Tabs from "../Tabs/tabs";
import { useMediaQuery } from "usehooks-ts";

function Content() {
  const matches700 = useMediaQuery("(min-width: 700px)");
  const matches375 = useMediaQuery("(min-width: 375px)");

  return (
    <div className={classes["content-main"]}>
      <h2 className={classes["content-header"]}>CHECK THE RATE</h2>
      <div className={classes["rate-section"]}>
        <div className={classes["rate-section-top"]}>
          <InputField placeholder="0" className="w-full" label="SEND" />
          <PrimitiveButton className={classes["exchange-button"]}>
            <img src={matches700 ? ExchangeIcon : ExchangeIconVertical}></img>
          </PrimitiveButton>
          <InputField
            placeholder="0"
            className="w-full"
            receive
            label="RECEIVE"
          />
        </div>
        <div className={classes["rate-section-bottom"]}>
          <div className={classes["bottom-left"]}>1 USD = 0.8530 EUR</div>
          <div className={classes["bottom-right"]}>
            <Button className={classes.button}>FAVORITE</Button>
            <Button className={classes.button}>
              LOG {matches375 && "CONVERSION"}
            </Button>
          </div>
        </div>
      </div>
      <Tabs />
    </div>
  );
}

export default Content;
