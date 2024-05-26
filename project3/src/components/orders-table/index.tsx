import "./styles.scss";
import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/react";
import currentUserStateAtom from "../../states/current-user-state";
import { useRecoilValue } from "recoil";
import UserOrderProducts from "../user-order-products";

const OrdersTable: React.FC = () => {
  const currentUser = useRecoilValue(currentUserStateAtom);
  const sortedOrders = currentUser.orders.slice().sort((a, b) => b.id - a.id);

  return (
    <Table
      aria-label="Table with your orders"
      isHeaderSticky
      // bottomContent={
      //   <div className=" cart-table__bottom-content">
      //     <div className="cart-table__bottom-content-price">
      //       <p>
      //         Total price:{" "}
      //         <span className="cart-table__bottom-content-price--bold">
      //           ${total}
      //         </span>
      //       </p>
      //     </div>
      //   </div>
      // }
      classNames={{
        wrapper: "min-h-[222px]",
        th: "text-[black]",
      }}
    >
      <TableHeader>
        <TableColumn key="id">ID</TableColumn>
        <TableColumn key="purchaseDate">Date</TableColumn>
        <TableColumn key="address1">Address 1</TableColumn>
        <TableColumn key="address2">Address 2</TableColumn>
        <TableColumn key="city">City</TableColumn>
        <TableColumn key="province">Province</TableColumn>
        <TableColumn key="cardNumber">Card</TableColumn>
        <TableColumn key="items">Products</TableColumn>
        <TableColumn key="price">Total Price</TableColumn>
        <TableColumn key="status">Status</TableColumn>
      </TableHeader>
      <TableBody items={sortedOrders}>
        {(order) => (
          <TableRow key={`${order.id}`}>
            {(columnKey) => {
              if (columnKey === "items") {
                return (
                  <TableCell>
                    <UserOrderProducts orderItems={order.items} />
                  </TableCell>
                );
              } else if (columnKey === "purchaseDate") {
                const date = new Date(order.purchaseDate);
                const newDate = new Intl.DateTimeFormat("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }).format(date);
                return <TableCell>{newDate}</TableCell>;
              } else if (
                columnKey === "status" &&
                order.status === "CONFIRMED"
              ) {
                return (
                  <TableCell className="text-[#006340]">
                    {order.status}
                  </TableCell>
                );
              } else if (
                columnKey === "status" &&
                order.status === "CANCELLED"
              ) {
                return (
                  <TableCell className="text-[#bb2c2c]">
                    {order.status}
                  </TableCell>
                );
              } else if (columnKey === "price") {
                return <TableCell>${order.price}</TableCell>;
              } else {
                return <TableCell>{getKeyValue(order, columnKey)}</TableCell>;
              }
            }}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default OrdersTable;
