"use client";

import { CustomerType, EmployeeType } from "@/types";
import { deleteCustomer } from "@/utils/customerApiRerquest";
import { deleteEmployee } from "@/utils/employeeApiRequest";
import { usePathname } from "next/navigation";
import React from "react";

type TableDataType = EmployeeType | CustomerType;

const DeleteModal = ({
  activeElement,
  closeModal,
  setData,
}: {
  activeElement: TableDataType | undefined;
  closeModal: () => void;
  setData: React.Dispatch<React.SetStateAction<TableDataType[]>>;
}) => {
  const path = usePathname();
  console.log(path);

  const deleteHandler = async () => {
    const element = activeElement?.id;

    if (path === "/employees") {
      const response = await deleteEmployee(element);

      if (response.success) {
        closeModal();
        setData((prv) => prv.filter((emp) => emp.id !== element));
      }
    }

    if (path === "/customers") {
      const response = await deleteCustomer(element);
      console.log(response);
      console.log(element);

      if (response.success) {
        closeModal();
        setData((prv) => prv.filter((emp) => emp.id !== element));
      }
    }
  };

  return (
    <div
      className="flex items-center justify-center absolute bg-gray-400/30 top-0 left-0  z-50 w-full h-full backdrop-blur-md"
      onClick={closeModal}
    >
      <div
        className="bg-gray-100 rounded py-5 px-3 xl:px-5 w-[90%] xl:w-[30%]"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-center font-semibold xl:text-2xl text-gray-800 mb-3">
          Delete Employee
        </h2>

        <p className="text-xs xl:text-lg">
          Would you like to delete{" "}
          <span className="text-primary font-semibold ">
            {`{ id: ${activeElement?.id} | Name: ${activeElement?.name} }`}
          </span>
          this employee?
        </p>
        <div className="flex justify-end gap-2 xl:gap-3 mt-2 xl:mt-4">
          <button
            className="bg-slate-200 xl:text-lg text-sm px-4 xl:px-6 xl:py-1 py-1 rounded-sm"
            onClick={closeModal}
          >
            Cancle
          </button>
          <button
            className="bg-primary text-gray-100 xl:text-lg text-sm px-4 xl:px-6 xl:py-1 py-1 rounded-sm"
            onClick={deleteHandler}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
