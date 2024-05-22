import "./styles.scss";
import React, { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import tokenStateAtom from "../../states/token-state";
import axios, { AxiosResponse } from "axios";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import blackHeart from "../../assets/icons/blackHeart.svg";
import redHeart from "../../assets/icons/redHeart.svg";

interface AddToWishlistBtnProps {
  productId: number;
}

const AddToWishlistBtn: React.FC<AddToWishlistBtnProps> = ({ productId }) => {
  const [wished, setWished] = useState<AxiosResponse | boolean>();
  const [token, setToken] = useRecoilState(tokenStateAtom);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch unique brands and categories only once when component mounts
    const fetchWishlistItem = async () => {
      try {
        const getUser = await axios.get("http://localhost:8080/users/me", {
          headers: {
            Authorization: `Bearer ${token === undefined ? null : token}`,
          },
        });
        const user = getUser.data;

        const isProductWished = await axios.get<boolean>(
          `http://localhost:8080/api/wishlist/exist/${user.id}/${productId}`,
          {
            headers: {
              Authorization: `Bearer ${token === undefined ? null : token}`,
            },
          }
        );
        setWished(isProductWished.data);
      } catch (error: any) {
        console.log(`El error: ${error.response.data.description}`);
        if (error.response && error.response.status === 440) {
          setToken(null);
          navigate("/login");
        }
      }
    };

    fetchWishlistItem();
  }, [wished]);

  const setLiked = async () => {
    try {
      const getUser = await axios.get("http://localhost:8080/users/me", {
        headers: {
          Authorization: `Bearer ${token === undefined ? null : token}`,
        },
      });
      const user = getUser.data;
      if (wished === true) {
        // await axios.delete<void>(
        //   `http://localhost:8080/api/wishlist/remove/${user.id}/${productId}`,
        //   {
        //     headers: {
        //       Authorization: `Bearer ${token === undefined ? null : token}`,
        //     },
        //   }
        // );
        await axios.delete<void>(
          `http://localhost:8080/api/wishlist/remove/${productId}`,
          {
            headers: {
              Authorization: `Bearer ${token === undefined ? null : token}`,
            },
          }
        );
        setWished(false);
      } else {
        await axios.post<void>(
          `http://localhost:8080/api/wishlist/${user.id}`,
          {
            product: {
              id: productId,
            },
          },
          {
            headers: {
              Authorization: `Bearer ${token || ""}`,
            },
          }
        );
        setWished(true);
      }
    } catch (error: any) {
      console.log(`El error: ${error.response.data.description}`);
      if (
        (error.response && error.response.status === 440) ||
        // error.response.status === 403 ||
        error.response.status === 500
      ) {
        setToken(null);
        navigate("/login");
      }
    }
  };

  return (
    <Button
      isIconOnly
      className="" //z-10 absolute right-5 top-5;
      radius="full"
      variant="light"
      onPress={() => setLiked()}
    >
      <img
        src={wished === true ? redHeart : blackHeart}
        // src={blackHeart}
        // style={{
        //   filter:
        //     "invert(24%) sepia(18%) saturate(7080%) hue-rotate(338deg) brightness(97%) contrast(97%)",
        // }}
        alt="Wishlist button"
      ></img>
    </Button>
  );
};

export default AddToWishlistBtn;
