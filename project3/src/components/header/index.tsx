import "./styles.scss";
import React from "react";
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
import { useRecoilState, useRecoilValue } from "recoil";
import cartItemStateAtom from "../../states/cart-item-state";
import { calculateQuantity } from "../../utils/functions";
import tokenStateAtom from "../../states/token-state";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { pathname } = useLocation();
  const [token, setToken] = useRecoilState(tokenStateAtom);

  const cartItem = useRecoilValue(cartItemStateAtom);

  const totalQuantity = calculateQuantity(cartItem);

  function ClickHandlerFalse() {
    setToken(null);
  }

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
        {token !== null && totalQuantity > 0 ? (
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
            <Link to="/home">
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
        {token !== null && totalQuantity > 0 ? (
          <NavbarMenuItem>
            <Link to={"/checkout"}>Checkout</Link>
          </NavbarMenuItem>
        ) : null}
        {token !== null ? (
          <NavbarMenuItem>
            <Link to={"/home"}>
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
