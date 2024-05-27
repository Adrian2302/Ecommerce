import "./styles.scss";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import useFetch from "../../utils/useFetch";
import { Products } from "../../models/components-props";
import { Divider } from "@nextui-org/react";
import BuySection from "../../components/buy-section";
import ProductPerformance from "../../components/product-performance";
import Details from "../../components/details";
import StockxVerified from "../../components/stockx-verified";
// import ErrorPage from "../error-page";
import { useRecoilState } from "recoil";
import thankYouStateAtom from "../../states/thank-you-state";
import axios from "axios";
import ImagesSlider from "../../components/images-slider";
import AddToWishlistBtn from "../../components/add-to-wishlist-btn";
import ErrorPage from "../error-page";
import LoadingCircle from "../../components/loading-circle";
import { getImageURL } from "../../utils/functions";

const ProductDetailsPage: React.FC = () => {
  const [isLoading, setLoading] = useState(true);
  const [product, setProduct] = useState<Products>();
  const [thankYouValue, setThankYou] =
    useRecoilState<boolean>(thankYouStateAtom);
  if (thankYouValue) {
    setThankYou(false);
  }
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get<Products>(
          `http://localhost:8080/api/product/${id}`
        );

        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProduct();
  }, [id]);

  return (
    <main className="product-details">
      {/* {loading && <p>Loading...</p>}
      {error && <p>There was an error loading the product</p>}
      {!loading && !error && !product && <ErrorPage />}
      {!loading && !error && product && ( */}
      {isLoading ? (
        <LoadingCircle />
      ) : product ? (
        <>
          <div className="product-details__container">
            <div className="product-details__buy-container">
              <BuySection product={product} />
            </div>
            <div className="product-details__heading-container">
              <div>
                <h1
                  className="product-details__heading-title product-details__heading-title--semi-bold product-details__heading-title--1xl"
                  tabIndex={0}
                >
                  {product.name}
                </h1>
                <p className="product-details__heading-info" tabIndex={0}>
                  {product.color}
                </p>
              </div>
              <AddToWishlistBtn productId={product.id} />
            </div>
            <div className="product-details__image-container">
              {product.images.length > 1 ? (
                <ImagesSlider imageSources={product!.images} />
              ) : (
                <img
                  className="product-details__image"
                  src={getImageURL(product.images[0])}
                  alt={product.name}
                  tabIndex={0}
                />
              )}
            </div>
            <div className="product-details__performance-container">
              <ProductPerformance product={product} />
            </div>
            <div className="product-details__verified-container">
              <StockxVerified />
            </div>
          </div>
          <Divider className="product-details__divider" />
          <div className="product-details__details">
            <Details product={product} />
          </div>
        </>
      ) : (
        <ErrorPage />
      )}
      {/* )} */}
    </main>
  );
};

export default ProductDetailsPage;

// import "./styles.scss";
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// // import useFetch from "../../utils/useFetch";
// import { Products } from "../../models/components-props";
// import { Divider } from "@nextui-org/react";
// import BuySection from "../../components/buy-section";
// import ProductPerformance from "../../components/product-performance";
// import Details from "../../components/details";
// import StockxVerified from "../../components/stockx-verified";
// // import ErrorPage from "../error-page";
// import { useRecoilState } from "recoil";
// import thankYouStateAtom from "../../states/thank-you-state";
// import axios from "axios";

// const ProductDetailsPage: React.FC = () => {
//   const [product, setProduct] = useState<Products>();
//   const [thankYouValue, setThankYou] =
//     useRecoilState<boolean>(thankYouStateAtom);
//   if (thankYouValue) {
//     setThankYou(false);
//   }
//   const { id } = useParams<{ id: string }>();

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const response = await axios.get<Products>(
//           `http://localhost:8080/api/products/${id}`
//         );

//         setProduct(response.data);
//         // console.log(response.data);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     };
//     fetchProduct();
//   }, [id]);
//   // const { data, loading, error } = useFetch("/data/products.json");

//   // const product: Products | undefined = data.find(
//   //   (obj) => obj.id === Number(id)
//   // );

//   return (
//     <main className="product-details">
//       {/* {loading && <p>Loading...</p>}
//       {error && <p>There was an error loading the product</p>}
//       {!loading && !error && !product && <ErrorPage />}
//       {!loading && !error && product && ( */}
//       <>
//         <div className="product-details__container">
//           <div className="product-details__buy-container">
//             <BuySection product={product} />
//           </div>
//           <div className="product-details__heading-container">
//             <h1
//               className="product-details__heading-title product-details__heading-title--semi-bold product-details__heading-title--1xl"
//               tabIndex={0}
//             >
//               {product?.name}
//             </h1>
//             <p className="product-details__heading-info" tabIndex={0}>
//               {product?.color}
//             </p>
//           </div>
//           <div className="product-details__image-container">
//             <img
//               className="product-details__image"
//               src={product?.images[0]}
//               alt={product?.name}
//               tabIndex={0}
//             />
//           </div>
//           <div className="product-details__performance-container">
//             <ProductPerformance product={product} />
//           </div>
//           <div className="product-details__verified-container">
//             <StockxVerified />
//           </div>
//         </div>
//         <Divider className="product-details__divider" />
//         <div className="product-details__details">
//           <Details product={product} />
//         </div>
//       </>
//       {/* )} */}
//     </main>
//   );
// };

// export default ProductDetailsPage;
