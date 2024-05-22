import "./styles.scss";
import React from "react";
import { Accordion, AccordionItem } from "@nextui-org/react";
import verified from "../../assets/icons/verified.svg";
import promise from "../../assets/icons/promise.svg";

const StockxVerified: React.FC = () => {
  return (
    <Accordion variant="bordered" className="stockx-verified">
      <AccordionItem
        key="1"
        aria-label="StockX Verified"
        title="StockX Verified"
        startContent={
          <img
            className="stoxkx-verified"
            src={verified}
            alt="StockX Verified logo"
          />
        }
      >
        StockX Verified is our own designation and means that we inspect every
        item, every time.
      </AccordionItem>
      <AccordionItem
        key="2"
        aria-label="Our Promise"
        title="Our Promise"
        startContent={
          <img
            className="stoxkx-promise"
            src={promise}
            alt="StockX Promise logo"
          />
        }
      >
        We strive to earn and keep your trust. If we make a mistake, we'll make
        it right.
      </AccordionItem>
    </Accordion>
  );
};

export default StockxVerified;
