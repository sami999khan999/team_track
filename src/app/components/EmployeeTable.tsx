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
  const [modalAction, setModalAction] = useState<
    "create" | "update" | "delete" | undefined
  >();

  // console.log(reload);

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

  const columns = employees?.length > 0 ? Object.keys(employees[0]) : [];

  useEffect(() => {
    const fetchEmployees = async () => {
      const response = await getEmployee(currentPage);

      if (response.success) {
        const firstElememt = response.data.shift();
        const totalPages = firstElememt ? firstElememt.total_page : undefined;

        setEmployees(response.data);
        setTotalPage(totalPages);
      } else {
        console.log(response.message || "Failed to fetch employees");
        setEmployees([]);
        setTotalPage(undefined);
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
              // setData={setEmployees}
              // data={employees}
              // currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              closeModal={() => {}}
              setReload={setReload}
            />
          </div>
        </div>
      )}

      <div className="w-full h-fit bg-secondary shadow-2xl shadow-[#19253859] px-2 py-6 xl:py-8 xl:px-8 rounded-xl">
        <TableActions
          setIsOpen={setIsFormOpen}
          tableName="Employee"
          setModalAction={setModalAction}
        />

        {/* Table */}
        <Table
          tableData={employees}
          columns={columns}
          format="Employee"
          setReload={setReload}
        />

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

export default EmployeeTable;
