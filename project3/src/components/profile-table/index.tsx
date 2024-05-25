import "./styles.scss";
import React from "react";
import { Tabs, Tab } from "@nextui-org/react";
import { UserRole } from "../../models/components-props";

const ProfileTable: React.FC<UserRole> = ({ role }) => {
  return (
    <div className="flex w-full flex-col">
      <Tabs
        aria-label="Options"
        classNames={{
          tabContent: "text-[black]",
        }}
      >
        <Tab key="user-profile" title="Profile" className="text-[black]">
          <UserProfile />
        </Tab>
        <Tab
          key="Shipping & Payment"
          title="Shipping & Payment"
          className="text-[black]"
        >
          <OrdersTable />
        </Tab>
        {role! > 1 ? (
          <Tab
            key="Shipping & Payment"
            title="Shipping & Payment"
            className="text-[black]"
          >
            <ProductsTable />
          </Tab>
        ) : null}
      </Tabs>
    </div>
  );
};

export default ProfileTable;
