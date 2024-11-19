"use client";

import { EmployeeType, FilteredBill } from "@/types";
import React, { SetStateAction, useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import Dropdown from "./Dropdown";
import { getEmployee } from "@/utils/employeeApiRequest";
import BillInvoiceModal from "./BillInvoiceModal";
import {
  createBill,
  getFilteredEmployeeBillData,
} from "@/utils/employeeBillApiRequests";
import BillFilterTable from "./BillFilterTable";

const PaymentModal = ({
  setIsopen,
}: {
  setIsopen: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const [filterEmployeeId, setFilterEmployeeId] = useState<
    number | undefined
  >();
  const [fliterInoviceId, setFliterInoviceId] = useState<
    number[] | undefined
  >();
  const [filterMethod, setfilterMethod] = useState<string | undefined>();
  const [employees, setEmployees] = useState<EmployeeType[]>();
  const [employeeCurrentPage, setEmployeeCurrentPage] = useState(1);
  const [employeeTotalPage, setEmployeeTotalpage] = useState<
    number | undefined
  >();
  const [methodCurrentPage, setMethodCurrentPage] = useState(1);

  const [employeeSelectionError, setEmployeeSelectionError] = useState("");
  const [methodSelectionError, setMethodSelectionError] = useState("");
  const [filteredData, setFilteredData] = useState<
    FilteredBill[] | undefined
  >();
  const [selectedData, setSelectedData] = useState<
    FilteredBill[] | undefined
  >();
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);

  const methodData = [
    {
      method: "challan",
    },
    {
      method: "production",
    },
  ];

  const filterHandler = async () => {
    const newError = {
      method: "",
      employeeId: "",
      invoiceId: "",
    };

    if (filterMethod === undefined) {
      newError.method = "Please select a method";
    }

    if (filterEmployeeId === undefined) {
      newError.employeeId = "Please select an employee";
    }

    if (
      filterMethod === "challan" &&
      (fliterInoviceId?.length === 0 || fliterInoviceId === undefined)
    ) {
      newError.invoiceId = "Select Invoice to continye";
    }

    if (newError.employeeId || newError.method || newError.invoiceId) {
      if (newError.employeeId) {
        setEmployeeSelectionError(newError.employeeId);
      }
      if (newError.method) {
        setMethodSelectionError(newError.method);
      }
      if (newError.invoiceId) {
        setMethodSelectionError(newError.invoiceId);
      }
      return;
    }

    const filterParameters = {
      employee: filterEmployeeId,
      challan: filterMethod === "challan" ? fliterInoviceId : "",
      filter_method: filterMethod,
    };

    const response = await getFilteredEmployeeBillData(filterParameters);

    if (response?.success) {
      setFilteredData(response.data);
      console.log(filteredData);
    }
  };

  const billCreateHandler = async () => {
    const response = await createBill(selectedData);

    if (response.success) {
      setIsopen(false);
      console.log(response);
    }
  };

  useEffect(() => {
    const fetchEmployees = async () => {
      const response = await getEmployee(employeeCurrentPage);

      if (response.success) {
        const firstElement = response.data.shift();
        const totalPage = firstElement.total_page;

        setEmployeeTotalpage(totalPage);
        setEmployees(response.data);
      }
    };

    fetchEmployees();
  }, [employeeCurrentPage]);

  return (
    <div>
      {isInvoiceModalOpen && (
        <BillInvoiceModal
          setInoviceId={setFliterInoviceId}
          invoiceId={fliterInoviceId}
          setIsInvoiceModalOpen={setIsInvoiceModalOpen}
        />
      )}
      <div className="absolute top-0 left-0 w-full h-full backdrop-blur-lg flex items-center justify-center">
        <div className="relative w-[97%] xl:w-[90%] h-[80%] xl:h-[35rem] bg-secondary px-3 xl:px-8 py-6 xl:py-10 rounded-xl border border-border_color overflow-y-auto remove-scrollbar">
          <div
            className="absolute top-3 xl:top-5 right-3 xl:right-5 text-2xl text-primary-foreground hover:bg-primary hover:text-background p-1 rounded-sm"
            onClick={() => setIsopen((prv) => !prv)}
          >
            <IoCloseSharp className="transition-transform hover:rotate-90 duration-200 origin-center" />
          </div>
          <div className="flex flex-col gap-2 items-center justify-center text-center border-b border-border_color pb-4">
            <h2 className="text-xl xl:text-3xl font-sour_gummy text-primary font-semibold text-center">
              Employee Payment
            </h2>
            <p className="text-primary-foreground text-lg w-[60%] hidden xl:block">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Recusandae minima impedit aliquid.
            </p>
          </div>

          <div className="flex flex-col xl:flex-row gap-4 mt-6">
            <div className="left xl:w-[50%] flex flex-col gap-3">
              <div className="w-full flex flex-col gap-3 xl:flex-row">
                <div className="xl:w-[70%] ">
                  <Dropdown
                    data={methodData}
                    currentPage={methodCurrentPage}
                    setCurrentPage={setMethodCurrentPage}
                    setValue={setfilterMethod}
                    setSelectionError={setMethodSelectionError}
                    type="Method"
                  />
                  {filterMethod === "challan" && (
                    <div>
                      <button
                        className="w-full border border-border_color rounded-full mt-2 text-primary-foreground font-semibold text-lg hover:bg-primary hover:text-background duration-200"
                        onClick={() => {
                          setIsInvoiceModalOpen(true);
                          setMethodSelectionError("");
                        }}
                      >
                        Get Invoice
                      </button>
                    </div>
                  )}
                  <p className="error_message">{methodSelectionError}</p>
                </div>

                <div className="w-full">
                  <Dropdown
                    data={employees}
                    totalPage={employeeTotalPage}
                    currentPage={employeeCurrentPage}
                    setCurrentPage={setEmployeeCurrentPage}
                    setId={setFilterEmployeeId}
                    setSelectionError={setEmployeeSelectionError}
                    type="employee"
                  />
                  <p className="error_message">{employeeSelectionError}</p>
                </div>
                <div className="">
                  <button
                    className="bg-primary w-full xl:w-fit text-background rounded-full px-5 text-xl font-semibold py-1 xl:py-2"
                    onClick={filterHandler}
                  >
                    Get
                  </button>
                </div>
              </div>

              {filteredData?.length === 0 ||
                (filteredData === undefined && (
                  <div className="hidden xl:block absolute top-[50%] left-[35%] text-primary-foreground font-bold text-2xl">
                    <p>
                      Select{" "}
                      <span className="text-primary">Payment Method</span> and{" "}
                      <span className="text-primary">Employee</span> to get
                      started
                    </p>
                  </div>
                ))}

              <BillFilterTable
                data={filteredData}
                method={filterMethod}
                setSelectedData={setSelectedData}
                selectedData={selectedData}
                type="select"
              />
            </div>
            <div className="border border-border_color"></div>
            <div className="right xl:w-[50%] mb-4">
              {selectedData && selectedData?.length > 0 && (
                <div>
                  <div className="text-primary-foreground font-bold text-xl xl:text-2xl text-center ">
                    Selected Data
                  </div>
                  <BillFilterTable data={selectedData} method={filterMethod} />
                  <div
                    className="bg-primary rounded-full text-xl font-semibold text-center py-1 mt-6"
                    onClick={billCreateHandler}
                  >
                    <button>Create Payment</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
