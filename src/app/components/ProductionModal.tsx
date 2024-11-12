"use client";

import { EmployeeType, PorductionType, ProductType } from "@/types";
import { getEmployee } from "@/utils/employeeApiRequest";
import { getProducts } from "@/utils/productApiRequests";
import React, { SetStateAction, useEffect, useState } from "react";
import ProductionDropdown from "./ProductionDropdown";
import {
  createProduction,
  updateProduction,
} from "@/utils/productionApiRequests";

const ProductionModal = ({
  setIsOpen,
  defalutValue,
  action,
  setReload,
}: {
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
  defalutValue?: PorductionType | undefined;
  action: "create" | "update" | "delete" | undefined;
  setReload: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const [productCurrentPage, setProductCurrentPage] = useState(1);
  const [productsTotalPage, setProductsTotalPage] = useState<
    number | undefined
  >(undefined);
  const [products, setProducts] = useState<ProductType[]>();

  const [employeeCurrentPage, setEmployeeCurrentPage] = useState(1);
  const [employeesTotalPage, setemployeesTotalPage] = useState<
    number | undefined
  >(undefined);
  const [employees, setEmployees] = useState<EmployeeType[]>();

  const [productionInput, setProductionInput] = useState({
    rate: defalutValue ? defalutValue.rate : undefined,
    quantity: defalutValue ? defalutValue.quantity : undefined,
  });
  const [employeeId, setEmployeeId] = useState<number | undefined>(undefined);
  const [productId, setProductId] = useState<number | undefined>(undefined);

  console.log(employeeId);
  console.log(productId);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductionInput({
      ...productionInput,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    const data = {
      rate: Number(productionInput.rate),
      quantity: Number(productionInput.quantity),
      employee_id: Number(employeeId),
      products_id: Number(productId),
    };

    // console.log(data);
    // console.log(defalutValue?.id);

    if (action === "create") {
      const response = await createProduction(data);

      if (response.success) {
        setIsOpen(false);
        setReload((prv) => !prv);
      }
    }

    if (action === "update") {
      console.log(data);
      const response = await updateProduction(defalutValue?.id, data);

      if (response.success) {
        setIsOpen(false);
        setReload((prv) => !prv);
      }
    }
  };

  useEffect(() => {
    setEmployeeId(defalutValue ? defalutValue.employee.id : undefined);
    setProductId(defalutValue ? defalutValue.products.id : undefined);
  }, []);

  useEffect(() => {
    const getEmployees = async () => {
      const response = await getEmployee(employeeCurrentPage);

      const firstElement = response.data.shift();
      const totalPage = firstElement.total_page;

      setEmployees(response.data);
      setemployeesTotalPage(totalPage);
    };
    getEmployees();
  }, [employeeCurrentPage]);

  useEffect(() => {
    const getProduct = async () => {
      const response = await getProducts(productCurrentPage);

      if (response.success) {
        const firstElement = response.data.shift();
        const totalPage = firstElement.total_page;

        setProductsTotalPage(totalPage);
        setProducts(response.data);
      }
    };
    getProduct();
  }, [productCurrentPage]);

  return (
    <div
      className="absolute top-0 left-0 w-full h-full backdrop-blur-md flex items-center justify-center z-20"
      onClick={() => setIsOpen((prv) => !prv)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-secondary w-[90%] xl:w-[80%] border border-border_color rounded-xl px-3 xl:px-8 py-6 xl:py-8"
      >
        <div className="text-primary-foreground text-center border-b border-border_color pb-6 xl:pb-8">
          {defalutValue ? (
            <div className="text-xl xl:text-3xl font-semibold flex flex-col items-center justify-center gap-2">
              <p>Update Production</p>
              <div className="hidden xl:block text-base w-[60%]">
                To update production records, include{" "}
                <span className="text-primary">
                  dropdowns for selecting an employee and product
                </span>
                , along with input fields for rate and quantity. This ensures
                accurate assignments and streamlines data tracking.
              </div>
            </div>
          ) : (
            <div className="text-xl xl:text-3xl font-semibold flex flex-col items-center justify-center gap-2">
              <p>Creaate Production</p>
              <div className="hidden xl:block text-base w-[60%]">
                To create production records, include{" "}
                <span className="text-primary">
                  dropdowns for selecting an employee and product
                </span>
                , along with input fields for rate and quantity. This ensures
                accurate assignments and streamlines data tracking.
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-col xl:flex-row mt-6 xl:mt-8 gap-6 xl:gap-10">
          <div className="xl:w-[50%] space-y-3">
            <p className="text-primary-foreground text-xl font-medium text-center">
              Select{" "}
              <span className="text-primary font-semibold">Employee</span> and
              <span className="text-primary font-semibold"> Product</span>
            </p>
            <ProductionDropdown
              data={employees}
              totalPage={employeesTotalPage}
              currentPage={employeeCurrentPage}
              setCurrentPage={setEmployeeCurrentPage}
              setEmployeeId={setEmployeeId}
              setProductId={setProductId}
              defalutValue={defalutValue}
              type="employee"
            />
            <ProductionDropdown
              data={products}
              totalPage={productsTotalPage}
              currentPage={productCurrentPage}
              setCurrentPage={setProductCurrentPage}
              setEmployeeId={setEmployeeId}
              setProductId={setProductId}
              defalutValue={defalutValue}
              type="product"
            />
          </div>
          <div className="border-b xl:border-l border-border_color"></div>

          <div className="xl:w-[50%] space-y-2 xl:space-y-3">
            <p className="text-primary-foreground text-xl font-medium text-center">
              Enter <span className="text-primary font-semibold">Rate</span> and
              <span className="text-primary font-semibold"> Quantity</span>
            </p>
            <input
              type="number"
              value={productionInput.rate}
              name="rate"
              placeholder="Emter Rate"
              onChange={handleInputChange}
              className="rounded-full bg-secondary-foreground border border-border_color px-4 xl:px-6 text-sm xl:text-xl py-2 text-primary-foreground font-medium"
            />
            <input
              type="number"
              value={productionInput.quantity}
              name="quantity"
              placeholder="Emter Quabtity"
              onChange={handleInputChange}
              className="rounded-full bg-secondary-foreground border border-border_color px-4 xl:px-6 text-sm xl:text-xl py-2 text-primary-foreground font-medium"
            />
          </div>
        </div>
        <div className="w-full flex items-center justify-center mt-5 xl:mt-8">
          <button
            className="bg-primary w-full py-2 xl:py-3 font-semibold text-background text-base xl:text-[1.4rem] rounded-full"
            onClick={handleSubmit}
          >
            {defalutValue ? "Update" : "Create"} Production
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductionModal;
