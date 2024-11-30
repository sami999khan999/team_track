"use client";

import { CustomerType, FilterMemoType } from "@/types";
import { getCustoer } from "@/utils/customerApiRerquest";
import { createMemo, getFilterMemo } from "@/utils/memoApiRequests";
import React, { SetStateAction, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoCloseSharp } from "react-icons/io5";
import Dropdown from "./Dropdown";
import MemoFilterTable from "./MemoFilterTable";
import { ErrorToast, SuccessToast } from "./Toast";
import { CgSpinnerTwo } from "react-icons/cg";
import { useRouter } from "next/navigation";

const MemoModal = ({
  setIsOpen,
}: {
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const path = useRouter();
  const [customers, setCustomers] = useState<CustomerType[] | undefined>();
  const [customerCurrentPage, setCustomerCurrentPage] = useState(1);
  const [customerTotalpage, setCustomerTotalPage] = useState<
    number | undefined
  >();
  const [customerActiveId, setCustomerActiveId] = useState<
    number | undefined
  >();
  const [customerSelectionError, setCustomerSelectionError] = useState("");

  const [filteredData, setFilteredData] = useState<
    FilterMemoType[] | undefined
  >();
  const [selectedData, setSelectedData] = useState<
    FilterMemoType[] | undefined
  >();
  const [selectedId, setSelectedId] = useState<number[] | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  const getFilteredDataHandler = async () => {
    try {
      if (!customerActiveId) {
        setCustomerSelectionError("Select a customer to continue");
        return;
      }

      setCustomerSelectionError("");
      setSelectedData(undefined);
      setIsLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      const response = await getFilterMemo(customerActiveId);

      if (response.success) {
        setFilteredData(response.data);
        toast.custom((t) => (
          <SuccessToast visible={t.visible}>Filtered Successfully</SuccessToast>
        ));
      } else {
        console.log("Error fetching Filter Memo:", response.message);
        toast.custom((t) => (
          <ErrorToast visible={t.visible}>{response.message}</ErrorToast>
        ));
      }
    } catch (err) {
      console.log("Error fetching Filter Memo:", err);
      toast.custom((t) => (
        <ErrorToast visible={t.visible}>Failed to fetch data</ErrorToast>
      ));
    } finally {
      setIsLoading(false);
    }
  };

  const createMemoHandler = async () => {
    try {
      if (!selectedId) {
        toast.error("Select at least one memo to create a momo");
        return;
      }

      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const response = await createMemo(selectedId);

      if (response.success) {
        toast.custom((t) => (
          <SuccessToast visible={t.visible}>
            Memo Created Successfully
          </SuccessToast>
        ));
        setSelectedData(undefined);
      } else {
        console.log("Error creating Momo: ", response.message);
        toast.custom((t) => (
          <ErrorToast visible={t.visible}>{response.message}</ErrorToast>
        ));
      }
    } catch (err) {
      console.log("Error creating Momo: ", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await getCustoer(customerCurrentPage);

        if (response.success) {
          const firstElement = response.data.shift();
          const totalPage = firstElement.total_page;

          setCustomers(response.data);
          setCustomerTotalPage(totalPage);
        } else {
          console.error("Error fetching customers:", response.message);
        }
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, [customerCurrentPage]);

  return (
    <div className="absolute top-0 left-0 w-full h-full backdrop-blur-lg flex items-center justify-center z-20">
      <div className="relative bg-secondary w-[95%] xl:w-[90%] h-[80%] border border-border_color rounded-lg py-6 xl:px-8 px-3 overflow-x-auto">
        <div
          className="absolute top-3 xl:top-5 right-3 xl:right-5 text-xl xl:text-3xl text-primary-foreground hover:bg-secondary-foreground xl:p-2 p-1 rounded-md"
          onClick={() => setIsOpen((prv) => !prv)}
        >
          <IoCloseSharp className="transition-transform hover:rotate-90 duration-200 origin-center" />
        </div>
        <div className="flex flex-col gap-2 items-center justify-center text-center border-b border-border_color pb-4">
          <h2 className="text-xl xl:text-3xl font-sour_gummy text-primary font-semibold text-center">
            Generate Cash Momo
          </h2>
          <p className="text-primary-foreground text-lg w-[70%] hidden xl:block">
            Generate professional cash memos instantly to provide customers with
            clear, accurate receipts, ensuring smooth transactions,
            transparency, and a hassle-free checkout experience every time.
          </p>
        </div>

        <div className="flex flex-col xl:flex-row justify-between gap-4 mt-6">
          <div className="left w-full xl:w-[50%] flex flex-col gap-2">
            <div className="w-full flex flex-col xl:flex-row gap-3">
              <div className="w-full">
                <Dropdown
                  data={customers}
                  currentPage={customerCurrentPage}
                  totalPage={customerTotalpage}
                  setCurrentPage={setCustomerCurrentPage}
                  setId={setCustomerActiveId}
                  setSelectionError={setCustomerSelectionError}
                  type="customer"
                />
                <p className="error_message">{customerSelectionError}</p>
              </div>
              <button
                className="submit-btn mt-0 xl:w-[5rem] px-5  h-8 xl:h-12 disabled:cursor-not-allowed"
                onClick={getFilteredDataHandler}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center w-full">
                    <CgSpinnerTwo className="animate-spin text-background group-hover:text-primary-foreground" />
                  </div>
                ) : (
                  <div>Get</div>
                )}
              </button>
            </div>

            {filteredData ? (
              <div>
                <MemoFilterTable
                  data={filteredData}
                  type="selection"
                  setSelectedData={setSelectedData}
                  selectedData={selectedData}
                  setSelectedId={setSelectedId}
                />
              </div>
            ) : (
              <div className="absolute top-[60%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl xl:text-3xl font-semibold text-primary-foreground">
                Select <span className="text-primary">Customer</span> to get
                started
              </div>
            )}
          </div>

          <div className="xl:border-r-4 border-t-4 border-border_color"></div>

          <div className="right xl:w-[50%]">
            {selectedData && selectedData?.length > 0 ? (
              <div>
                <p className="text-xl xl:text-2xl text-primary-foreground font-semibold text-center mb-6">
                  Selected Data
                </p>
                <MemoFilterTable
                  data={selectedData}
                  type="selected"
                  setSelectedData={setSelectedData}
                  selectedData={selectedData}
                />
                <button
                  className="submit-btn"
                  onClick={createMemoHandler}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center w-full">
                      <CgSpinnerTwo className="animate-spin text-background group-hover:text-primary-foreground" />
                    </div>
                  ) : (
                    <div>Create Memo</div>
                  )}
                </button>
              </div>
            ) : (
              filteredData &&
              filteredData?.length > 0 && (
                <div className="text-xl xl:text-3xl text-primary-foreground font-semibold text-center xl:mt-20">
                  No Selected Data
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemoModal;
