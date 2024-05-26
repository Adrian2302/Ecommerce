import "./styles.scss";
import React, { useEffect, useState } from "react";
import {
  Button,
  Divider,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
// import cartItemStateAtom from "../../states/cart-item-state";
import { useRecoilValue, useRecoilState } from "recoil";
// import { CartProduct } from "../../models/components-props";
import thankYouStateAtom from "../../states/thank-you-state";
import tokenStateAtom from "../../states/token-state";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import updateCartStateAtom from "../../states/update-cart-state";
import plusIcon from "../../assets/icons/plusIcon.svg";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast, { Toaster } from "react-hot-toast";

const schema = z.object({
  product: z.object({
    name: z.string().min(1),
    smallDescription: z.string().min(1).max(26),
    category: z.string().min(1),
    brand: z.string().min(1),
    price: z.string().min(1),
    retailPrice: z.string().min(1),
    color: z.string().min(1),
    releaseYear: z.enum(["2020", "2021", "2022", "2023", "2024"]),
    fullDescription: z.string().min(1).max(200),
    images: z.array(z.string()).min(1),
    sizes: z.array(z.string()).optional(),
  }),
});

type FormFields = z.infer<typeof schema>;

const AddProductBtn: React.FC = () => {
  const updateCart = useRecoilValue(updateCartStateAtom);
  const navigate = useNavigate();
  const [token, setToken] = useRecoilState(tokenStateAtom);
  const [thankYouValue, setThankYou] =
    useRecoilState<boolean>(thankYouStateAtom);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  if (thankYouValue) {
    setThankYou(false);
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      console.log(data);

      await axios.post<void>(
        `http://localhost:8080/api/product`,
        {
          name: data.product.name,
          smallDescription: data.product.smallDescription,
          category: data.product.category,
          brand: data.product.brand,
          retailPrice: data.product.retailPrice,
          price: data.product.price,
          recentlySold: 0,
          color: data.product.color,
          releaseYear: data.product.releaseYear,
          fullDescription: data.product.fullDescription,
          images: data.product.images,
          sizes: data.product.sizes,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Product added!");
    } catch (error: any) {
      console.log(error);
      if (error.response && error.response.status === 440) {
        setToken(null);
        navigate("/login");
      }
    }
  };

  return (
    <>
      <Button
        isIconOnly
        className="add-product-btn add-product-btn--bold bg-[$stockx-color] text-[$white] absolute top-[15px] right-[15px]"
        radius="full"
        onPress={onOpen}
      >
        <img src={plusIcon} />
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior="inside"
        size="5xl"
        className="pb-4"
        placement="center"
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Create Product
              </ModalHeader>
              <Divider />
              <form onSubmit={handleSubmit(onSubmit)}>
                <ModalBody>
                  <Input
                    {...register("product.name")}
                    type="text"
                    label="Name"
                    isRequired
                    placeholder="Product Name"
                  />
                  {errors.product?.name && (
                    <div className="checkout-form__error-msg--red">
                      {errors.product.name.message}
                    </div>
                  )}
                </ModalBody>
                <ModalFooter>
                  <Button
                    disabled={isSubmitting}
                    type="submit"
                    className="checkout-form__buy-btn bg-[$stockx-color] text-[$white] w-[3rem]"
                  >
                    {isSubmitting ? "Loading..." : "Create"}
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
      <Toaster />
    </>
  );
};

export default AddProductBtn;
