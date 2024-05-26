import "./styles.scss";
import React from "react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import UserProfile from "../user-profile";
import OrdersTable from "../orders-table";
import currentUserStateAtom from "../../states/current-user-state";
import { useRecoilValue } from "recoil";

const ProfileTable: React.FC = () => {
  // const currentUser = useRecoilValue(currentUserStateAtom);

  return (
    <main className="flex w-full flex-col">
      <Tabs
        aria-label="Options"
        classNames={{
          tabContent: "text-[black]",
        }}
      >
        <Tab key="user-profile" title="Profile" className="text-[black]">
          <Card className="flex flex-col border w-[100%] h-[100%]">
            <CardBody>
              <UserProfile />
            </CardBody>
          </Card>
        </Tab>
        <Tab key="Orders" title="Orders" className="text-[black]">
          <OrdersTable />
        </Tab>
        {/* {currentUser!.role.id! > 1 ? (
          <Tab
            key="Shipping & Payment"
            title="Shipping & Payment"
            className="text-[black]"
          >
            <ProductsTable />
          </Tab>
        ) : null} */}
      </Tabs>
    </main>
  );
};

export default ProfileTable;
