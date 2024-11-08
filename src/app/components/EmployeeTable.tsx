"use client";

import React, { useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { IoFilterSharp } from "react-icons/io5";
import { MdOutlineSort } from "react-icons/md";
import AddButton from "./AddButton";
import Table from "./Table";
import { getEmployee } from "@/utils/employeeApiRequest";
import { EmployeeType } from "@/types";
import AddFormModal from "./AddFormModal";
import { useRouter, useSearchParams } from "next/navigation";
import Pagination from "./Pagination";
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

  const columns = employees?.length > 0 ? Object.keys(employees[0]) : [];

  useEffect(() => {
    const fetchEmployees = async () => {
      const response = await getEmployee(currentPage);

      if (response.success && response.data) {
        const firstElememt = response.data.shift();
        const totalPages = firstElememt ? firstElememt.total_page : undefined;

        setEmployees(response.data);
        setTotalPage(totalPages);
      } else {
        console.error(response.message || "Failed to fetch employees");
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

      <div className="w-full h-fit bg-white px-2 py-6 xl:py-8 xl:px-8 rounded-[1.3rem] border">
        {/* <div>
          <div onClick={() => setIsFormOpen((prv) => !prv)}>
            <AddButton text="Add Employee" />
          </div>
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
        </div> */}

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

        {/* <div className="flex items-center mt-6 xl:gap-4 justify-center mb-16 xl:mb-0">
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
                      currentPage === i && "bg-primary text-secondary"
                    }`}
                    onClick={() =>
                      setCurrentPage(() => {
                        path.push(`?page=${i}`);
                        return i;
                      })
                    }
                  >
                    {i}
                  </div>
                ))}
              </div>
              <p className="px-4">•••</p>
              <p
                onClick={() =>
                  setCurrentPage(() => {
                    path.push(`?page=${totalPage}`);
                    return totalPage!;
                  })
                }
              >
                {totalPage}
              </p>
            </div>

            <button onClick={handleNext} disabled={currentPage === totalPage}>
              <IoIosArrowForward />
            </button>
          </div>
        </div> */}
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
