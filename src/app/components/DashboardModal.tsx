"use client";

import React, { SetStateAction, useState } from "react";
import { IoMdClose } from "react-icons/io";
import AddFormModal from "./AddFormModal";
import ProductionModal from "./ProductionModal";
import ProductModal from "./ProductModal";

const DashboardModal = ({
  setIsOpen,
  setReload,
  reload,
}: {
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
  setReload: React.Dispatch<SetStateAction<boolean>>;
  reload: boolean;
}) => {
  const [createAction, setCreateAction] = useState<
    "employee" | "customer" | "product" | "production"
  >();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      {createAction === "employee" && isModalOpen && (
        <AddFormModal
          title="Create Employee"
          setIsFormOpen={setIsModalOpen}
          action="addEmployee"
          closeModal={() => {}}
          setReload={setReload}
        />
      )}

      {createAction === "customer" && isModalOpen && (
        <AddFormModal
          title="Create Customer"
          setIsFormOpen={setIsModalOpen}
          action="addCustomer"
          closeModal={() => {}}
          setReload={setReload}
        />
      )}

      {createAction === "production" && isModalOpen && (
        <ProductionModal
          setIsOpen={setIsModalOpen}
          action="create"
          setReload={setReload}
        />
      )}

      {createAction === "product" && isModalOpen && (
        <ProductModal
          modalAction="create"
          setIsModalOpen={setIsModalOpen}
          setReload={setReload}
          reload={reload}
        />
      )}

      <div className="absolute top-0 left-0 w-full h-full backdrop-blur-md flex items-center justify-center z-10">
        <div className="overflow-y-auto xl:w-[80%] w-[95%] h-[80%] relative  bg-secondary rounded-xl border border-border_color px-8 py-5">
          <div
            className="absolute xl:top-6 top-4 xl:right-6 right-4 text-2xl xl:text-3xl text-primary-foreground hover:bg-secondary-foreground p-1 w-fit rounded-md"
            onClick={() => {
              setIsOpen((prv) => !prv);
            }}
          >
            <IoMdClose className="transition-transform hover:rotate-90 origin-center" />
          </div>

          <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 mt-14 text-xl text-primary-foreground font-semibold">
            <button
              className="border border-border_color hover:bg-primary hover:text-background px-6 py-2 rounded-lg duration-200"
              onClick={() => {
                setCreateAction("customer");
                setIsModalOpen((prv) => !prv);
              }}
            >
              Create Customer
            </button>
            <button
              className="border border-border_color hover:bg-primary hover:text-background px-6 py-2 rounded-lg duration-200"
              onClick={() => {
                setCreateAction("employee");
                setIsModalOpen((prv) => !prv);
              }}
            >
              Create Employee
            </button>
            <button
              className="border border-border_color hover:bg-primary hover:text-background px-6 py-2 rounded-lg duration-200"
              onClick={() => {
                setCreateAction("product");
                setIsModalOpen((prv) => !prv);
              }}
            >
              Create Product
            </button>
            <button
              className="border border-border_color hover:bg-primary hover:text-background px-6 py-2 rounded-lg duration-200"
              onClick={() => {
                setCreateAction("production");
                setIsModalOpen((prv) => !prv);
              }}
            >
              Create Production
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardModal;
