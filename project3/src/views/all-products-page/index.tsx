import "./styles.scss";
import ProductList from "../../components/products-list";
import SearchInput from "../../components/search-input";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Products } from "../../models/components-props";
import CheckboxFilter from "../../components/checkbox-filter";
import useSelectedItems from "../../utils/useSelectedItems";
import Pagination from "../../components/pagination";
import { Accordion, AccordionItem, Slider } from "@nextui-org/react";
// import PriceFilter from "../../components/price-filter";
import thankYouStateAtom from "../../states/thank-you-state";
import { useRecoilState } from "recoil";
import LoadingCircle from "../../components/loading-circle";

interface ProductsApiResponse {
  content: Products[];
  totalPages: number;
}

const AllProductsPage: React.FC = () => {
  const [isLoading, setLoading] = useState(true);
  const [priceRange, setPriceRange] = useState<number[]>([0, 2000]);
  const [filteredProducts, setFilteredProducts] = useState<Products[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [uniqueBrands, setUniqueBrands] = useState<string[]>([]);
  const [uniqueCategories, setUniqueCategories] = useState<string[]>([]);
  const [selectedDates, handleDateChange] = useSelectedItems([]);
  const [selectedBrands, handleBrandChange] = useSelectedItems([]);
  const [selectedCategories, handleCategoryChange] = useSelectedItems([]);
  // const [selectedPriceRanges, handlePriceRangeChange] = useSelectedItems([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const POSTSPERPAGE = 10;
  const [thankYouValue, setThankYou] =
    useRecoilState<boolean>(thankYouStateAtom);
  if (thankYouValue) {
    setThankYou(false);
  }

  useEffect(() => {
    // Fetch unique brands and categories only once when component mounts
    const fetchUniqueBrandsAndCategories = async () => {
      try {
        const response = await axios.get<ProductsApiResponse>(
          "http://localhost:8080/api/product/filter"
        );

        const products = response.data.content;

        const brands = [
          ...new Set(products.map((product: Products) => product.brand)),
        ];
        const categories = [
          ...new Set(products.map((product: Products) => product.category)),
        ];
        setUniqueBrands(brands);
        setUniqueCategories(categories);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching unique brands and categories:", error);
      }
    };

    fetchUniqueBrandsAndCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const formattedBrands = selectedBrands.join(",");
      const formattedCategories = selectedCategories.join(",");
      const formattedYears = selectedDates.join(",");

      const response = await axios.get<ProductsApiResponse>(
        "http://localhost:8080/api/product/filter",
        {
          params: {
            brands: formattedBrands,
            categories: formattedCategories,
            years: formattedYears, //|| undefined,
            minPrice: priceRange[0],
            maxPrice: priceRange[1],
            name: searchTerm,
            page: currentPage - 1,
            size: POSTSPERPAGE,
          },
        }
      );

      const products = response.data.content;

      setFilteredProducts(products);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [
    searchTerm,
    selectedBrands,
    selectedCategories,
    selectedDates,
    // selectedPriceRanges,
    priceRange,
    currentPage,
  ]);

  useEffect(() => {
    setCurrentPage(1);
  }, [
    selectedBrands,
    selectedCategories,
    selectedDates,
    priceRange,
    searchTerm,
  ]);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const handleChange = (newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      setPriceRange(newValue);
    } else {
      setPriceRange([newValue]);
    }
  };

  return (
    <main className="all-products">
      <h1 className="all-products__title all-products__title--big all-products__title--bold">
        All Products
      </h1>
      <div className="all-products__search">
        <SearchInput onChangeCallback={handleSearchChange} />
      </div>
      <Accordion variant="bordered">
        <AccordionItem key="1" aria-label="Filter By" title="Filter By">
          <div className="all-products__filters">
            <CheckboxFilter
              title="Brand"
              filter={uniqueBrands}
              onChangeCallback={handleBrandChange}
            />
            <CheckboxFilter
              title="Category"
              filter={uniqueCategories}
              onChangeCallback={handleCategoryChange}
            />
            <CheckboxFilter
              title="Date"
              filter={["2020", "2021", "2022", "2023"]}
              onChangeCallback={handleDateChange}
            />
            {/* <PriceFilter onChangeCallback={handlePriceRangeChange} /> */}
            <Slider
              size="sm"
              aria-label="Price Range slider"
              label="Price Range"
              step={100}
              minValue={0}
              maxValue={2000}
              value={priceRange}
              onChange={handleChange}
              formatOptions={{ style: "currency", currency: "USD" }}
              className="max-w-sm"
            />
          </div>
        </AccordionItem>
      </Accordion>
      {isLoading ? (
        <LoadingCircle />
      ) : (
        <div className="all-products__list">
          {filteredProducts.length === 0 ? (
            // <Nothing />
            <p>No items match the description</p>
          ) : (
            <ProductList itemList={filteredProducts} />
          )}
          <Pagination
            totalPosts={totalPages * POSTSPERPAGE}
            postsPerPage={POSTSPERPAGE}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </div>
      )}
    </main>
  );
};

export default AllProductsPage;
