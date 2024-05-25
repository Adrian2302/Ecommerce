import "./styles.scss";
import React, { useEffect, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Badge,
  Button,
} from "@nextui-org/react";
import { useLocation, Link } from "react-router-dom";
import logo from "../../assets/icons/stockx-logo.png";
import shoppingBag from "../../assets/icons/shopping-bag.svg";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
// import cartItemStateAtom from "../../states/cart-item-state";
import { calculateQuantity } from "../../utils/functions";
import tokenStateAtom from "../../states/token-state";
import shoppingCartStateAtom from "../../states/shoppingcart-state";
import updateCartStateAtom from "../../states/update-cart-state";
import axios from "axios";
import { ShoppingCartListApiResponse } from "../../models/components-props";

const Header = () => {
  const updateCart = useRecoilValue(updateCartStateAtom);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { pathname } = useLocation();
  const [token, setToken] = useRecoilState(tokenStateAtom);
  const [totalQuantity, setQuantity] = useState<number>();
  const setShoppingCartList = useSetRecoilState(shoppingCartStateAtom);

  // const cartItem = useRecoilValue(cartItemStateAtom);

  function ClickHandlerFalse() {
    setToken(null);
  }

  const fetchShoppingCartItems = async () => {
    try {
      const fetchedShoppingCartList =
        await axios.get<ShoppingCartListApiResponse>(
          `http://localhost:8080/api/cart`,
          {
            headers: {
              Authorization: `Bearer ${token === undefined ? null : token}`,
            },
          }
        );
      setShoppingCartList(fetchedShoppingCartList.data.items);
      setQuantity(calculateQuantity(fetchedShoppingCartList.data.items));
    } catch (error: any) {
      console.log(`El error: ${error.response.data.description}`);
    }
  };

  useEffect(() => {
    fetchShoppingCartItems();
  }, [updateCart, token]);

  // function ClickHandlerTrue() {
  //   // localStorage.setItem("isLoggedIn", "true");
  //   setToken("true");
  // }

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      className="header"
      shouldHideOnScroll
    >
      <NavbarContent>
        <NavbarMenuToggle
          tabIndex={0}
          as={"li"}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand as={"li"}>
          <Link to="/home">
            <img className="header__logo" src={logo} alt="StockX Logo" />
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive={pathname === "/home" ? true : false}>
          <Link to="/home">Home</Link>
        </NavbarItem>
        <NavbarItem isActive={pathname === "/all-products" ? true : false}>
          <Link to="/all-products">All products</Link>
        </NavbarItem>
        {token !== null ? (
          <NavbarItem isActive={pathname === "/wishlist" ? true : false}>
            <Link to="/wishlist">Wishlist</Link>
          </NavbarItem>
        ) : null}
        {token !== null && totalQuantity! > 0 ? (
          <NavbarItem isActive={pathname === "/checkout" ? true : false}>
            <Link to="/checkout">Checkout</Link>
          </NavbarItem>
        ) : null}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem
          className="lg:flex"
          isActive={pathname === "/login" ? true : false}
        >
          {token === null ? (
            <Link to="/login">Login</Link>
          ) : (
            <Badge
              content={totalQuantity}
              className="bg-[#cf1010] text-[white]"
            >
              <Link to="/shopping-cart">
                <img
                  className="header__shopping-bag"
                  src={shoppingBag}
                  alt="StockX Logo"
                />
              </Link>
            </Badge>
          )}
        </NavbarItem>
        {token !== null ? (
          <NavbarItem className="lg:flex">
            <Link to="/login">
              <Button onClick={ClickHandlerFalse}>Log out</Button>
            </Link>
          </NavbarItem>
        ) : null}
      </NavbarContent>
      <NavbarMenu>
        <NavbarMenuItem>
          <Link to={"/home"}>Home</Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link to={"/all-products"}>All Products</Link>
        </NavbarMenuItem>
        {token !== null ? (
          <NavbarMenuItem>
            <Link to={"/wishlist"}>Wishlist</Link>
          </NavbarMenuItem>
        ) : null}
        {token !== null && totalQuantity! > 0 ? (
          <NavbarMenuItem>
            <Link to={"/checkout"}>Checkout</Link>
          </NavbarMenuItem>
        ) : null}
        {token !== null ? (
          <NavbarMenuItem>
            <Link to={"/login"}>
              <Button type="button" onClick={ClickHandlerFalse}>
                Log out
              </Button>
            </Link>
          </NavbarMenuItem>
        ) : null}
      </NavbarMenu>
    </Navbar>
  );
};

export default Header;
