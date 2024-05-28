import "./styles.scss";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/react";
import { useRecoilState } from "recoil";
import UserOrderProducts from "../user-order-products";
import axios from "axios";
import tokenStateAtom from "../../states/token-state";
import { Order } from "../../models/components-props";
import { useNavigate } from "react-router-dom";
import LoadingCircle from "../loading-circle";

const AdminOrdersTable: React.FC = () => {
  const [token, setToken] = useRecoilState(tokenStateAtom);
  const [orders, setOrders] = useState<Order[]>();
  const [isLoading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [updateOrders, setUpdateOrders] = useState<boolean>(false);

  const fetchAllOrders = async () => {
    try {
      const fetchedOrders = await axios.get(
        `http://localhost:8080/api/order/all`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setOrders(fetchedOrders.data);
      setLoading(false);
    } catch (error: any) {
      console.log(`El error: ${error.response.data.description}`);
      if (error.response && error.response.status === 440) {
        setToken(null);
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [updateOrders]);

  const sortedOrders = orders?.slice().sort((a, b) => b.id - a.id);

  const status = ["PENDING", "CONFIRMED", "CANCELLED"];

  const modifyOrderStatus = async (id: number, newStatus: string) => {
    try {
      await axios.put(
        "http://localhost:8080/api/order/editStatus",
        {
          id: id,
          status: newStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUpdateOrders(!updateOrders);
    } catch (error: any) {
      console.log(`El error: ${error.response.data.description}`);
      if (error.response && error.response.status === 440) {
        setToken(null);
        navigate("/login");
      }
    }
  };

  return (
    <>
      {isLoading ? (
        <LoadingCircle />
      ) : (
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
                  } else if (columnKey === "price") {
                    return <TableCell>${order.price}</TableCell>;
                  } else if (columnKey === "cardNumber") {
                    return (
                      <TableCell>**************{order.cardNumber}</TableCell>
                    );
                  } else if (columnKey === "status") {
                    return (
                      <TableCell>
                        <select
                          aria-label="Order status"
                          name="order-status"
                          id="order-status"
                          value={order.status}
                          onChange={(event) =>
                            modifyOrderStatus(
                              order.id,
                              String(event.target.value)
                            )
                          }
                        >
                          {status.map((option) => (
                            <option
                              key={option}
                              value={option}
                              aria-label={option}
                            >
                              {option}
                            </option>
                          ))}
                        </select>
                      </TableCell>
                    );
                  } else {
                    return (
                      <TableCell>{getKeyValue(order, columnKey)}</TableCell>
                    );
                  }
                }}
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
    </>
  );
};

export default AdminOrdersTable;
