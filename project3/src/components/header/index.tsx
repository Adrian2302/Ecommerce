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
  Dropdown,
  DropdownTrigger,
  Avatar,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import logo from "../../assets/icons/stockx-logo.png";
import profileIcon from "../../assets/icons/profile-icon.svg";
import shoppingBag from "../../assets/icons/shopping-bag.svg";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
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
  const navigate = useNavigate();

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
      if (error.response && error.response.status === 440) {
        setToken(null);
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    fetchShoppingCartItems();
  }, [updateCart, token]);

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      className="header"
      shouldHideOnScroll
    >
      <NavbarContent>
        <NavbarMenuToggle
          tabIndex={isMenuOpen ? 0 : -1} // Ajusta el tabIndex dependiendo del estado del menú
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
        <NavbarItem isActive={pathname === "/home"}>
          <Link to="/home">Home</Link>
        </NavbarItem>
        <NavbarItem isActive={pathname === "/all-products"}>
          <Link to="/all-products">All products</Link>
        </NavbarItem>
        {token !== null && (
          <NavbarItem isActive={pathname === "/wishlist"}>
            <Link to="/wishlist">Wishlist</Link>
          </NavbarItem>
        )}
        {token !== null && totalQuantity! > 0 && (
          <NavbarItem isActive={pathname === "/checkout"}>
            <Link to="/checkout">Checkout</Link>
          </NavbarItem>
        )}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="lg:flex" isActive={pathname === "/login"}>
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
                  alt="Shopping Bag"
                />
              </Link>
            </Badge>
          )}
        </NavbarItem>
        {token !== null && (
          <NavbarItem className="lg:flex">
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  as="button"
                  className="transition-transform bg-[none]"
                  src={profileIcon}
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile">
                  <Link to="/profile">
                    <button className="w-full text-left">Dashboard</button>
                  </Link>
                </DropdownItem>
                <DropdownItem key="logout" color="danger">
                  <Link to="/login">
                    <button
                      onClick={ClickHandlerFalse}
                      className="header__logout-btn w-full text-left"
                    >
                      <p className="header__logout-btn--red">Log out</p>
                    </button>
                  </Link>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        )}
      </NavbarContent>
      <NavbarMenu>
        <NavbarMenuItem>
          <Link to={"/home"}>Home</Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link to={"/all-products"}>All Products</Link>
        </NavbarMenuItem>
        {token !== null && (
          <NavbarMenuItem>
            <Link to={"/wishlist"}>Wishlist</Link>
          </NavbarMenuItem>
        )}
        {token !== null && totalQuantity! > 0 && (
          <NavbarMenuItem>
            <Link to={"/checkout"}>Checkout</Link>
          </NavbarMenuItem>
        )}
        {token !== null && (
          <NavbarMenuItem>
            <Link to={"/login"}>
              <Button type="button" onClick={ClickHandlerFalse}>
                Log out
              </Button>
            </Link>
          </NavbarMenuItem>
        )}
      </NavbarMenu>
    </Navbar>
  );
};

export default Header;
