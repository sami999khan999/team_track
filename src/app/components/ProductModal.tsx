import { ProductType } from "@/types";
import {
  createProduct,
  deleteProduct,
  updateProduct,
} from "@/utils/productApiRequests";
import React, { SetStateAction, useEffect, useState } from "react";
import CategoryDropdown from "./CategoryDropdown";

const ProductModal = ({
  modalAction,
  activeProduct,
  setIsModalOpen,
  setReload,
  reload,
}: {
  modalAction: "create" | "update" | "delete" | undefined;
  activeProduct: ProductType | undefined;
  setIsModalOpen: React.Dispatch<SetStateAction<boolean>>;
  setReload: React.Dispatch<SetStateAction<boolean>>;
  reload: boolean;
}) => {
  const [productName, setProductName] = useState<string>("");
  const [productRate, setProductRate] = useState<string | number>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [categoryId, setCategoryId] = useState<number | undefined>();
  const [inputError, setInputError] = useState({
    name: "",
    rate: "",
  });

  const handleCreate = async () => {
    const newError = {
      name: !productName ? "Product name is required" : "",
      rate: !productRate ? "Product rate is required" : "",
    };

    if (!selectedCategory) {
      setSelectedCategory("Inter a category!");
    }

    setInputError(newError);

    const hasError = Object.values(newError).some((error) => error);

    if (!hasError) {
      const data = {
        name: productName,
        rate: Number(productRate),
        catagory_id: categoryId,
      };
      console.log(data);

      const response = await createProduct(data);

      if (response.success) {
        setIsModalOpen((prv) => !prv);
        setReload((prv) => !prv);
      }
    }
  };

  const deleteHandler = async () => {
    if (activeProduct) {
      const response = await deleteProduct(activeProduct?.id);

      if (response.success) {
        setIsModalOpen((prv) => !prv);
        setReload((prv) => !prv);
      } else {
        console.log(response.message);
      }
    }
  };

  const handleUpdate = async () => {
    const newError = {
      name: !productName ? "Product name is required" : "",
      rate: !productRate ? "Product rate is required" : "",
    };

    if (!selectedCategory) {
      setSelectedCategory("Inter a category!");
    }

    setInputError(newError);

    const hasError = Object.values(newError).some((error) => error);

    if (!hasError) {
      const data = {
        name: productName,
        rate: Number(productRate),
        catagory_id: categoryId,
      };
      console.log(data, activeProduct?.id);

      const response = await updateProduct(activeProduct?.id, data);

      if (response.success) {
        setIsModalOpen((prv) => !prv);
        setReload((prv) => !prv);
      } else {
        console.log(response.message);
      }
    }
  };

  useEffect(() => {
    if (modalAction === "update" && activeProduct) {
      setProductName(activeProduct.name || "");
      setProductRate(activeProduct.rate || "");
    }
  }, [modalAction, activeProduct]);

  return (
    <div
      className="flex items-center justify-center absolute top-0 left-0  z-50 w-full h-full backdrop-blur-md"
      onClick={() => {
        setIsModalOpen((prv) => !prv);
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[95%] xl:w-[50%] rounded"
      >
        {modalAction === "create" && (
          <div className="bg-secondary border border-border_color rounded-xl h-full w-full px-4 py-8">
            <div className="border-b border-border_color">
              <h2 className="text-2xl xl:text-3xl font-semibold text-primary-foreground text-center mb-6">
                Create Product
              </h2>
            </div>
            <div className="flex flex-col xl:flex-row mt-6 gap-8">
              <div className="flex flex-col gap-2 xl:gap-4 xl:w-[50%] ">
                <div>
                  <input
                    type="text"
                    name="name"
                    value={productName}
                    placeholder="Product Name"
                    className="border border-border_color text-primary-foreground text-base xl:text-lg bg-secondary-foreground rounded-full py-2 px-6"
                    onChange={(e) => {
                      setProductName(e.target.value);
                      setInputError({ ...inputError, name: "" });
                    }}
                  />
                  <p className="error_message">{inputError.name}</p>
                </div>
                <div>
                  <input
                    type="number"
                    name="rate"
                    value={productRate}
                    placeholder="Product Rate"
                    className="border border-border_color text-primary-foreground text-base xl:text-lg  bg-secondary-foreground rounded-full py-2 px-6"
                    onChange={(e) => {
                      setProductRate(e.target.value);
                      setInputError({ ...inputError, rate: "" });
                    }}
                  />
                  <p className="error_message">{inputError.rate}</p>
                </div>
              </div>
              <div className="xl:w-[50%]">
                <CategoryDropdown
                  setReload={setReload}
                  reload={reload}
                  setSelectedCategory={setSelectedCategory}
                  selectedCategory={selectedCategory}
                  setCategoryId={setCategoryId}
                />
              </div>
            </div>
            <button
              className="bg-primary mt-4 py-2 px-4 w-full rounded-full text-lg font-semibold xl:text-xl text-background tracking-wider hover:bg-primary/90 cursor-pointer duration-200"
              onClick={handleCreate}
            >
              Create Product
            </button>
          </div>
        )}
        {modalAction === "update" && (
          <div className="bg-secondary border border-border_color rounded-xl h-full w-full px-4 py-8">
            <div className="border-b border-border_color">
              <h2 className="text-2xl xl:text-3xl font-semibold text-primary-foreground text-center mb-6">
                Update Product
              </h2>
            </div>
            <div className="flex flex-col xl:flex-row mt-6 gap-8">
              <div className="flex flex-col gap-2 xl:gap-4 xl:w-[50%] ">
                <div>
                  <input
                    type="text"
                    name="name"
                    value={productName}
                    placeholder="Product Name"
                    className="border border-border_color text-base xl:text-lg bg-secondary-foreground text-primary-foreground rounded-full py-2 px-6"
                    onChange={(e) => {
                      setProductName(e.target.value);
                      setInputError({ ...inputError, name: "" });
                    }}
                  />
                  <p className="error_message">{inputError.name}</p>
                </div>
                <div>
                  <input
                    type="number"
                    name="rate"
                    value={productRate}
                    placeholder="Product Rate"
                    className="border border-border_color text-primary-foreground text-base xl:text-lg  bg-secondary-foreground rounded-full py-2 px-6"
                    onChange={(e) => {
                      setProductRate(e.target.value);
                      setInputError({ ...inputError, rate: "" });
                    }}
                  />
                  <p className="error_message">{inputError.rate}</p>
                </div>
              </div>
              <div className="xl:w-[50%]">
                <CategoryDropdown
                  setReload={setReload}
                  reload={reload}
                  setSelectedCategory={setSelectedCategory}
                  selectedCategory={selectedCategory}
                  setCategoryId={setCategoryId}
                />
              </div>
            </div>
            <button
              className="bg-primary mt-4 py-2 px-4 w-full rounded-full text-lg font-semibold xl:text-xl text-background tracking-wider hover:bg-primary/90 cursor-pointer duration-200"
              onClick={handleUpdate}
            >
              Update Product
            </button>
          </div>
        )}
        {modalAction === "delete" && (
          <div
            className="flex items-center justify-center absolute  top-0 left-0  z-50 w-full h-full backdrop-blur-md"
            onClick={() => setIsModalOpen((prv) => !prv)}
          >
            <div
              className="bg-secondary border border-border_color rounded-xl py-5 px-3 xl:px-5 w-[90%] xl:w-[35%]"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-center font-semibold xl:text-2xl text-primary-foreground mb-3">
                Delete Product
              </h2>

              <p className="text-xs xl:text-xl text-primary-foreground  ">
                Would you like to delete
                <span className="text-primary font-semibold ">
                  {`{ id: ${activeProduct?.id} | Product: ${activeProduct?.name} } `}
                </span>
                this Product?
              </p>
              <div className="flex justify-end gap-2 xl:gap-3 mt-2 xl:mt-4">
                <button
                  className="bg-primary-foreground hover:bg-gray-300 duration-200 font-semibold tracking-wide xl:text-lg text-background text-sm px-4 xl:px-6 xl:py-1 py-1 rounded-md"
                  onClick={() => setIsModalOpen((prv) => !prv)}
                >
                  Cancle
                </button>
                <button
                  className="bg-primary text-background font-semibold tracking-wide hover:bg-[#0ea30e] duration-200 rounded-md xl:text-lg text-sm px-4 xl:px-6 xl:py-1 py-1"
                  onClick={deleteHandler}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductModal;
