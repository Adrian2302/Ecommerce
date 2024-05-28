import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import HomePage from "./views/home-page";
import AllProductsPage from "./views/all-products-page";
import ProductDetailsPage from "./views/product-details-page";
import LoginPage from "./views/login-page";
import ShoppingCartPage from "./views/shopping-cart-page";
import CheckoutPage from "./views/checkout-page";
import Header from "./components/header";
import Footer from "./components/footer";
import "@fontsource-variable/raleway";
import PrivateRoutes from "./utils/protected-routes";
import ScrollToTop from "./components/scroll-to-top";
import ErrorPage from "./views/error-page";
import WishlistPage from "./views/wishlist-page";
import ProfilePage from "./views/profile-page";

function App() {
  return (
    <div>
      <Header />
      <ScrollToTop />
      <Routes>
        <Route path="/home" Component={HomePage} />
        <Route path="/all-products" Component={AllProductsPage} />
        <Route path="/details/:id" Component={ProductDetailsPage} />
        <Route path="/login" Component={LoginPage} />
        <Route element={<PrivateRoutes />}>
          <Route path="/wishlist" Component={WishlistPage} />
          <Route path="/shopping-cart" Component={ShoppingCartPage} />
          <Route path="/checkout" Component={CheckoutPage} />
          <Route path="/profile" Component={ProfilePage} />
        </Route>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="*" Component={ErrorPage} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
