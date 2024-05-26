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
// import { CartProduct } from "../../models/components-props";
// import cartItemStateAtom from "../../states/cart-item-state";
import "./styles.scss";
import { calculateTotalPrice } from "../../utils/functions";
import shoppingCartStateAtom from "../../states/shoppingcart-state";

const CartTable: React.FC = () => {
  // const cartItem = useRecoilValue<CartProduct[]>(cartItemStateAtom);
  const shoppingCartList = useRecoilValue(shoppingCartStateAtom);
  const total = calculateTotalPrice(shoppingCartList);

  return (
    <Table
      aria-label="Table with your product's summary"
      isStriped
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
      <TableBody items={shoppingCartList}>
        {(item) => (
          <TableRow key={`${item.id}`}>
            {(columnKey) => {
              if (columnKey === "price") {
                return <TableCell>${item.price * item.quantity}</TableCell>;
              } else if (columnKey === "name") {
                return <TableCell>{item.product.name}</TableCell>;
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
