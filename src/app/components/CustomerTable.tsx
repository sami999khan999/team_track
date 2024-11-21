"use client";

import { CustomerType, EmployeeType } from "@/types";
import { getCustoer } from "@/utils/customerApiRerquest";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import AddFormModal from "./AddFormModal";
import Pagination from "./Pagination";
import Table from "./Table";
import TableActions from "./TableActions";

type TableDataType = EmployeeType | CustomerType;

const CustomerTable = () => {
  const param = useSearchParams();
  // const path = useRouter();
  const [customer, setcustomer] = useState<TableDataType[]>([]);
  const [currentPage, setCurrentPage] = useState(
    Number(param.get("page")) || 1
  );
  const [totalPage, setTotalPage] = useState<number | undefined>(undefined);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [reload, setReload] = useState(true);

  // const pageNumber = () => {
  //   const pages: number[] = [];
  //   const pagesToShow = 5;
  //   const start = Math.floor((currentPage - 1) / pagesToShow) * pagesToShow + 1;
  //   const end = Math.min(start + pagesToShow - 1, totalPage!);

  //   for (let i = start; i <= end; i++) {
  //     pages.push(i);
  //   }

  //   return pages;
  // };

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
  }, [currentPage, reload]);

  // useEffect(() => {
  //   path.push(`?page=${currentPage}`);
  // }, [currentPage, path]);

  return (
    <div>
      {/* <div onClick={() => setIsFormOpen((prv) => !prv)}>
        <AddButton text="Add Customer" />
      </div> */}

      {isFormOpen && (
        <div className="">
          <div onClick={(e) => e.stopPropagation()}>
            <AddFormModal
              title="Add Customer"
              setIsFormOpen={setIsFormOpen}
              action="addCustomer"
              // setData={setcustomer}
              // data={customer}
              // currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              closeModal={() => {}}
              setReload={setReload}
            />
          </div>
        </div>
      )}

      <div className="w-full h-fit bg-secondary shadow-2xl shadow-[#19253859] px-2 py-6 xl:py-8 xl:px-8 rounded-xl">
        <TableActions setIsOpen={setIsFormOpen} tableName="Customer" />

        {/* Table */}
        <Table
          tableData={customer}
          columns={columns}
          format="Customer"
          setReload={setReload}
        />

        <Pagination
          totalPage={totalPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default CustomerTable;
