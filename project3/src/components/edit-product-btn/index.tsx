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
import { useRecoilState } from "recoil";
import thankYouStateAtom from "../../states/thank-you-state";
import tokenStateAtom from "../../states/token-state";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import editIcon from "../../assets/icons/editIcon.svg";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast, { Toaster } from "react-hot-toast";
import { useDropzone } from "react-dropzone";
import updateManageProductsStateAtom from "../../states/update-manage-products-state";
import { Products } from "../../models/components-props";

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

interface EditProductBtnProps {
  product: Products;
}

const EditProductBtn: React.FC<EditProductBtnProps> = ({ product }) => {
  const navigate = useNavigate();
  const [token, setToken] = useRecoilState(tokenStateAtom);
  const [thankYouValue, setThankYou] =
    useRecoilState<boolean>(thankYouStateAtom);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [files, setFiles] = useState<File[]>([]);
  const [sizes, setSizes] = useState<string[]>(product.sizes);
  const [images, setImages] = useState<string[]>(product.images);
  const [newSize, setNewSize] = useState<string>("");
  const [backendError, setBackendError] = useState("");
  const [updateProducts, setUpdateProducts] = useRecoilState(
    updateManageProductsStateAtom
  );

  console.log(product.sizes);

  const handleeditSize = () => {
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
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const onDrop = (acceptedFiles: File[]) => {
    setFiles([...files, ...acceptedFiles]);
    // setImages([...images, acceptedFiles.name]);
    const newFiles = acceptedFiles.filter(
      (file) => !images.includes(file.name)
    );
    const newImageNames = newFiles.map((file) => file.name);
    setImages([...images, ...newImageNames]);
  };

  const handleRemoveFile = (fileToRemove: File) => {
    setFiles(files.filter((file) => file !== fileToRemove));
    setImages(getFileNames(files));
  };

  const handleRemoveFileName = (imageToRemove: string) => {
    setImages(images.filter((image) => image !== imageToRemove));
    setFiles(files.filter((file) => file.name !== imageToRemove));
  };

  const handleRemoveSize = (sizeToRemove: string) => {
    setSizes(sizes.filter((size) => size !== sizeToRemove));
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      // const imageNames = getFileNames(files);

      if (images.length >= 1) {
        await axios.put<void>(
          `http://localhost:8080/api/product/${product.id}`,
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
            images: images,
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
        setUpdateProducts(!updateProducts);
        toast.success("Product updated!");
        setBackendError("");
      } else {
        setBackendError("Must have at least 1 image");
      }
    } catch (error: any) {
      setBackendError(error.response.data.description);
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

  const resetFormValues = () => {
    setValue("product.name", product.name);
    setValue("product.smallDescription", product.smallDescription);
    setValue("product.fullDescription", product.fullDescription);
    setValue("product.category", product.category);
    setValue("product.brand", product.brand);
    setValue("product.color", product.color);
    setValue("product.price", product.price.toString());
    setValue("product.retailPrice", product.retailPrice.toString());
    setValue("product.category", product.category);
    // setFiles([]);
    // setSizes([]);
  };

  return (
    <>
      <Button
        isIconOnly
        className="edit-product__btn"
        radius="full"
        onPress={onOpen}
      >
        <img src={editIcon} />
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior="inside"
        size="5xl"
        className="pb-8"
        placement="center"
        onClose={() => {
          resetFormValues();
        }}
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Edit Product
              </ModalHeader>
              <Divider />
              <form onSubmit={handleSubmit(onSubmit)}>
                <ModalBody className="max-h-[65vh] overflow-auto">
                  {backendError && (
                    <p className="text-[#bb2c2c]">{backendError}</p>
                  )}
                  <Input
                    {...register("product.name")}
                    type="text"
                    label="Name"
                    defaultValue={product.name}
                    // isRequired
                    placeholder="Enter the product's name"
                  />
                  {errors.product?.name && (
                    <div className="edit-product__form-error-msg--red">
                      {errors.product.name.message}
                    </div>
                  )}
                  <Input
                    {...register("product.smallDescription")}
                    type="text"
                    label="Small Description"
                    defaultValue={product.smallDescription}
                    // isRequired
                    placeholder="Enter small description"
                  />
                  {errors.product?.smallDescription && (
                    <div className="edit-product__form-error-msg--red">
                      {errors.product.smallDescription.message}
                    </div>
                  )}
                  <Textarea
                    {...register("product.fullDescription")}
                    label="Full Description"
                    placeholder="Enter full description"
                    defaultValue={product.fullDescription}
                    // isRequired
                  />
                  {errors.product?.fullDescription && (
                    <div className="edit-product__form-error-msg--red">
                      {errors.product.fullDescription.message}
                    </div>
                  )}
                  <Input
                    {...register("product.brand")}
                    type="text"
                    label="Brand"
                    defaultValue={product.brand}
                    // isRequired
                    placeholder="Enter the product's brand"
                  />
                  {errors.product?.brand && (
                    <div className="edit-product__form-error-msg--red">
                      {errors.product.brand.message}
                    </div>
                  )}
                  <Input
                    {...register("product.category")}
                    type="text"
                    label="Category"
                    defaultValue={product.category}
                    // isRequired
                    placeholder="Enter the product's category"
                  />
                  {errors.product?.category && (
                    <div className="edit-product__form-error-msg--red">
                      {errors.product.category.message}
                    </div>
                  )}
                  <Input
                    {...register("product.color")}
                    type="text"
                    label="Color"
                    defaultValue={product.color}
                    // isRequired
                    placeholder="Enter the product's color"
                  />
                  {errors.product?.category && (
                    <div className="edit-product__form-error-msg--red">
                      {errors.product.category.message}
                    </div>
                  )}
                  <Input
                    {...register("product.retailPrice")}
                    type="number"
                    label="Retail Price"
                    defaultValue={product.retailPrice.toString()}
                    // isRequired
                    placeholder="Enter the product's retail price"
                  />
                  {errors.product?.retailPrice && (
                    <div className="edit-product__form-error-msg--red">
                      {errors.product.retailPrice.message}
                    </div>
                  )}
                  <Input
                    {...register("product.price")}
                    type="number"
                    label="Price"
                    defaultValue={product.price.toString()}
                    // isRequired
                    placeholder="Enter the product's price"
                  />
                  {errors.product?.price && (
                    <div className="edit-product__form-error-msg--red">
                      {errors.product.price.message}
                    </div>
                  )}
                  <select
                    {...register("product.releaseYear")}
                    aria-label="select product's release year"
                    defaultValue={product.releaseYear}
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
                    <div className="edit-product__form-error-msg--red">
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
                      onClick={handleeditSize}
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
                  {images.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {images.map((image) => (
                        <Chip
                          key={image}
                          onClose={() => handleRemoveFileName(image)}
                          variant="flat"
                        >
                          {image}
                        </Chip>
                      ))}
                    </div>
                  )}
                </ModalBody>
                <ModalFooter>
                  <Button
                    disabled={isSubmitting}
                    type="submit"
                    className="edit-product__form-btn bg-[$stockx-color] text-[$white] w-[3rem]"
                  >
                    {isSubmitting ? "Loading..." : "Update"}
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

export default EditProductBtn;
