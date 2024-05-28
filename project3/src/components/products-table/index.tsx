import "./styles.scss";
import React, { useEffect, useState } from "react";
import { Divider } from "@nextui-org/react";
import CartList from "../../components/cart-list";
import { useRecoilValue, useRecoilState } from "recoil";
import thankYouStateAtom from "../../states/thank-you-state";
import axios from "axios";
import LoadingCircle from "../../components/loading-circle";
import { Products, ProductsApiResponse } from "../../models/components-props";
import SearchInput from "../search-input";
import AddProductBtn from "../add-product-btn";
import ManageProductItem from "../manage-product-item";
import Pagination from "../../components/pagination";
import updateManageProductsStateAtom from "../../states/update-manage-products-state";

const ProductsTable: React.FC = () => {
  const updateProducts = useRecoilValue(updateManageProductsStateAtom);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isLoading, setLoading] = useState(true);
  const [thankYouValue, setThankYou] =
    useRecoilState<boolean>(thankYouStateAtom);
  const [productsList, setProductsList] = useState<Products[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const POSTSPERPAGE = 10;

  if (thankYouValue) {
    setThankYou(false);
  }

  useEffect(() => {
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
    fetchProducts();
  }, [searchTerm, currentPage, updateProducts]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  return (
    <div className="products-table">
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
    </div>
  );
};

export default ProductsTable;
