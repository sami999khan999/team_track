"use client";

import React, { SetStateAction, useEffect, useState } from "react";
import Dropdown from "./Dropdown";
import { CustomerType, InvoiceType } from "@/types";
import { getCustoer } from "@/utils/customerApiRerquest";
import { IoCloseSharp } from "react-icons/io5";
import MemoFilterTable from "./MemoFilterTable";

const MemoModal = ({
  setIsOpen,
}: {
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const [customers, setCustomers] = useState<CustomerType[] | undefined>();
  const [customerCurrentPage, setCustomerCurrentPage] = useState(1);
  const [customerTotalpage, setCustomerTotalPage] = useState<
    number | undefined
  >();
  const [customerActiveId, setCustomerActiveId] = useState<
    number | undefined
  >();
  const [customerSelectionError, setCustomerSelectionError] = useState("");

  const [filteredData, setFilteredData] = useState<InvoiceType[] | undefined>();

  useEffect(() => {
    const fetchEmployees = async () => {
      const response = await getCustoer(customerCurrentPage);

      if (response.success) {
        const firstElement = response.data.shift();
        const totalPage = firstElement.total_page;

        setCustomers(response.data);
        setCustomerTotalPage(totalPage);
      }
    };

    fetchEmployees();
  }, [customerCurrentPage]);

  return (
    <div className="absolute top-0 left-0 w-full h-full backdrop-blur-lg flex items-center justify-center z-20">
      <div className="relative bg-secondary w-[95%] xl:w-[80%] h-[80%] border border-border_color rounded-lg py-6 px-8">
        <div
          className="absolute top-3 xl:top-5 right-3 xl:right-5 text-2xl text-primary-foreground hover:bg-primary hover:text-background p-1 rounded-sm"
          onClick={() => setIsOpen((prv) => !prv)}
        >
          <IoCloseSharp className="transition-transform hover:rotate-90 duration-200 origin-center" />
        </div>
        <div className="flex flex-col gap-2 items-center justify-center text-center border-b border-border_color pb-4">
          <h2 className="text-xl xl:text-3xl font-sour_gummy text-primary font-semibold text-center">
            Create Cash Momo
          </h2>
          <p className="text-primary-foreground text-lg w-[60%] hidden xl:block">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae
            minima impedit aliquid.
          </p>
        </div>

        <div className="flex flex-col xl:flex-row justify-between gap-4 mt-6">
          <div className="left w-full xl:w-[50%] flex flex-col gap-2">
            <div className="w-full flex flex-col xl:flex-row gap-3">
              <Dropdown
                data={customers}
                currentPage={customerCurrentPage}
                totalPage={customerTotalpage}
                setCurrentPage={setCustomerCurrentPage}
                setId={setCustomerActiveId}
                setSelectionError={setCustomerSelectionError}
                type="customer"
              />
              <div className="px-8 py-1 bg-primary text-background flex items-center text-xl font-semibold rounded-full justify-center">
                <button>Get</button>
              </div>
            </div>

            {filteredData ? (
              <div>
                <MemoFilterTable />
              </div>
            ) : (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl font-semibold text-primary-foreground">
                Select <span className="text-primary">Customer</span> to get
                started
              </div>
            )}
          </div>

          <div className="xl:border-r-4 border-t-4 border-border_color"></div>

          <div className="right w-[50%]"></div>
        </div>
      </div>
    </div>
  );
};

export default MemoModal;
