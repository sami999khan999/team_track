"use client";

import React, { useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { IoFilterSharp } from "react-icons/io5";
import { MdOutlineSort } from "react-icons/md";
import AddButton from "./AddButton";
import Table from "./Table";
import { CustomerType, EmployeeType } from "@/types";
import AddFormModal from "./AddFormModal";
import { getCustoer } from "@/utils/customerApiRerquest";

type TableDataType = EmployeeType | CustomerType;

const CustomerTable = () => {
  const [customer, setcustomer] = useState<TableDataType[]>([]);
  const [currentPage, setCurrentPage] = useState(1); // Starting at page 1
  const [totalPage, setTotalPage] = useState<number | undefined>(undefined);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < (totalPage || 0)) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const pageNumber = () => {
    const pages: number[] = [];
    const pagesToShow = 5;
    const start = Math.floor((currentPage - 1) / pagesToShow) * pagesToShow + 1;
    const end = Math.min(start + pagesToShow - 1, totalPage!);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  const columns = customer?.length > 0 ? Object.keys(customer[0]) : [];

  useEffect(() => {
    const fetchCustomer = async () => {
      const response = await getCustoer(currentPage);

      if (response.success && response.data) {
        const firstElememt = response.data.shift();
        const totalPages = firstElememt ? firstElememt.total_page : undefined;

        setcustomer(response.data);
        setTotalPage(totalPages);
      } else {
        console.error(response.message || "Failed to fetch customer");
        setcustomer([]);
        setTotalPage(undefined);
      }
    };

    fetchCustomer();
  }, [currentPage]);

  return (
    <div>
      <div onClick={() => setIsFormOpen((prv) => !prv)}>
        <AddButton text="Add Customer" />
      </div>

      {isFormOpen && (
        <div className="">
          <div onClick={(e) => e.stopPropagation()}>
            <AddFormModal
              title="Add Customer"
              setIsFormOpen={setIsFormOpen}
              action="addCustomer"
              setData={setcustomer}
              data={customer}
              // currentPage={currentPage}
              // setCurrentPage={setCurrentPage}
              closeModal={() => {}}
            />
          </div>
        </div>
      )}

      <div className="w-full h-fit bg-white rounded-t-[1.3rem]">
        <div className="flex flex-col xl:flex-row gap-4 justify-between text-center">
          <div className="text-lg xl:text-2xl font-semibold tracking-wide text-secondary-foreground">
            Cusotmer Table
          </div>
          <div className="flex gap-2 justify-around">
            <input
              type="text"
              placeholder="Search..."
              className="border border-gray-200 w-[50%] xl:w-[20rem] h-10 xl:h-12 rounded-md text-base"
            />
            <div className="flex gap-2">
              <div className="border flex items-center gap-2 px-2 xl:px-6 rounded-md">
                <IoFilterSharp />
                <p>Filter</p>
              </div>
              <div className="border flex items-center gap-2 px-2 xl:px-6 rounded-md">
                <MdOutlineSort />
                <p>Sort</p>
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <Table
          tableData={customer}
          setData={setcustomer}
          columns={columns}
          format="Customer"
        />

        <div className="flex items-center mt-6 xl:gap-4 justify-center mb-16 xl:mb-0">
          <div className="flex items-center justify-center text-sm xl:text-xl gap-5 border xl:px-8 px-3 py-2 rounded w-fit cursor-pointer">
            <button onClick={handlePrevious} disabled={currentPage === 1}>
              <IoIosArrowBack />
            </button>

            <div className=" flex gap-3 items-center">
              <div className=" xl:w-[10rem] flex items-center">
                {pageNumber().map((i) => (
                  <div
                    key={i}
                    className={`px-2 py-1 rounded-sm text-center ${
                      currentPage === i && "bg-primary"
                    }`}
                    onClick={() => setCurrentPage(i)}
                  >
                    {i}
                  </div>
                ))}
              </div>
              <p className="px-4">••••</p>
              <p onClick={() => setCurrentPage(totalPage!)}>{totalPage}</p>
            </div>

            <button onClick={handleNext} disabled={currentPage === totalPage}>
              <IoIosArrowForward />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerTable;
