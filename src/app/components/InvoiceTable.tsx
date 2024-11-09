"use client";

import { EmployeeType } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { IoFilterSharp } from "react-icons/io5";
import { MdOutlineSort } from "react-icons/md";
import CreateInvoice from "./CreateInvoice";
import Pagination from "./Pagination";

const invoices = [
  {
    id: 1,
    customer_id: 101,
    produced_goods: [
      { employee_id: 1, Quantity: "20+2" },
      { employee_id: 2, Quantity: "15+3" },
    ],
    grand_total: 2500,
    created_at: "2024-01-15T10:30:00Z",
  },
  {
    id: 2,
    customer_id: 102,
    produced_goods: [
      { employee_id: 3, Quantity: "30+5" },
      { employee_id: 4, Quantity: "10+1" },
    ],
    grand_total: 5300,
    created_at: "2024-01-20T14:15:00Z",
  },
  {
    id: 3,
    customer_id: 103,
    produced_goods: [{ employee_id: 5, Quantity: "12+2" }],
    grand_total: 1200,
    created_at: "2024-02-02T09:45:00Z",
  },
  {
    id: 4,
    customer_id: 104,
    produced_goods: [
      { employee_id: 6, Quantity: "25+5" },
      { employee_id: 7, Quantity: "40+8" },
    ],
    grand_total: 3000,
    created_at: "2024-02-10T16:00:00Z",
  },
  {
    id: 5,
    customer_id: 105,
    produced_goods: [
      { employee_id: 8, Quantity: "18+4" },
      { employee_id: 9, Quantity: "22+3" },
    ],
    grand_total: 4100,
    created_at: "2024-03-05T12:00:00Z",
  },
];

const InvoiceTable = () => {
  const param = useSearchParams();
  const path = useRouter();
  const [employees, setEmployees] = useState<EmployeeType[]>([]);
  const [currentPage, setCurrentPage] = useState(
    Number(param.get("page")) || 1
  );
  const [totalPage, setTotalPage] = useState<number | undefined>(10);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [reload, setReload] = useState(true);

  console.log(reload);

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

  const columns = invoices?.length > 0 ? Object.keys(invoices[0]) : [];

  // useEffect(() => {
  //   const fetchEmployees = async () => {
  //     const response = await getEmployee(currentPage);

  //     if (response.success && response.data) {
  //       const firstElememt = response.data.shift();
  //       const totalPages = firstElememt ? firstElememt.total_page : undefined;

  //       setEmployees(response.data);
  //       setTotalPage(totalPages);
  //     } else {
  //       console.error(response.message || "Failed to fetch employees");
  //       setEmployees([]);
  //       setTotalPage(undefined);
  //     }
  //   };

  //   fetchEmployees();
  // }, [currentPage, reload]);

  useEffect(() => {
    path.push(`?page=${currentPage}`);
  }, [currentPage]);

  return (
    <div className="">
      <div onClick={() => setIsFormOpen((prv) => !prv)}>
        {/* <AddButton text="Add Employee" /> */}
      </div>

      {isFormOpen && (
        <div className="">
          <div onClick={(e) => e.stopPropagation()}>
            <CreateInvoice />
          </div>
        </div>
      )}

      <div className="w-full h-fit bg-white px-2 py-6 xl:py-12 xl:px-8 rounded-[1.3rem]">
        <div className="flex flex-col xl:flex-row gap-4 justify-between text-center">
          <div className="text-lg xl:text-2xl font-semibold tracking-wide text-secondary-foreground">
            Employee Table
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
        <div className="">
          <div className="flex justify-between border px-4 xl:px-6 py-2 xl:py-4 xl:text-lg gap-2 mt-3 text-xs bg-secondary text-secondary-foreground">
            <div className="w-1/6">ID</div>
            <div className="flex-1">Customer ID</div>
            <div className="flex-1">Grand Total</div>
            <div className="flex-1">Created At</div>
          </div>
          {invoices.map((invoice, i) => (
            <div
              className="flex justify-between border-b px-4 xl:px-6 py-2 xl:py-4 xl:text-lg gap-2 text-xs bg-white text-secondary-foreground cursor-pointer hover:bg-gray-50 duration-200"
              onClick={() => path.push(`/invoice/${invoice.id}`)}
            >
              <div className="w-1/6">{invoice.id}</div>
              <div className="flex-1">{invoice.customer_id}</div>
              <div className="flex-1">{invoice.grand_total}</div>
              <div className="flex-1">{invoice.created_at}</div>
            </div>
          ))}
        </div>

        <Pagination
          handleNext={handleNext}
          handlePrevious={handlePrevious}
          totalPage={totalPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default InvoiceTable;
