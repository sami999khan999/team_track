"use client";

import {
  CustomerType,
  EmployeeType,
  ProductType,
  SelectInventoryType,
} from "@/types";
import { getEmployee } from "@/utils/employeeApiRequest";
import { createInvoice, getFilterInventory } from "@/utils/invoiceApiRequests";
import { getProducts } from "@/utils/productApiRequests";
import React, { SetStateAction, useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import Dropdown from "./Dropdown";
import InvoiceCreateTable from "./InvoiceCreateTable";
import { getCustoer } from "@/utils/customerApiRerquest";
import { useRouter } from "next/navigation";

const InvoiceModal = ({
  setIsOpen,
}: {
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const path = useRouter();
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
  const [customers, setCustomers] = useState<CustomerType[] | undefined>();
  const [customerCurrentPage, setCustomerCurrentPage] = useState(1);
  const [cusotmerTotalPage, setCusotmerTotalPage] = useState<
    number | undefined
  >();
  const [activeCustomerId, setActiveCustomerId] = useState<
    number | undefined
  >();
  const [date, setData] = useState<string>();
  const [customerSelectError, setCustomerSelectError] = useState("");

  const filterInventoryhandler = async () => {
    const data = {
      employee: activeEmployeeId === undefined ? "" : activeEmployeeId,
      product: activeProductId === undefined ? "" : activeProductId,
    };

    const response = await getFilterInventory(data);

    if (response.success) {
      setInventories(response.data);
    }
  };

  const invoiceCreateHandler = async () => {
    if (!activeCustomerId) {
      setCustomerSelectError("Please select a customer");
      return;
    }

    const data = {
      customer_id: activeCustomerId,
      inventory_id: filterdInventoryIds,
      date: date ? date : "",
    };

    const response = await createInvoice(data);

    if (response.success) {
      path.push(`invoice/${response.challan_id}`);
      console.log(response);
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

  useEffect(() => {
    const fetchCustomer = async () => {
      const response = await getCustoer(customerCurrentPage);

      if (response.success) {
        const firstElement = response.data.shift();
        const totalPages = firstElement.total_page;

        setCustomers(response.data);
        setCusotmerTotalPage(totalPages);
      }
    };

    fetchCustomer();
  }, [customerCurrentPage]);

  useEffect(() => {
    setFilterdInventory(
      inventories?.filter((inv) => filterdInventoryIds?.includes(inv.id))
    );
  }, [filterdInventoryIds, inventories]);

  return (
    <div
      className="absolute top-0 left-0 w-full h-full backdrop-blur-lg flex items-center justify-center z-20"
      // onClick={() => setIsOpen((prv) => !prv)}
    >
      <div
        className="relative w-[95%] xl:w-[90%] h-[78%] overflow-auto bg-secondary border border-border_color rounded-xl px-4 xl:py-8 py-4 remove-scrollbar"
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
          <p className="text-primary-foreground text-lg w-[60%] hidden xl:block">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae
            minima impedit aliquid.
          </p>
        </div>
        <div className="mt-6 flex flex-col xl:flex-row gap-4 remove-scrollbar">
          <div className="left xl:w-[50%] space-y-8 ">
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
              </div>
              <button
                className="bg-primary px-4 xl:h-[2.9rem] h-[2rem] rounded-full text-xl font-semibold tracking-wide hover:bg-secondary-foreground hover:text-primary-foreground duration-200"
                onClick={filterInventoryhandler}
              >
                Get
              </button>
            </div>
            <div>
              <h2 className="text-center text-primary text-lg xl:text-2xl font-semibold mb-4">
                Select Production
              </h2>
              <div className="">
                {inventories?.length === 0 ? (
                  <h2 className="text-center text-2xl xl:text-3xl font-bold text-primary-foreground mt-2 xl:mt-[5rem]">
                    No Porducts Found
                  </h2>
                ) : (
                  <InvoiceCreateTable
                    type="selection"
                    setFilterdInventoryIds={setFilterdInventoryIds}
                    filterdInventoryIds={filterdInventoryIds}
                    inventories={inventories}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="border-t-4 xl:border-l-8 border-border_color"></div>
          <div className="right xl:w-[50%] space-y-8 ">
            <div className="flex flex-col xl:flex-row gap-4 ">
              <div className="w-full">
                <Dropdown
                  data={customers}
                  totalPage={cusotmerTotalPage}
                  currentPage={customerCurrentPage}
                  setCurrentPage={setCustomerCurrentPage}
                  setId={setActiveCustomerId}
                  setSelectionError={setCustomerSelectError}
                  type="customer"
                />
                <p className="error_message">{customerSelectError}</p>
              </div>
              <div className="w-full">
                <input
                  type="date"
                  className="bg-secondary-foreground border border-border_color rounded-full text-primary-foreground w-full py-1 px-6"
                  onChange={(e) => setData(e.target.value)}
                />
              </div>
            </div>
            <div>
              <h2 className="text-center text-primary text-lg xl:text-2xl font-semibold mb-4">
                Create Invoice
              </h2>
              <InvoiceCreateTable
                type="selected"
                // setFilterdInventoryIds={setFilterdInventoryIds}
                // filterdInventoryIds={filterdInventoryIds}
                inventories={filterdInventory}
              />
            </div>
            <div className="w-full flex items-center justify-center">
              {filterdInventoryIds !== undefined &&
              filterdInventoryIds.length >= 1 ? (
                <button
                  className="bg-primary text-background px-10 py-2 rounded-full text-xl font-medium
                "
                  onClick={invoiceCreateHandler}
                >
                  Create Invoice
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceModal;
