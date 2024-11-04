import { EmployeeType } from "@/types";
import React, { useState } from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import Modal from "./Modal";

const Table = ({ employeeData }: { employeeData: EmployeeType[] }) => {
  const [activeEmployeeId, setActiveEmployeeId] = useState<number | null>(null);
  const [modalAction, setModalAction] = useState<"update" | "delete" | null>(
    null
  );

  const handleActionClick = (id: number) => {
    setActiveEmployeeId(activeEmployeeId === id ? null : id);
  };

  const openModal = (action: "update" | "delete", id: number) => {
    setModalAction(action);
    setActiveEmployeeId(id);
  };

  const closeModal = () => {
    setModalAction(null);
    setActiveEmployeeId(null);
  };

  const handleConfirm = () => {
    if (modalAction === "update") {
      console.log(`Updating employee ${activeEmployeeId}`);
      // Add update logic here
    } else if (modalAction === "delete") {
      console.log(`Deleting employee ${activeEmployeeId}`);
      // Add delete logic here
    }
    closeModal();
  };

  const columbs = employeeData?.length > 0 ? Object.keys(employeeData[0]) : [];

  return (
    <div>
      <div className="flex justify-between border px-4 xl:px-6 py-2 xl:py-4 xl:text-lg gap-2 mt-3 text-xs bg-secondary text-secondary-foreground">
        <p className="w-1/12 uppercase">{columbs[0]}</p>
        <p className="flex-1 capitalize">{columbs[1]}</p>
        <p className="flex-1 capitalize">{columbs[2]}</p>
        <p className="flex-1 capitalize">{columbs[3]}</p>
        <p className="flex-1 capitalize">{columbs[4]}</p>
        <p className="">Action</p>
      </div>
      <div>
        {employeeData?.map((employee, i) => (
          <div
            key={i}
            className="flex justify-between border-b px-4 xl:px-6 py-2 xl:py-4 xl:text-lg gap-2 text-xs bg-white text-secondary-foreground relative"
          >
            <div className="w-1/12">{employee.id}</div>
            <div className="flex-1">{employee.name}</div>
            <div className="flex-1">{employee.address}</div>
            <div className="flex-1">{employee.mobile}</div>
            <div className="flex-1">{employee.nid_no}</div>
            <div className="relative">
              <div
                className="bg-secondary px-2 py-1 cursor-pointer"
                onClick={() => handleActionClick(employee.id)}
              >
                <HiDotsHorizontal />
              </div>

              {activeEmployeeId === employee.id && (
                <div className="absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-lg py-2 z-10">
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={() => openModal("update", employee.id)}
                  >
                    Update
                  </button>
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={() => openModal("delete", employee.id)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {modalAction && (
        <Modal
          title={
            modalAction === "update" ? "Update Employee" : "Delete Employee"
          }
          message={
            modalAction === "update"
              ? "Update the details of the employee."
              : "Are you sure you want to delete this employee?"
          }
          confirmText={modalAction === "update" ? "Save" : "Confirm"}
          onConfirm={handleConfirm}
          onCancel={closeModal}
        />
      )}
    </div>
  );
};

export default Table;
