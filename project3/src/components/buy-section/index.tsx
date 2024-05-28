import "./styles.scss";
import React, { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Products } from "../../models/components-props";
import { Button } from "@nextui-org/react";
import { useRecoilState } from "recoil";
import MySelect from "../../components/my-select";
import toast, { Toaster } from "react-hot-toast";
import tokenStateAtom from "../../states/token-state";
import axios from "axios";
import updateCartStateAtom from "../../states/update-cart-state";

interface BuySectionProps {
  product: Products;
}

const BuySection: React.FC<BuySectionProps> = ({ product }) => {
  const [selectedSize, setSelectedSize] = useState<string>();
  const [token, setToken] = useRecoilState(tokenStateAtom);
  const [updateCart, setUpdateCart] = useRecoilState(updateCartStateAtom);
  const navigate = useNavigate();

  const AddProduct = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (
        product.sizes!.length > 0 &&
        (selectedSize === null || selectedSize === undefined)
      ) {
        toast.error("Please select a size.");
      } else {
        await axios.post(
          `http://localhost:8080/api/cart`,
          {
            product: { id: product.id },
            size: selectedSize,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success("Product added to cart!");
        setUpdateCart(!updateCart);
      }
    } catch (error: any) {
      console.log(`El error: ${error.response.data.description}`);
      if (
        (error.response && error.response.status === 440) ||
        error.response.status === 500
      ) {
        setToken(null);
        navigate("/login");
      } else {
        toast.error("Product is already in the cart.");
      }
    }
  };
  return (
    <div className="buy-container">
      {product?.sizes!.length > 0 ? (
        <MySelect
          dictionary={product.sizes!}
          onChange={setSelectedSize}
          label="Select a size"
        />
      ) : null}
      <Button
        className="buy-container__add-btn bg-[$stockx-color] text-[$white]"
        onClick={AddProduct}
      >
        <p className="buy-container__add-btn--bold">
          Add to Cart for ${product.price}
        </p>
      </Button>
      <Toaster />
    </div>
  );
};

export default BuySection;
