import "./styles.scss";
import React from "react";
import { Card, Input } from "@nextui-org/react";
import { Products } from "../../models/components-props";
import { useRecoilState } from "recoil";
import { getImageURL } from "../../utils/functions";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import tokenStateAtom from "../../states/token-state";
import toast, { Toaster } from "react-hot-toast";
import updateManageProductsStateAtom from "../../states/update-manage-products-state";

interface ManageProductItemProps {
  product: Products;
}

const ManageProductItem: React.FC<ManageProductItemProps> = ({ product }) => {
  const navigate = useNavigate();
  const [token, setToken] = useRecoilState(tokenStateAtom);
  const [updateProducts, setUpdateProducts] = useRecoilState(
    updateManageProductsStateAtom
  );

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
      setUpdateProducts(!updateProducts);
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
        className="manage-product-item__container mx-0 my-2"
      >
        <div className="manage-product-item">
          <button
            className="manage-product-item__remove-btn manage-product-item__remove-btn--big"
            onClick={clickRemove}
          >
            &times;
          </button>
          <div className="manage-product-item__image-container">
            <img
              alt={product.name}
              className="manage-product-item__image"
              src={getImageURL(product.images[0])}
            />
          </div>
          <div className="manage-product-item__info">
            <h2 className="font-semibold text-foreground/90">{product.name}</h2>
            <p className="text-small text-foreground/80">
              {product.releaseYear} | {product.color}
            </p>
          </div>
          <p className="manage-product-item__price manage-product-item__price--bold manage-product-item__price--xl">
            ${product.price}
          </p>
        </div>
      </Card>
      <Toaster />
    </>
  );
};

export default ManageProductItem;
