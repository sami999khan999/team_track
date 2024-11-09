import { ProductType } from "@/types";
import React, { SetStateAction, useEffect, useState } from "react";
import Dropdown from "./Dropdown";
import { DiVim } from "react-icons/di";
import {
  createProduct,
  deleteProduct,
  updateProduct,
} from "@/utils/productApiRequests";

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
      className="flex items-center justify-center absolute bg-gray-400/30 top-0 left-0  z-50 w-full h-full backdrop-blur-md"
      onClick={() => {
        setIsModalOpen((prv) => !prv);
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[95%] xl:h-[60%] xl:w-[30%] rounded"
      >
        {modalAction === "create" && (
          <div className="bg-secondary h-full w-full px-4 py-8">
            <div className="border-b ">
              <h2 className="text-2xl font-semibold text-gray-700 text-center mb-6">
                Create Product
              </h2>
            </div>
            <div className="flex flex-col mt-6 gap-8">
              <div className="flex flex-col xl:gap-4 ">
                <div>
                  <input
                    type="text"
                    name="name"
                    value={productName}
                    placeholder="Product Name"
                    className="border border-gray-300 text-base bg-white rounded py-2 px-6"
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
                    className="border border-gray-300 text-base bg-white rounded py-2 px-6"
                    onChange={(e) => {
                      setProductRate(e.target.value);
                      setInputError({ ...inputError, rate: "" });
                    }}
                  />
                  <p className="error_message">{inputError.rate}</p>
                </div>

                <button
                  className="bg-primary py-1 px-4 w-full rounded text-gray-200 font-medium tracking-wider hover:bg-primary/90 cursor-pointer duration-200"
                  onClick={handleCreate}
                >
                  Create Product
                </button>
              </div>
              <div className="">
                <Dropdown
                  setReload={setReload}
                  reload={reload}
                  setSelectedCategory={setSelectedCategory}
                  selectedCategory={selectedCategory}
                  setCategoryId={setCategoryId}
                />
              </div>
            </div>
          </div>
        )}
        {modalAction === "update" && (
          <div className="bg-secondary h-full w-full px-4 py-8">
            <div className="border-b ">
              <h2 className="text-2xl font-semibold text-gray-700 text-center mb-6">
                Create Product
              </h2>
            </div>
            <div className="flex flex-col mt-6 gap-8">
              <div className="flex flex-col xl:gap-4 ">
                <div>
                  <input
                    type="text"
                    name="name"
                    value={productName}
                    placeholder="Product Name"
                    className="border border-gray-300 text-base bg-white rounded py-2 px-6"
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
                    className="border border-gray-300 text-base bg-white rounded py-2 px-6"
                    onChange={(e) => {
                      setProductRate(e.target.value);
                      setInputError({ ...inputError, rate: "" });
                    }}
                  />
                  <p className="error_message">{inputError.rate}</p>
                </div>

                <button
                  className="bg-primary py-1 px-4 w-full rounded text-gray-200 font-medium tracking-wider hover:bg-primary/90 cursor-pointer duration-200"
                  onClick={handleUpdate}
                >
                  Create Product
                </button>
              </div>
              <div className="">
                <Dropdown
                  setReload={setReload}
                  reload={reload}
                  setSelectedCategory={setSelectedCategory}
                  selectedCategory={selectedCategory}
                  setCategoryId={setCategoryId}
                />
              </div>
            </div>
          </div>
        )}
        {modalAction === "delete" && (
          <div
            className="flex items-center justify-center absolute bg-gray-400/30 top-0 left-0  z-50 w-full h-full backdrop-blur-md"
            onClick={() => setIsModalOpen((prv) => !prv)}
          >
            <div
              className="bg-gray-100 rounded py-5 px-3 xl:px-5 w-[90%] xl:w-[30%]"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-center font-semibold xl:text-2xl text-gray-800 mb-3">
                Delete Product
              </h2>

              <p className="text-xs xl:text-lg">
                Would you like to delete
                <span className="text-primary font-semibold ">
                  {`{ id: ${activeProduct?.id} | Product: ${activeProduct?.name} }`}
                </span>
                this Product?
              </p>
              <div className="flex justify-end gap-2 xl:gap-3 mt-2 xl:mt-4">
                <button
                  className="bg-slate-200 xl:text-lg text-sm px-4 xl:px-6 xl:py-1 py-1 rounded-sm"
                  onClick={() => setIsModalOpen((prv) => !prv)}
                >
                  Cancle
                </button>
                <button
                  className="bg-primary text-gray-100 xl:text-lg text-sm px-4 xl:px-6 xl:py-1 py-1 rounded-sm"
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
