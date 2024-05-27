import "./styles.scss";
import React, { useEffect, useState } from "react";
import { Button, Divider } from "@nextui-org/react";
import CartList from "../../components/cart-list";
import CartInfo from "../../components/cart-info";
// import cartItemStateAtom from "../../states/cart-item-state";
import { useRecoilValue, useRecoilState } from "recoil";
// import { CartProduct } from "../../models/components-props";
import thankYouStateAtom from "../../states/thank-you-state";
import EmptyCart from "../../components/empty-cart";
import tokenStateAtom from "../../states/token-state";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import updateCartStateAtom from "../../states/update-cart-state";
import LoadingCircle from "../../components/loading-circle";
import CartItem from "../../components/cart-item";
import { Products, ProductsApiResponse } from "../../models/components-props";
import shoppingCartStateAtom from "../../states/shoppingcart-state";
import SearchInput from "../search-input";
import AddProductBtn from "../add-product-btn";
import ManageProductItem from "../manage-product-item";
import Pagination from "../../components/pagination";
import updateManageProductsStateAtom from "../../states/update-manage-products-state";
import { Toaster } from "react-hot-toast";

const ProductsTable: React.FC = () => {
  const updateProducts = useRecoilValue(updateManageProductsStateAtom);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isLoading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [token, setToken] = useRecoilState(tokenStateAtom);
  const [thankYouValue, setThankYou] =
    useRecoilState<boolean>(thankYouStateAtom);
  const [productsList, setProductsList] = useState<Products[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const POSTSPERPAGE = 10;

  if (thankYouValue) {
    setThankYou(false);
  }

  const fetchProducts = async () => {
    try {
      const fetchedProductsList = await axios.get<ProductsApiResponse>(
        "http://localhost:8080/api/product/filter",
        {
          params: {
            name: searchTerm,
            page: currentPage - 1,
            size: POSTSPERPAGE,
          },
        }
      );
      setProductsList(fetchedProductsList.data.content);
      setTotalPages(fetchedProductsList.data.totalPages);
      setLoading(false);
    } catch (error: any) {
      console.log(`El error: ${error.response.data.description}`);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [searchTerm, currentPage, updateProducts]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  console.log(productsList);

  return (
    <main className="products-table">
      <h2 className="products-table__title products-table__title--big products-table__title--bold">
        Manage products
      </h2>
      <AddProductBtn />
      <Divider className="products-table__divider" />
      <div className="products-table__content">
        {isLoading ? (
          <LoadingCircle />
        ) : (
          <div className="w-full">
            <SearchInput onChangeCallback={handleSearchChange} />
            <CartList
              children={productsList.map((product, index) => (
                <ManageProductItem key={index} product={product} />
              ))}
              animation={false}
            />
            <Pagination
              totalPosts={totalPages * POSTSPERPAGE}
              postsPerPage={POSTSPERPAGE}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
          </div>
        )}
      </div>
      <Toaster />
    </main>
  );
};

export default ProductsTable;
