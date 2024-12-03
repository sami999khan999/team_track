"use client";

import { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import DashboardModal from "./DashboardModal";

import AddFormModal from "./AddFormModal";
import ProductionModal from "./ProductionModal";
import ProductModal from "./ProductModal";

const dashboardData = {
  employee: {
    totalEmployee: 23,
    activeEmployee: 20,
    employeeOftheMounth: {
      name: "sami",
      id: 4,
      totalEarned: 20000,
      producedUnites: 432,
    },

    topEmployees: [
      {
        name: "ali",
        id: 1,
      },
      {
        name: "ali",
        id: 2,
      },
      {
        name: "ali",
        id: 3,
      },
      {
        name: "ali",
        id: 4,
      },
      {
        name: "ali",
        id: 5,
      },
    ],
  },

  invoice: {
    paid: 20,
    notPaied: 5,
    total: 25,
  },

  inventory: {
    inStock: 20,
    sold: 5,
    total: 25,
  },

  totalCustomer: 20,

  production: {
    totalProduction: 20,
    totalProductionInAMounth: 30,
    paiedProduction: 15,
    notPaiedProduction: 5,
  },

  products: {
    totalProducts: 20,
    topSoledProducts: {
      name: "product1",
      id: 1,
      soldUnits: 10,
    },
  },

  totalCategory: 4,
};

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [reload, setReload] = useState(true);

  const [createAction, setCreateAction] = useState<
    "employee" | "customer" | "product" | "production"
  >();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="">
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

      {isOpen && <DashboardModal setIsOpen={setIsOpen} />}

      <div
        className="absolute xl:bottom-10 bottom-16 xl:right-10 right-4 text-primary-foreground xl:text-4xl text-2xl border border-border_color rounded-full p-3 hover:text-primary bg-background group transition-all duration-200 xl:w-[4rem] w-[3rem] hover:xl:w-[10rem] hover:w-[8rem]"
        onClick={() => setIsOpen((prv) => !prv)}
      >
        <p className="opacity-0 group-hover:opacity-100 absolute bottom-[7px] xl:bottom-[10px]  right-3 bg-background text-xl xl:text-2xl text-primary-foreground px-2 py-1 rounded-md transition-all duration-200 font-semibold">
          Invoice
        </p>
        <IoMdAdd className="text-right" />
      </div>

      <div className="bg-secondary w-full xl:px-6 xl:py-8 py-4 rounded-xl border border-border_color">
        <div className="text-center xl:text-3xl text-2xl text-primary font-sour_gummy font-semibold mb-6">
          <p>Create</p>
        </div>
        <div className="flex items-center justify-center">
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 xl:text-xl text-primary-foreground font-semibold px-4 items-center w-full">
            <button
              className="border border-border_color bg-background hover:bg-primary hover:text-background px-6 py-2 rounded-lg duration-200"
              onClick={() => {
                setCreateAction("customer");
                setIsModalOpen((prv) => !prv);
              }}
            >
              Customer
            </button>
            <button
              className="border border-border_color hover:bg-primary hover:text-background px-6 py-2 rounded-lg duration-200 bg-background"
              onClick={() => {
                setCreateAction("employee");
                setIsModalOpen((prv) => !prv);
              }}
            >
              Employee
            </button>
            <button
              className="border border-border_color bg-background hover:bg-primary hover:text-background px-6 py-2 rounded-lg duration-200"
              onClick={() => {
                setCreateAction("product");
                setIsModalOpen((prv) => !prv);
              }}
            >
              Product
            </button>
            <button
              className="border border-border_color bg-background hover:bg-primary hover:text-background px-6 py-2 rounded-lg duration-200"
              onClick={() => {
                setCreateAction("production");
                setIsModalOpen((prv) => !prv);
              }}
            >
              Production
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
