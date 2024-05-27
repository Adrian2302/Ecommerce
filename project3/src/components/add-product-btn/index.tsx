import "./styles.scss";
import React, { useState } from "react";
import {
  Button,
  Divider,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
  useDisclosure,
  Chip,
} from "@nextui-org/react";
import { useRecoilValue, useRecoilState } from "recoil";
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
import { useDropzone } from "react-dropzone";

const schema = z.object({
  product: z.object({
    name: z.string().min(1),
    smallDescription: z.string().min(1).max(26),
    fullDescription: z.string().min(1).max(500),
    category: z.string().min(1),
    brand: z.string().min(1),
    color: z.string().min(1),
    price: z.string().min(1),
    retailPrice: z.string().min(1),
    releaseYear: z.enum(["2020", "2021", "2022", "2023", "2024"], {
      message: "Select a year",
    }),
    sizes: z.array(z.string()),
  }),
});

const releseYears = [
  "Select the product's release year",
  "2020",
  "2021",
  "2022",
  "2023",
  "2024",
];

type FormFields = z.infer<typeof schema>;

const AddProductBtn: React.FC = () => {
  const navigate = useNavigate();
  const [token, setToken] = useRecoilState(tokenStateAtom);
  const [thankYouValue, setThankYou] =
    useRecoilState<boolean>(thankYouStateAtom);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [files, setFiles] = useState<File[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);
  const [newSize, setNewSize] = useState<string>("");

  const handleAddSize = () => {
    if (newSize.trim() !== "") {
      setSizes([...sizes, newSize]);
      setNewSize("");
    }
  };

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

  const onDrop = (acceptedFiles: File[]) => {
    setFiles([...files, ...acceptedFiles]);
  };

  const handleRemoveFile = (fileToRemove: File) => {
    setFiles(files.filter((file) => file !== fileToRemove));
  };

  const handleRemoveSize = (sizeToRemove: string) => {
    setSizes(sizes.filter((size) => size !== sizeToRemove));
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      const imageNames = getFileNames(files);

      await axios.post<void>(
        `http://localhost:8080/api/product`,
        {
          name: data.product.name,
          smallDescription: data.product.smallDescription,
          fullDescription: data.product.fullDescription,
          category: data.product.category,
          brand: data.product.brand,
          color: data.product.color,
          retailPrice: data.product.retailPrice,
          price: data.product.price,
          recentlySold: 0,
          releaseYear: data.product.releaseYear,
          sizes: sizes,
          images: imageNames,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      for (const file of files) {
        const formData = new FormData();
        formData.append("file", file);

        await axios.post<string>(
          `http://localhost:8080/api/upload/image`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }
      onOpen;
      toast.success("Product added!");
    } catch (error: any) {
      console.log(error);
      if (error.response && error.response.status === 440) {
        setToken(null);
        navigate("/login");
      }
    }
  };

  function getFileNames(files: File[]) {
    return files.map((file) => file.name);
  }

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
                <ModalBody className="max-h-[70vh] overflow-auto">
                  <Input
                    {...register("product.name")}
                    type="text"
                    label="Name"
                    // isRequired
                    placeholder="Enter the product's name"
                  />
                  {errors.product?.name && (
                    <div className="checkout-form__error-msg--red">
                      {errors.product.name.message}
                    </div>
                  )}
                  <Input
                    {...register("product.smallDescription")}
                    type="text"
                    label="Small Description"
                    // isRequired
                    placeholder="Enter small description"
                  />
                  {errors.product?.smallDescription && (
                    <div className="checkout-form__error-msg--red">
                      {errors.product.smallDescription.message}
                    </div>
                  )}
                  <Textarea
                    {...register("product.fullDescription")}
                    label="Full Description"
                    placeholder="Enter full description"
                    // isRequired
                  />
                  {errors.product?.fullDescription && (
                    <div className="checkout-form__error-msg--red">
                      {errors.product.fullDescription.message}
                    </div>
                  )}
                  <Input
                    {...register("product.brand")}
                    type="text"
                    label="Brand"
                    // isRequired
                    placeholder="Enter the product's brand"
                  />
                  {errors.product?.brand && (
                    <div className="checkout-form__error-msg--red">
                      {errors.product.brand.message}
                    </div>
                  )}
                  <Input
                    {...register("product.category")}
                    type="text"
                    label="Category"
                    // isRequired
                    placeholder="Enter the product's category"
                  />
                  {errors.product?.category && (
                    <div className="checkout-form__error-msg--red">
                      {errors.product.category.message}
                    </div>
                  )}
                  <Input
                    {...register("product.color")}
                    type="text"
                    label="Color"
                    // isRequired
                    placeholder="Enter the product's color"
                  />
                  {errors.product?.category && (
                    <div className="checkout-form__error-msg--red">
                      {errors.product.category.message}
                    </div>
                  )}
                  <Input
                    {...register("product.retailPrice")}
                    type="number"
                    label="Retail Price"
                    // isRequired
                    placeholder="Enter the product's retail price"
                  />
                  {errors.product?.retailPrice && (
                    <div className="checkout-form__error-msg--red">
                      {errors.product.retailPrice.message}
                    </div>
                  )}
                  <Input
                    {...register("product.price")}
                    type="number"
                    label="Price"
                    // isRequired
                    placeholder="Enter the product's price"
                  />
                  {errors.product?.price && (
                    <div className="checkout-form__error-msg--red">
                      {errors.product.price.message}
                    </div>
                  )}
                  <select
                    {...register("product.releaseYear")}
                    aria-label="select product's release year"
                    defaultValue="Select the product's release year"
                    name="product.releaseYear"
                    id="product.releaseYear"
                    className="bg-[#f4f4f5] px-3 py-3.5 rounded-lg hover:bg-[#e5e7eb]"
                  >
                    <option value="" disabled></option>
                    {releseYears.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                  {errors.product?.releaseYear && (
                    <div className="checkout-form__error-msg--red">
                      {errors.product.releaseYear.message}
                    </div>
                  )}
                  <div className="flex items-center">
                    <Input
                      type="text"
                      placeholder="Enter size"
                      value={newSize}
                      onChange={(e) => setNewSize(e.target.value)}
                    />
                    <Button
                      type="button"
                      onClick={handleAddSize}
                      className="ml-4"
                    >
                      Add Size
                    </Button>
                  </div>
                  {sizes.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {sizes.map((size) => (
                        <Chip
                          key={size}
                          onClose={() => handleRemoveSize(size)}
                          variant="flat"
                          aria-label={size}
                        >
                          {size}
                        </Chip>
                      ))}
                    </div>
                  )}
                  {/* Dropzone para subir imágenes */}
                  <div
                    {...getRootProps({ className: "dropzone" })}
                    className="bg-[#f4f4f5] px-3 py-6 rounded-lg hover:bg-[#e5e7eb] flex justify-center items-center"
                  >
                    <input {...getInputProps()} />
                    <p>
                      Drag 'n' drop some files here or click to select files
                      (The order is important)
                    </p>
                  </div>
                  {files.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {files.map((file) => (
                        <Chip
                          key={file.name}
                          onClose={() => handleRemoveFile(file)}
                          variant="flat"
                        >
                          {file.name}
                        </Chip>
                      ))}
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
