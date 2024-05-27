import "./styles.scss";
import React from "react";
import { Card, Input } from "@nextui-org/react";
import { Products } from "../../models/components-props";
import { useRecoilState } from "recoil";
import { getImageURL } from "../../utils/functions";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import tokenStateAtom from "../../states/token-state";
import updateWishlistStateAtom from "../../states/update-wishlist-state";
import toast, { Toaster } from "react-hot-toast";

interface ManageProductItemProps {
  product: Products;
}

const ManageProductItem: React.FC<ManageProductItemProps> = ({ product }) => {
  const navigate = useNavigate();
  const [token, setToken] = useRecoilState(tokenStateAtom);
  const [updateList, setUpdateList] = useRecoilState(updateWishlistStateAtom);

  // const modifyItemQuantity = async (newQuantity: number) => {
  //   try {
  //     await axios.put(
  //       "http://localhost:8080/api/wishlist/editQuantity",
  //       {
  //         id: id,
  //         quantity: newQuantity,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     setUpdateList(!updateList);
  //   } catch (error: any) {
  //     console.log(`El error: ${error.response.data.description}`);
  //     // setToken(null);
  //     // navigate("/login");
  //   }
  // };

  // const modifyItemSize = async (newSize: string) => {
  //   try {
  //     await axios.put(
  //       "http://localhost:8080/api/wishlist/editSize",
  //       {
  //         id: id,
  //         size: newSize,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     setUpdateList(!updateList);
  //   } catch (error: any) {
  //     console.log(`El error: ${error.response.data.description}`);
  //     // setToken(null);
  //     // navigate("/login");
  //   }
  // };

  const clickRemove = async () => {
    try {
      await axios.delete<void>(
        `http://localhost:8080/api/product/${product.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUpdateList(!updateList);
      toast.success("Product removed!");
    } catch (error: any) {
      console.log(`El error: ${error.response.data.description}`);
      setToken(null);
      navigate("/login");
    }
  };

  return (
    <>
      <Card
        isBlurred
        shadow="sm"
        className="wishlist-item__container mx-0 my-2"
      >
        <div className="wishlist-item">
          <button
            className="wishlist-item__remove-btn wishlist-item__remove-btn--big"
            onClick={clickRemove}
          >
            &times;
          </button>
          <div className="wishlist-item__image-container">
            <img
              alt={product.name}
              className="wishlist-item__image"
              src={getImageURL(`../assets/products/${product.images[0]}`)}
            />
          </div>
          <div className="wishlist-item__info">
            <h2 className="font-semibold text-foreground/90">{product.name}</h2>
            <p className="text-small text-foreground/80">
              {product.releaseYear} | {product.color}
            </p>
            {/* {size ? (
            // <p>Size: {size}</p>
            <>
              <div>
                <label
                  className="wishlist-item__select-size__label"
                  htmlFor="wishlist-select-size"
                  tabIndex={0}
                >
                  Size:
                </label>
                <select
                  className="wishlist-item__select-size__option wishlist-item__select-option--color"
                  name="wishlist-select-size"
                  id="wishlist-select-size"
                  value={size}
                  onChange={(event) =>
                    modifyItemSize(String(event.target.value))
                  }
                >
                  {product.sizes!.map((option) => (
                    <option key={option} value={option} aria-label={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </>
          ) : null} */}

            {/* <Input
            className="wishlist-item__quantity"
            type="number"
            label="Quantity:"
            placeholder="1"
            defaultValue={String(quantity)}
            min="1"
            labelPlacement="outside"
            onChange={(event) => modifyItemQuantity(Number(event.target.value))}
            startContent={
              <div className="pointer-events-none flex items-center"></div>
            }
          /> */}
          </div>
          <p className="wishlist-item__price wishlist-item__price--bold wishlist-item__price--xl">
            ${product.price}
          </p>
        </div>
      </Card>
      <Toaster />
    </>
  );
};

export default ManageProductItem;
