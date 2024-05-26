import "./styles.scss";
import React from "react";
import currentUserStateAtom from "../../states/current-user-state";
import { useRecoilValue } from "recoil";
import UserOrdersTable from "../user-orders-table";
import AdminOrdersTable from "../admin-orders-table";

const OrdersTable: React.FC = () => {
  const currentUser = useRecoilValue(currentUserStateAtom);

  return (
    <>{currentUser.role.id > 1 ? <AdminOrdersTable /> : <UserOrdersTable />}</>
  );
};

export default OrdersTable;
