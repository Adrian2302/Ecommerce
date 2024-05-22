import "./styles.scss";
import React from "react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import CartTable from "../cart-table";
import CheckoutForm from "../checkout-form";

const CheckoutTable: React.FC = () => {
  return (
    <div className="flex w-full flex-col">
      <Tabs
        aria-label="Options"
        classNames={{
          tabContent: "text-[black]",
        }}
      >
        <Tab key="products" title="Products" className="text-[black]">
          <CartTable />
        </Tab>
        <Tab
          key="Shipping & Payment"
          title="Shipping & Payment"
          className="text-[black]"
        >
          <Card className="flex flex-col border w-[100%] h-[100%]">
            <CardBody>
              <CheckoutForm />
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
};

export default CheckoutTable;
