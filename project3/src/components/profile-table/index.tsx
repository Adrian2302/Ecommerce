import "./styles.scss";
import React from "react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import UserProfile from "../user-profile";
import OrdersTable from "../orders-table";
import currentUserStateAtom from "../../states/current-user-state";
import { useRecoilValue } from "recoil";
import ProductsTable from "../products-table";

const ProfileTable: React.FC = () => {
  const currentUser = useRecoilValue(currentUserStateAtom);

  return (
    <div className="flex w-full flex-col">
      <Tabs
        aria-label="Options"
        classNames={{
          tabContent: "text-[black]",
        }}
      >
        <Tab key="user-account" title="Account" className="text-[black]">
          <Card className="flex flex-col border w-[100%] h-[100%]">
            <CardBody>
              <UserProfile />
            </CardBody>
          </Card>
        </Tab>
        <Tab key="orders" title="Orders" className="text-[black]">
          <OrdersTable />
        </Tab>
        {currentUser.role.id! > 1 ? (
          <Tab key="products" title="Products" className="text-[black]">
            <Card className="flex flex-col border w-[100%] h-[100%]">
              <CardBody>
                <ProductsTable />
              </CardBody>
            </Card>
          </Tab>
        ) : null}
      </Tabs>
    </div>
  );
};

export default ProfileTable;
