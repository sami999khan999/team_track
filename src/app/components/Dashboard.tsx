"use client";

import { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import DashboardModal from "./DashboardModal";

import AddFormModal from "./AddFormModal";
import ProductionModal from "./ProductionModal";
import ProductModal from "./ProductModal";
import { DashboardData } from "@/types";
import { logo } from "@/utils/logo";
import OverviewCard from "./OverviewCard";

const dashboardData: DashboardData = {
  employee: {
    totalEmployee: 23,
    activeEmployee: 20,
    employeeOftheMounth: {
      name: "sami Khan",
      id: 4,
      totalEarned: 20000,
      producedUnites: 432,
    },

    topEmployees: [
      {
        name: "Sami",
        id: 1,
      },
      {
        name: "Maruf",
        id: 2,
      },
      {
        name: "Goru",
        id: 3,
      },
      {
        name: "Including",
        id: 4,
      },
      {
        name: "includingertetrfgwesfefsrhsrthes",
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
        className="absolute xl:bottom-10 bottom-16 xl:right-10 right-4 text-primary-foreground xl:text-4xl text-2xl border border-border_color rounded-full p-3 hover:text-primary bg-background group transition-all duration-200 xl:w-[4rem] w-[3rem] hover:xl:w-[10rem] hover:w-[8rem] z-50 "
        onClick={() => setIsOpen((prv) => !prv)}
      >
        <p className="opacity-0 group-hover:opacity-100 absolute bottom-[7px] xl:bottom-[10px]  right-3 bg-background text-xl xl:text-2xl text-primary-foreground px-2 py-1 rounded-md transition-all duration-200 font-semibold">
          Invoice
        </p>
        <IoMdAdd className="text-right" />
      </div>

      <div className="xl:space-y-10 space-y-5 mb-10 capitalize ">
        <div className="bg-secondary w-full xl:px-6 xl:py-8 py-4 rounded-xl border border-border_color flex flex-col xl:flex-row justify-center items-center xl:gap-10 gap-3 shadow-sm">
          <div className="text-center xl:text-3xl text-2xl text-primary font-semibold flex items-center justify-center h-full">
            <p>Create</p>
          </div>

          <div className="border-4 border-border_color xl:h-10 hidden xl:block"></div>

          <div className="flex items-center justify-center w-full">
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 xl:text-xl text-primary-foreground font-semibold items-center w-full px-3 xl:px-0">
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

        <div className="w-full xl:px-6 xl:py-8 py-3 rounded-xl border border-border_color flex flex-col bg-secondary items-center gap-3 shadow-sm">
          <div className="xl:text-left text-center w-full px-4 xl:text-3xl text-2xl text-primary font-semibold mt-3">
            OverView
          </div>

          <div className="w-full px-2 py-2 flex xl:gap-8 gap-2 h-[40vh] ">
            <div className="grid grid-cols-2 xl:w-[50%] w-[65%] xl:gap-3 gap-1">
              {/* Employee Card */}
              <OverviewCard
                logo={logo.Employees}
                title="Employee"
                value={dashboardData.employee.totalEmployee}
              />

              {/* Customers Card */}
              <OverviewCard
                logo={logo.Customers}
                title="Customers"
                value={dashboardData.totalCustomer}
              />

              {/* Products Card */}
              <OverviewCard
                logo={logo.Products}
                title="Products"
                value={dashboardData.products.totalProducts}
              />

              {/* Productions Card */}
              <OverviewCard
                logo={logo.Production}
                title="Productions"
                value={dashboardData.production.totalProduction}
              />
            </div>

            <div className="xl:w-[50%] w-[35%] grid xl:grid-cols-2 grid-cols-1 xl:gap-3 gap-1">
              {/* Inventories Card */}
              <OverviewCard
                logo={logo.Inventory}
                title="Inventories"
                value={dashboardData.inventory.total}
              />

              {/* Invoices Card */}
              <OverviewCard
                logo={logo.Invoice}
                title="Invoices"
                value={dashboardData.invoice.total}
              />

              {/* Categories Card */}
              <OverviewCard
                logo={logo.Employees}
                title="Categories"
                value={dashboardData.totalCategory}
              />
            </div>
          </div>
        </div>

        <div className="w-full xl:px-6 xl:py-8 rounded-xl border border-border_color flex flex-col bg-secondary items-center gap-3 shadow-sm">
          <div className="w-full flex flex-col xl:flex-row gap-10 px-2 py-6">
            <div className="xl:w-[60%]">
              <div className="xl:text-left text-center w-full px-2 xl:text-3xl text-2xl text-primary font-semibold xl:mb-4 mb-3 xl:mt-0">
                Employee Of The Mounth
              </div>
              <div className="border border-border_color w-full rounded-md text-xl text-primary-foreground bg-background font-medium relative px-4 xl:h-[12rem] py-4 xl:py-0 flex">
                <div className="flex flex-col xl:flex-row gap-4 w-full">
                  <div className="w-full flex items-center justify-center">
                    <div className=" w-full flex flex-col xl:flex-row justify-between gap-4 px-4 py-3 xl:py-8 text-center rounded-lg">
                      <div className="space-y-4">
                        <p className="text-2xl opacity-50">
                          ID : {dashboardData.employee.employeeOftheMounth.id}
                        </p>

                        <p className="xl:text-2xl text-xl uppercase">
                          {dashboardData.employee.employeeOftheMounth.name}
                        </p>
                      </div>
                      <div className="border border-border_color"></div>

                      <div className="space-y-4 xl:w-[33%]">
                        <div className="text-2xl opacity-30">
                          Produced Units
                        </div>
                        <div className="text-3xl text-primary font-semibold">
                          {
                            dashboardData.employee.employeeOftheMounth
                              .producedUnites
                          }
                        </div>
                      </div>

                      <div className="border border-border_color"></div>

                      <div className="space-y-4 xl:w-[33%]">
                        <div className="text-2xl opacity-30">Total Earned</div>
                        <div className="text-3xl text-primary font-semibold">
                          {
                            dashboardData.employee.employeeOftheMounth
                              .totalEarned
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="xl:w-[40%] ">
              <div className="xl:text-left text-center w-full px-2 xl:text-3xl text-2xl text-primary font-semibold xl:mb-4 mb-3 mt-3 xl:mt-0">
                Top Employees
              </div>

              <div className="w-full rounded-md text-xl text-primary-foreground font-medium relative capitalize  ">
                <div className="space-y-4">
                  <div className="bg-background px-5 py-4 border border-border_color rounded-lg flex xl:text-5xl text-3xl cursor-pointer">
                    <div className="opacity-30">
                      {dashboardData.employee.topEmployees[0].id}.
                    </div>
                    <div className="w-full text-center opacity-80">
                      {dashboardData.employee.topEmployees[0].name}
                    </div>
                  </div>

                  <div className="xl:text-2xl text-xl grid grid-cols-2 gap-2">
                    <div className="flex gap-2 bg-background py-1 px-4 rounded-md border border-border_color space-x-2 cursor-pointer">
                      <div className="opacity-30">
                        {dashboardData.employee.topEmployees[1].id}.
                      </div>
                      <div className="w-full text-center opacity-80">
                        {dashboardData.employee.topEmployees[1].name}
                      </div>
                    </div>

                    <div className="flex gap-2 bg-background py-1 px-4 rounded-md  border border-border_color space-x-2 cursor-pointer">
                      <div className="opacity-30">
                        {dashboardData.employee.topEmployees[2].id}.
                      </div>
                      <div className="w-full text-center opacity-80">
                        {dashboardData.employee.topEmployees[2].name}
                      </div>
                    </div>

                    <div className="flex bg-background py-1 px-4 rounded-md  border border-border_color space-x-2 cursor-pointer">
                      <div className="opacity-30">
                        {dashboardData.employee.topEmployees[3].id}.
                      </div>
                      <div className="w-full text-center opacity-80">
                        {dashboardData.employee.topEmployees[3].name}
                      </div>
                    </div>

                    <div className="flex bg-background py-1 px-4 truncate-text rounded-md  border border-border_color space-x-2 cursor-pointer">
                      <div className="opacity-30">
                        {dashboardData.employee.topEmployees[4].id}.
                      </div>
                      <div className="w-full text-center opacity-80">
                        {dashboardData.employee.topEmployees[4].name}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full xl:px-6 xl:py-8 py-4 rounded-xl border border-border_color flex flex-col xl:flex-row bg-secondary items-center gap-3 shadow-sm">
          <div className="xl:w-[50%] w-full px-2">
            <div className="xl:text-left text-center w-full px-2 xl:text-3xl text-2xl text-primary font-semibold xl:mb-4 mb-3 xl:mt-0">
              Invoice
            </div>

            <div className="border border-border_color w-full rounded-md text-xl text-primary-foreground bg-background font-medium relative px-4 py-4 xl:py-0 flex cursor-pointer">
              <div className="flex flex-col xl:flex-row gap-4 w-full">
                <div className="w-full flex items-center justify-center">
                  <div className=" w-full flex flex-col xl:flex-row justify-between gap-4 px-4 py-3 xl:py-8 text-center rounded-lg">
                    <div className="space-y-4 w-full">
                      <p className="text-2xl opacity-30">Total</p>
                      <p className="xl:text-2xl text-xl text-primary">
                        {dashboardData.invoice.total}
                      </p>
                    </div>
                    <div className="border border-border_color"></div>

                    <div className="space-y-4 w-full">
                      <div className="text-2xl opacity-30">Paid</div>
                      <div className="text-3xl text-primary font-semibold">
                        {dashboardData.invoice.paid}
                      </div>
                    </div>

                    <div className="border border-border_color"></div>

                    <div className="space-y-4 w-full">
                      <div className="text-2xl opacity-30">Not Paied</div>
                      <div className="text-3xl text-primary font-semibold">
                        {dashboardData.invoice.notPaied}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="xl:w-[50%] w-full px-2">
            <div className="xl:text-left text-center w-full px-2 xl:text-3xl text-2xl text-primary font-semibold xl:mb-4 mb-3 ">
              Inventory
            </div>

            <div className="border border-border_color w-full rounded-md text-xl text-primary-foreground bg-background font-medium relative px-4 py-4 xl:py-0 flex cursor-pointer">
              <div className="flex flex-col xl:flex-row gap-4 w-full">
                <div className="w-full flex items-center justify-center">
                  <div className=" w-full flex flex-col xl:flex-row justify-between gap-4 px-4 py-3 xl:py-8 text-center rounded-lg">
                    <div className="space-y-4 w-full">
                      <p className="text-2xl opacity-30">Total</p>
                      <p className="xl:text-2xl text-xl text-primary">
                        {dashboardData.inventory.total}
                      </p>
                    </div>

                    <div className="border border-border_color"></div>

                    <div className="space-y-4 w-full">
                      <div className="text-2xl opacity-30">Sold</div>
                      <div className="text-3xl text-primary font-semibold">
                        {dashboardData.inventory.sold}
                      </div>
                    </div>

                    <div className="border border-border_color"></div>

                    <div className="space-y-4 w-full">
                      <div className="text-2xl opacity-30">Not Paied</div>
                      <div className="text-3xl text-primary font-semibold">
                        {dashboardData.inventory.inStock}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full xl:px-6 xl:py-8 py-4 rounded-xl border border-border_color flex flex-col xl:flex-row bg-secondary items-center gap-3 shadow-sm">
          <div className=" w-full px-2">
            <div className="xl:text-left text-center w-full px-2 xl:text-3xl text-2xl text-primary font-semibold xl:mb-4 mb-3 xl:mt-0">
              Production
            </div>

            <div className="border border-border_color w-full rounded-md text-xl text-primary-foreground bg-background font-medium relative px-4 py-4 xl:py-0 flex cursor-pointer">
              <div className="flex flex-col xl:flex-row gap-4 w-full">
                <div className="w-full flex items-center justify-center">
                  <div className=" w-full flex flex-col xl:flex-row justify-between gap-4 px-4 py-3 xl:py-8 text-center rounded-lg">
                    <div className="space-y-4 w-full">
                      <p className="text-2xl opacity-30">Total</p>
                      <p className="xl:text-2xl text-xl text-primary">
                        {dashboardData.production.totalProduction}
                      </p>
                    </div>
                    <div className="border border-border_color"></div>

                    <div className="space-y-4 w-full">
                      <div className="text-2xl opacity-30">
                        Total In a Mounth
                      </div>
                      <div className="text-3xl text-primary font-semibold">
                        {dashboardData.production.totalProductionInAMounth}
                      </div>
                    </div>

                    <div className="border border-border_color"></div>

                    <div className="space-y-4 w-full">
                      <div className="text-2xl opacity-30">Paid</div>
                      <div className="text-3xl text-primary font-semibold">
                        {dashboardData.production.paiedProduction}
                      </div>
                    </div>
                    <div className="border border-border_color"></div>

                    <div className="space-y-4 w-full">
                      <div className="text-2xl opacity-30">Not Paid</div>
                      <div className="text-3xl text-primary font-semibold">
                        {dashboardData.production.notPaiedProduction}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full xl:px-6 xl:py-8 py-4 rounded-xl border border-border_color flex flex-col xl:flex-row bg-secondary items-center gap-3 shadow-sm">
          <div className=" w-full px-2">
            <div className="xl:text-left text-center w-full px-2 xl:text-3xl text-2xl text-primary font-semibold xl:mb-4 mb-3 xl:mt-0">
              Top Sold Product
            </div>

            <div className="border border-border_color w-full rounded-md text-xl text-primary-foreground bg-background font-medium relative px-4 py-4 xl:py-0 flex cursor-pointer">
              <div className="flex flex-col xl:flex-row gap-4 w-full">
                <div className="w-full flex items-center justify-center">
                  <div className=" w-full flex flex-col xl:flex-row justify-between gap-4 px-4 py-3 xl:py-8 text-center rounded-lg">
                    <div className="space-y-4 w-full">
                      <p className="text-2xl opacity-30">
                        ID : {dashboardData.products.topSoledProducts.id}
                      </p>
                      <p className="xl:text-2xl text-xl text-primary ">
                        {dashboardData.products.topSoledProducts.name}
                      </p>
                    </div>
                    <div className="border border-border_color"></div>

                    <div className="space-y-4 w-full">
                      <div className="text-2xl opacity-30">Sold Units</div>
                      <div className="text-3xl text-primary font-semibold">
                        {dashboardData.products.topSoledProducts.soldUnits}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
