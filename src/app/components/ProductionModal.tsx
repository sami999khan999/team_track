"use client";

import { EmployeeType, PorductionType, ProductType } from "@/types";
import { getEmployee } from "@/utils/employeeApiRequest";
import { getProducts } from "@/utils/productApiRequests";
import {
  createProduction,
  deleteProduction,
  updateProduction,
} from "@/utils/productionApiRequests";
import React, { SetStateAction, useEffect, useState } from "react";
import { CgSpinnerTwo } from "react-icons/cg";
import { IoMdClose } from "react-icons/io";
import DeleteModal from "./DeleteModal";
import Dropdown from "./Dropdown";

const ProductionModal = ({
  setIsOpen,
  defalutValue,
  setDefalutValue,
  action,
  setReload,
}: {
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
  defalutValue?: PorductionType | undefined;
  setDefalutValue?: React.Dispatch<SetStateAction<PorductionType | undefined>>;
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
    quantity: defalutValue ? defalutValue.quantity : undefined,
  });
  const [employeeId, setEmployeeId] = useState<number | undefined>(undefined);
  const [productId, setProductId] = useState<number | undefined>(undefined);
  const [inputError, setInputError] = useState({
    quantity: "",
    employee: "",
    products: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const adtiveElement = {
    id: defalutValue?.id,
    name: defalutValue?.product.name,
  };

  const deleteHandler = async () => {
    const response = await deleteProduction(adtiveElement.id);

    if (response.success) {
      setIsOpen(false);
      setReload((prv) => !prv);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductionInput({
      ...productionInput,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    const newError = {
      quantity: !productionInput.quantity ? "Enter Quantity to continue" : "",
      employee: !employeeId ? "Select Employee to continue" : "",
      products: !productId ? "Select Product to continue" : "",
    };

    const hasErrors = Object.values(newError).some(
      (errorMessage) => errorMessage !== ""
    );

    if (hasErrors) {
      setInputError(newError);
      return;
    } else {
      setIsLoading(true);
      const data = {
        quantity: productionInput.quantity,
        employee: employeeId,
        product: productId,
      };

      if (action === "create") {
        const response = await createProduction(data);

        if (response.success) {
          setReload((prv) => !prv);
        }
      }

      if (action === "update") {
        const response = await updateProduction(defalutValue?.id, data);

        if (response.success) {
          setReload((prv) => !prv);
        }
      }

      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  useEffect(() => {
    setEmployeeId(defalutValue ? defalutValue.employee.id : undefined);
    setProductId(defalutValue ? defalutValue.product.id : undefined);
  }, [defalutValue]);

  useEffect(() => {
    const getEmployees = async () => {
      const response = await getEmployee(employeeCurrentPage);

      if (response.success) {
        const firstElement = response.data.shift();
        const totalPage = firstElement.total_page;

        setEmployees(response.data);
        setemployeesTotalPage(totalPage);
      }
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
    <>
      {action === "delete" ? (
        <DeleteModal
          activeElement={adtiveElement}
          handler={deleteHandler}
          setIsOpen={setIsOpen}
          title={"Production"}
        />
      ) : (
        <div
          className="absolute top-0 left-0 w-full h-full backdrop-blur-md flex items-center justify-center z-20"
          onClick={() => {
            setIsOpen((prv) => !prv);
            if (setDefalutValue) {
              setDefalutValue(undefined);
            }
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-secondary w-[90%] xl:w-[60%] border border-border_color rounded-xl px-3 xl:px-8 py-6 xl:py-12 relative"
          >
            <div
              className="absolute xl:top-6 top-4 xl:right-6 right-4 text-2xl xl:text-3xl text-primary-foreground hover:bg-secondary-foreground p-1 w-fit rounded-md"
              onClick={() => {
                setIsOpen((prv) => !prv);
              }}
            >
              <IoMdClose className="transition-transform hover:rotate-90 origin-center" />
            </div>

            <div className="text-primary-foreground text-center border-b border-border_color pb-6 xl:pb-8">
              {defalutValue ? (
                <div className="text-xl xl:text-3xl font-semibold flex flex-col items-center justify-center gap-2">
                  <p className="text-primary font-sour_gummy">
                    Update Production
                  </p>
                  <div className="hidden xl:block text-base w-[80%]">
                    To update production records, include{" "}
                    <span className="text-primary">
                      dropdowns for selecting an employee and product
                    </span>
                    , along with input fields for rate and quantity. This
                    ensures accurate assignments and streamlines data tracking.
                  </div>
                </div>
              ) : (
                <div className="text-xl xl:text-3xl font-semibold flex flex-col items-center justify-center gap-2">
                  <p className="text-primary font-sour_gummy">
                    Creaate Production
                  </p>
                  <div className="hidden xl:block text-base ">
                    To create production records, include{" "}
                    <span className="text-primary">
                      dropdowns for selecting an employee and product
                    </span>
                    , along with input fields for rate and quantity. This
                    ensures accurate assignments and streamlines data tracking.
                  </div>
                </div>
              )}
            </div>
            <div className="flex flex-col xl:flex-row mt-6 xl:mt-8 gap-6 xl:gap-10">
              <div className="w-full space-y-3">
                <p className="text-primary-foreground text-xl font-medium text-center">
                  Select{" "}
                  <span className="text-primary font-semibold">Employee</span> ,
                  <span className="text-primary font-semibold"> Product </span>
                  and Enter
                  <span className="text-primary font-semibold"> Quantity</span>
                </p>
                <Dropdown
                  data={employees}
                  totalPage={employeesTotalPage}
                  currentPage={employeeCurrentPage}
                  setCurrentPage={setEmployeeCurrentPage}
                  setId={setEmployeeId}
                  defalutValue={defalutValue}
                  type="employee"
                />
                {inputError.employee && (
                  <p className="error_message">{inputError.employee}</p>
                )}
                <Dropdown
                  data={products}
                  totalPage={productsTotalPage}
                  currentPage={productCurrentPage}
                  setCurrentPage={setProductCurrentPage}
                  setId={setProductId}
                  defalutValue={defalutValue}
                  type="product"
                />
                {inputError.products && (
                  <p className="error_message">{inputError.products}</p>
                )}

                <input
                  type="number"
                  value={productionInput.quantity}
                  name="quantity"
                  placeholder="Emter Quabtity"
                  onChange={handleInputChange}
                  className="rounded-full bg-secondary-foreground border border-border_color px-4 xl:px-6 text-sm xl:text-xl py-2 text-primary-foreground font-medium"
                />
                {inputError.quantity && (
                  <p className="error_message">{inputError.quantity}</p>
                )}
              </div>
            </div>
            <div className="w-full flex items-center justify-center mt-5 xl:mt-8">
              <button
                className="submit-btn mt-0"
                disabled={isLoading}
                onClick={handleSubmit}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center w-full">
                    <CgSpinnerTwo className="animate-spin text-background group-hover:text-primary-foreground" />
                  </div>
                ) : (
                  <div>{defalutValue ? "Update" : "Create"} Production</div>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductionModal;
