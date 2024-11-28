"use client";

import { EmployeeType } from "@/types";
import { getEmployee } from "@/utils/employeeApiRequest";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import AddFormModal from "./AddFormModal";
import Pagination from "./Pagination";
import Table from "./Table";
import TableActions from "./TableActions";

const EmployeeTable = () => {
  const param = useSearchParams();
  const path = useRouter();
  const [employees, setEmployees] = useState<EmployeeType[]>([]);
  const [currentPage, setCurrentPage] = useState(
    Number(param.get("page")) || 1
  );
  const [totalPage, setTotalPage] = useState<number | undefined>(undefined);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [reload, setReload] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const columns = employees?.length > 0 ? Object.keys(employees[0]) : [];

  useEffect(() => {
    const fetchEmployees = async () => {
      setIsLoading(true);

      try {
        const response = await getEmployee(currentPage);

        await new Promise((resolve) => setTimeout(resolve, 250));

        if (response.success) {
          const firstElememt = response.data.shift();
          const totalPages = firstElememt ? firstElememt.total_page : undefined;

          setEmployees(response.data);
          setTotalPage(totalPages);
        } else {
          console.error(response.message || "Failed to fetch employees");
          setEmployees([]);
          setTotalPage(undefined);
        }
      } catch (err) {
        console.error("Unexpected Error Fetching Employyees: ", err);
        setEmployees([]);
        setTotalPage(undefined);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmployees();
  }, [currentPage, reload]);

  useEffect(() => {
    path.push(`?page=${currentPage}`);
  }, [currentPage, path]);

  return (
    <div className="">
      {isFormOpen && (
        <div className="">
          <div onClick={(e) => e.stopPropagation()}>
            <AddFormModal
              title="Add Employee"
              setIsFormOpen={setIsFormOpen}
              action="addEmployee"
              closeModal={() => {}}
              setReload={setReload}
            />
          </div>
        </div>
      )}

      <div className="w-full h-fit bg-secondary shadow-2xl shadow-[#19253859] px-2 py-6 xl:py-8 xl:px-8 rounded-xl">
        <TableActions setIsOpen={setIsFormOpen} tableName="Employee" />

        {/* Loading State */}
        {isLoading && (
          <div className="text-primary-foreground tracking-wide text-xl xl:text-4xl text-center font-semibold flex items-center justify-center">
            Loading...
          </div>
        )}

        {/* No Data State */}
        {!isLoading && employees.length === 0 && (
          <div className="text-primary-foreground tracking-wide text-xl xl:text-3xl text-center font-semibold xl:my-[6rem] my-[2rem] flex w-full items-center justify-center">
            <div className="w-fit px-6 py-2 rounded-lg cursor-pointer">
              There are no employees available
            </div>
          </div>
        )}

        {/* Table */}
        {!isLoading && employees.length > 0 && (
          <Table
            tableData={employees}
            columns={columns}
            format="Employee"
            setReload={setReload}
          />
        )}

        <Pagination
          totalPage={totalPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default EmployeeTable;
