"use client";

import { EmployeeType, ProductType, SelectInventoryType } from "@/types";
import { getEmployee } from "@/utils/employeeApiRequest";
import { getFilterInventory } from "@/utils/invoiceApiRequests";
import { getProducts } from "@/utils/productApiRequests";
import React, { SetStateAction, useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import Dropdown from "./Dropdown";
import InvoiceCreateTable from "./InvoiceCreateTable";

const InvoiceModal = ({
  setIsOpen,
}: {
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const [employees, setEmployees] = useState<EmployeeType[]>();
  const [employeeCurrentPage, setEmployeeCurrentPage] = useState(1);
  const [employeeTotalPage, setEmployeeTotalPage] = useState<
    number | undefined
  >();
  const [activeEmployeeId, setActiveEmployeeId] = useState<
    number | undefined
  >();

  const [products, setProducts] = useState<ProductType[]>();
  const [productCurrentPage, setproductCurrentPage] = useState(1);
  const [productTotalPage, setproductTotalPage] = useState<
    number | undefined
  >();
  const [activeProductId, setActiveProductId] = useState<number | undefined>();

  const [inventories, setInventories] = useState<
    SelectInventoryType[] | undefined
  >();

  const [filterdInventoryIds, setFilterdInventoryIds] = useState<
    number[] | undefined
  >();
  const [filterdInventory, setFilterdInventory] = useState<
    SelectInventoryType[] | undefined
  >();

  const filterInventoryhandler = async () => {
    const data = {
      employee: activeEmployeeId === undefined ? "" : activeEmployeeId,
      product: activeProductId === undefined ? "" : activeProductId,
    };

    console.log(data);

    const response = await getFilterInventory(data);

    if (response.success) {
      setInventories(response.data);
    }
  };

  useEffect(() => {
    const fetchEmployees = async () => {
      const response = await getEmployee(employeeCurrentPage);

      if (response.success) {
        const firstElement = response.data.shift();
        const totalPages = firstElement.total_page;

        setEmployees(response.data);
        setEmployeeTotalPage(totalPages);
      }
    };

    fetchEmployees();
  }, [employeeCurrentPage]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await getProducts(productCurrentPage);

      if (response.success) {
        const firstElement = response.data.shift();
        const totalPages = firstElement.total_page;

        setProducts(response.data);
        setproductTotalPage(totalPages);
      }
    };

    fetchProducts();
  }, [productCurrentPage]);

  console.log(filterdInventoryIds);

  useEffect(() => {
    setFilterdInventory(
      inventories?.filter((inv) => filterdInventoryIds?.includes(inv.id))
    );
  }, [filterdInventoryIds]);

  console.log(filterdInventory);

  return (
    <div
      className="absolute top-0 left-0 w-full h-full backdrop-blur-lg flex items-center justify-center z-20"
      // onClick={() => setIsOpen((prv) => !prv)}
    >
      <div
        className="relative w-[95%] xl:w-[90%] bg-secondary border border-border_color rounded-xl px-4 xl:py-8 py-4"
        // onClick={(e) => e.stopPropagation()}
      >
        <div
          className="absolute top-2 xl:top-4 right-2 xl:right-4 hover:bg-secondary-foreground p-1 text-primary-foreground text-2xl xl:text-3xl rounded-md"
          onClick={() => setIsOpen((prv) => !prv)}
        >
          <IoClose className=" transition-transform hover:rotate-90 origin-center" />
        </div>
        <div className="flex flex-col gap-2 items-center justify-center text-center border-b border-border_color pb-4">
          <h2 className="font-sour_gummy text-xl xl:text-3xl font-semibold text-primary tracking-wide ">
            Create Invoice
          </h2>
          <p className="text-primary-foreground text-base w-[60%] hidden xl:block">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae
            minima impedit aliquid.
          </p>
        </div>
        <div className="mt-6 flex flex-col xl:flex-row gap-4">
          <div className="left xl:w-[50%] space-y-8">
            <div className="flex flex-col xl:flex-row gap-4">
              <div className="flex flex-col w-full">
                <Dropdown
                  data={products}
                  totalPage={productTotalPage}
                  currentPage={productCurrentPage}
                  setCurrentPage={setproductCurrentPage}
                  setId={setActiveProductId}
                  type="product"
                />
                <p></p>
              </div>
              <div className="flex flex-col w-full">
                <Dropdown
                  data={employees}
                  totalPage={employeeTotalPage}
                  currentPage={employeeCurrentPage}
                  setCurrentPage={setEmployeeCurrentPage}
                  setId={setActiveEmployeeId}
                  type="employee"
                />
                <p></p>
              </div>
              <button
                className="bg-primary px-4 xl:h-[2.9rem] h-[2rem] rounded-full text-xl font-semibold tracking-wide hover:bg-secondary-foreground hover:text-primary-foreground duration-200"
                onClick={filterInventoryhandler}
              >
                Get
              </button>
            </div>
            <InvoiceCreateTable
              type="selection"
              setFilterdInventoryIds={setFilterdInventoryIds}
              filterdInventoryIds={filterdInventoryIds}
              inventories={inventories}
            />
          </div>
          <div className="border-t xl:border-l border-border_color"></div>
          <div className="right">
            {/* <input
              type="date"
              className="bg-secondary-foreground border border-border_color rounded-full text-primary-foreground w-full py-1 mt-4 px-6"
              placeholder=""
            /> */}
            <InvoiceCreateTable
              type="selected"
              // setFilterdInventoryIds={setFilterdInventoryIds}
              // filterdInventoryIds={filterdInventoryIds}
              inventories={filterdInventory}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceModal;
