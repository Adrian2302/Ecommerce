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
import { useRecoilValue } from "recoil";
import { CartProduct } from "../../models/components-props";
import cartItemStateAtom from "../../states/cart-item-state";
import "./styles.scss";
import { calculateTotalPrice } from "../../utils/functions";

const CartTable: React.FC = () => {
  const cartItem = useRecoilValue<CartProduct[]>(cartItemStateAtom);
  const total = calculateTotalPrice(cartItem);

  return (
    <Table
      aria-label="Table with your product's summary"
      bottomContent={
        <div className=" cart-table__bottom-content">
          <div className="cart-table__bottom-content-price">
            <p>
              Total price:{" "}
              <span className="cart-table__bottom-content-price--bold">
                ${total}
              </span>
            </p>
          </div>
        </div>
      }
      classNames={{
        wrapper: "min-h-[222px]",
        th: "text-[black]",
      }}
    >
      <TableHeader>
        <TableColumn className="" key="name">
          Name
        </TableColumn>
        <TableColumn key="size">Size</TableColumn>
        <TableColumn key="quantity">Quantity</TableColumn>
        <TableColumn key="price">Price</TableColumn>
      </TableHeader>
      <TableBody items={cartItem}>
        {(item) => (
          <TableRow key={`${item.id}-${item.size}`}>
            {(columnKey) => {
              if (columnKey === "price") {
                return <TableCell>${item.price * item.quantity}</TableCell>;
              } else {
                return <TableCell>{getKeyValue(item, columnKey)}</TableCell>;
              }
            }}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default CartTable;
