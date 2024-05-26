import "./styles.scss";
import React from "react";
import { OrderItem } from "../../models/components-props";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  getKeyValue,
  useDisclosure,
} from "@nextui-org/react";

interface UserOrderProductsProps {
  orderItems: OrderItem[];
}

const UserOrderProducts: React.FC<UserOrderProductsProps> = ({
  orderItems,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button onPress={onOpen}>Products</Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior="inside"
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Products:
              </ModalHeader>
              <ModalBody>
                <Table
                  aria-label="Table with your orders"
                  isHeaderSticky
                  isStriped
                  classNames={{
                    wrapper: "min-h-[222px]",
                    th: "text-[black]",
                  }}
                >
                  <TableHeader>
                    <TableColumn key="productName">Name</TableColumn>
                    <TableColumn key="size">Size</TableColumn>
                    <TableColumn key="quantity">Quantity</TableColumn>
                    <TableColumn key="price">Unit Price</TableColumn>
                    <TableColumn key="total-price">Total Price</TableColumn>
                  </TableHeader>
                  <TableBody items={orderItems}>
                    {(order) => (
                      <TableRow key={`${order.id}`}>
                        {(columnKey) => {
                          if (columnKey === "total-price") {
                            return (
                              <TableCell>
                                ${order.price * order.quantity}
                              </TableCell>
                            );
                          } else if (columnKey === "price") {
                            return <TableCell>${order.price}</TableCell>;
                          } else {
                            return (
                              <TableCell>
                                {getKeyValue(order, columnKey)}
                              </TableCell>
                            );
                          }
                        }}
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default UserOrderProducts;
