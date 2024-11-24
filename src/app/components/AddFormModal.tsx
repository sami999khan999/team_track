"use client";

import { CustomerType, EmployeeType } from "@/types";
import { createCustomer, updateCustomer } from "@/utils/customerApiRerquest";
import { createEmployee, updateEmployee } from "@/utils/employeeApiRequest";
import React, { Dispatch, SetStateAction, useState } from "react";
import { CgSpinnerTwo } from "react-icons/cg";
import { IoMdClose } from "react-icons/io";

type TableDataType = EmployeeType | CustomerType;

const AddFormModal = ({
  title,
  setIsFormOpen,
  action,
  // setData,
  // data,
  // currentPage,
  setCurrentPage,
  closeModal,
  currentData,
  setReload,
}: {
  title: string;
  setIsFormOpen?: Dispatch<SetStateAction<boolean>>;
  action: string;
  // setData: React.Dispatch<React.SetStateAction<TableDataType[]>>;
  // data: TableDataType[];
  // currentPage: number;
  setCurrentPage?: Dispatch<SetStateAction<number>>;
  closeModal: () => void;
  currentData?: TableDataType;
  setReload: Dispatch<SetStateAction<boolean>>;
}) => {
  const isEmployeeType = (
    data: TableDataType | undefined
  ): data is EmployeeType => {
    return data !== undefined && "nid_no" in data;
  };

  const isCustomerType = (
    data: TableDataType | undefined
  ): data is CustomerType => {
    return data !== undefined && "company_name" in data;
  };

  const [employee, setEmployee] = useState({
    name: currentData ? currentData.name : "",
    address: currentData ? currentData.address : "",
    mobile: currentData ? currentData.mobile : "",
    nid_no: isEmployeeType(currentData) ? currentData.nid_no : "",
  });

  const [customer, setCustomer] = useState({
    name: isCustomerType(currentData) ? currentData.name : "",
    address: isCustomerType(currentData) ? currentData.address : "",
    mobile: isCustomerType(currentData) ? currentData.mobile : "",
    company_name: isCustomerType(currentData) ? currentData.company_name : "",
  });

  const [employeeInputError, setEmployeeInputError] = useState({
    name: "",
    address: "",
    mobile: "",
    nid_no: "",
  });

  const [customerInputError, setCustomerInputError] = useState({
    name: "",
    address: "",
    mobile: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const employeeChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
    setEmployeeInputError({ ...employeeInputError, [e.target.name]: "" });
  };

  const customerChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
    setCustomerInputError({ ...customerInputError, [e.target.name]: "" });
  };

  const submieHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (action === "addEmployee") {
      const newErrors = {
        name: employee.name ? "" : "Name is required",
        address: employee.address ? "" : "Address is required",
        mobile: employee.mobile ? "" : "Mobile No is required",
        nid_no: employee.nid_no ? "" : "NID No is required",
      };

      setEmployeeInputError(newErrors);

      const hasError = Object.values(newErrors).some((error) => error);

      if (!hasError) {
        setIsLoading(true);
        setTimeout(async () => {
          const response = await createEmployee(employee);

          if (response.success) {
            setReload((prv) => !prv);

            if (setCurrentPage) {
              setCurrentPage(1);
            }

            if (setIsFormOpen) {
              setIsFormOpen(false);
            }
          }

          setIsLoading(false);
        }, 1000);
      }
    } else {
      const newErrors = {
        name: customer.name ? "" : "Name is required",
        address: customer.address ? "" : "Address is required",
        mobile: customer.mobile ? "" : "Mobile No is required",
      };

      setCustomerInputError(newErrors);

      const hasError = Object.values(newErrors).some((error) => error);

      if (!hasError) {
        setIsLoading(true);

        setTimeout(async () => {
          const response = await createCustomer(customer);

          if (response.success) {
            setReload((prv) => !prv);

            if (setCurrentPage) {
              setCurrentPage(1);
            }

            if (setIsFormOpen) {
              setIsFormOpen(false);
            }
          }

          setReload(false);
        }, 1000);
      }
    }
  };

  const updateHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      if (action === "updateEmployee") {
        const newErrors = {
          name: employee.name ? "" : "Name is required",
          address: employee.address ? "" : "Address is required",
          mobile: employee.mobile ? "" : "Mobile No is required",
          nid_no: employee.nid_no ? "" : "NID No is required",
        };

        setEmployeeInputError(newErrors);

        const hasError = Object.values(newErrors).some((error) => error);

        if (!hasError) {
          setIsLoading(true);

          setTimeout(async () => {
            const response = await updateEmployee(currentData?.id, employee);

            if (response.success) {
              setReload((prv) => !prv);
              closeModal();
            }

            setIsLoading(false);
          }, 1000);
        }
      } else {
        const newErrors = {
          name: customer.name ? "" : "Name is required",
          address: customer.address ? "" : "Address is required",
          mobile: customer.mobile ? "" : "Mobile No is required",
        };

        setCustomerInputError(newErrors);

        const hasError = Object.values(newErrors).some((error) => error);

        if (!hasError) {
          setIsLoading(true);

          setTimeout(async () => {
            const response = await updateCustomer(currentData?.id, customer);

            if (response.success) {
              setReload((prv) => !prv);
              closeModal();
            }

            setIsLoading(false);
          }, 1000);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className="flex items-center justify-center absolute top-0 left-0 z-50 w-full h-full backdrop-blur-md"
      onClick={() =>
        action && setIsFormOpen ? setIsFormOpen((prv) => !prv) : closeModal()
      }
    >
      <div
        className="relative bg-secondary flex flex-col xl:flex-row xl:px-6 px-2 py-10 border border-border_color rounded-xl w-[90%] xl:w-[65%]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 rounded text-xl xl:text-3xl duration-300 origin-center text-primary-foreground hover:bg-secondary-foreground"
          onClick={() =>
            action && setIsFormOpen
              ? setIsFormOpen((prv) => !prv)
              : closeModal()
          }
        >
          <IoMdClose className="transition-transform hover:rotate-90" />
        </button>
        <div className="w-full items-center xl:w-[28%] xl:mt-8 px-2">
          <h2 className="text-center text-lg xl:text-3xl font-semibold tracking-wider capitalize  font-sour_gummy text-primary">
            {title}
          </h2>
          <p className="text-primary-foreground text-xs xl:text-lg mt-6 text-center">
            {`${"Please fill out the form with the employee's"}`}
            <span className="text-primary">
              {action === "addEmployee"
                ? "Name, Address, Phone Number, and NID."
                : "Name, Company Name, Address and Phone Number"}
            </span>
            All fields are required.
          </p>
        </div>
        <div className="border-t xl:border-l border-border_color my-4 py-0"></div>
        <form
          className="xl:px-8 px-2 xl:py-10 w-full xl:w-[72%] flex flex-col relative rounded"
          onSubmit={
            action === "addEmployee" || action === "addCustomer"
              ? submieHandler
              : updateHandler
          }
        >
          {action === "addEmployee" || action === "updateEmployee" ? (
            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Employee Name..."
                  name="name"
                  value={employee.name}
                  onChange={employeeChangeHandler}
                  className="add_field"
                />
                <p className="error_message">{employeeInputError.name}</p>
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Address..."
                  name="address"
                  value={employee.address}
                  onChange={employeeChangeHandler}
                  className="add_field "
                />
                <p className="error_message">{employeeInputError.address}</p>
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Phone Number..."
                  name="mobile"
                  value={employee.mobile}
                  onChange={employeeChangeHandler}
                  className="add_field"
                />
                <p className="error_message">{employeeInputError.mobile}</p>
              </div>

              <div>
                <input
                  type="text"
                  placeholder="NID"
                  name="nid_no"
                  value={employee.nid_no || ""}
                  onChange={employeeChangeHandler}
                  className="add_field"
                />
                <p className="error_message">{employeeInputError.nid_no}</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Customer Name..."
                  name="name"
                  value={customer.name}
                  onChange={customerChangeHandler}
                  className="add_field"
                />
                <p className="error_message">{customerInputError.name}</p>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Company Name..."
                  name="company_name"
                  value={customer.company_name}
                  onChange={customerChangeHandler}
                  className="add_field"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Address..."
                  name="address"
                  value={customer.address}
                  onChange={customerChangeHandler}
                  className="add_field"
                />
                <p className="error_message">{customerInputError.address}</p>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Phone Number..."
                  name="mobile"
                  value={customer.mobile}
                  onChange={customerChangeHandler}
                  className="add_field"
                />
                <p className="error_message">{customerInputError.mobile}</p>
              </div>
            </div>
          )}
          <button
            type="submit"
            className="bg-primary mt-6 py-2 px-4 w-full rounded-full text-lg font-semibold xl:text-xl text-background tracking-wider hover:bg-primary/90 cursor-pointer duration-200 hover:bg-secondary-foreground hover:text-primary-foreground text-center group"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center w-full">
                <CgSpinnerTwo className="w-6 h-6 animate-spin text-background group-hover:text-primary-foreground" />
              </div>
            ) : (
              <div>{title}</div>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddFormModal;
