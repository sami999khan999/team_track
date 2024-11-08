import { ProductType } from "@/types";
import React, { SetStateAction } from "react";
import Dropdown from "./Dropdown";
import { DiVim } from "react-icons/di";

const ProductModal = ({
  modalAction,
  activeProduct,
  setIsModalOpen,
}: {
  modalAction: "create" | "update" | "delete" | undefined;
  activeProduct: ProductType | undefined;
  setIsModalOpen: React.Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div
      className="flex items-center justify-center absolute bg-gray-400/30 top-0 left-0  z-50 w-full h-full backdrop-blur-md"
      onClick={() => setIsModalOpen((prv) => !prv)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[95%] h-[80%] xl:w-[40%] rounded"
      >
        {modalAction === "create" && (
          <div className="inset-0 -z-10 bg-secondary bg-[radial-gradient(#80be70_1px,transparent_1px)] [background-size:16px_16px] h-full w-full px-4 py-8">
            <div className="border-b ">
              <h2 className="text-2xl font-semibold text-gray-700 text-center mb-6">
                Create Product
              </h2>
            </div>
            <div className="flex flex-col mt-6 gap-4">
              <div className="flex flex-col gap-2 ">
                <input
                  type="text"
                  name="name"
                  placeholder="Product Name"
                  className="border border-gray-300 text-base bg-white rounded-full py-2 px-6"
                />
                <input
                  type="number
                "
                  name="rate"
                  placeholder="Product Rate"
                  className="border border-gray-300 text-base bg-white rounded-full py-2 px-6"
                />
              </div>
              <div className="">
                <Dropdown />
              </div>
            </div>
          </div>
        )}
        {modalAction === "update" && (
          <div>
            <Dropdown activeProduct={activeProduct} />
          </div>
        )}
        {modalAction === "delete" ? <p>{modalAction}</p> : ""}
      </div>
    </div>
  );
};

export default ProductModal;

// <div class="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
