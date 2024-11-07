import { CustomerType, EmployeeType } from "@/types";
import React, { useState } from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import DeleteModal from "./DeleteModal";
import AddFormModal from "./AddFormModal";

type TableDataType = EmployeeType | CustomerType;

const Table = ({
  tableData,
  setData,
  columns,
  format,
  setReload,
}: {
  tableData: EmployeeType[] | CustomerType[];
  setData: React.Dispatch<React.SetStateAction<TableDataType[]>>;
  columns: string[];
  format: string;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [activeId, setActiveId] = useState<number | null>(null);
  const [modalAction, setModalAction] = useState<"update" | "delete" | null>(
    null
  );

  const handleActionClick = (id: number) => {
    setActiveId(activeId === id ? null : id);
  };

  const openModal = (action: "update" | "delete", id: number) => {
    setModalAction(action);
    setActiveId(id);
  };

  const closeModal = () => {
    setModalAction(null);
    setActiveId(null);
  };

  return (
    <div>
      <div className="flex justify-between border px-4 xl:px-6 py-2 xl:py-4 xl:text-lg gap-2 mt-3 text-xs bg-secondary text-secondary-foreground">
        {columns.map((col, i) => {
          return (
            <p
              key={i}
              className={`${
                i === 0 ? "w-1/12 uppercase" : "flex-1 capitalize "
              }`}
            >
              {col}
            </p>
          );
        })}
        <p className="">Action</p>
      </div>
      <div>
        {tableData?.map((data, i) => (
          <div
            key={i}
            className="flex justify-between border-b px-4 xl:px-6 py-2 xl:py-4 xl:text-lg gap-2 text-xs bg-white text-secondary-foreground relative"
          >
            {format === "Employee" ? (
              <>
                <div className="w-1/12">{(data as EmployeeType).id}</div>
                <div className="flex-1 ">{(data as EmployeeType).name}</div>
                <div className="flex-1 truncate-text">
                  {(data as EmployeeType).address}
                </div>
                <div className="flex-1 truncate-text">
                  {(data as EmployeeType).mobile}
                </div>
                <div className="flex-1 truncate-text">
                  {(data as EmployeeType).nid_no}
                </div>
              </>
            ) : (
              <>
                <div className="w-1/12">{(data as CustomerType).id}</div>
                <div className="flex-1 truncate-text">
                  {(data as CustomerType).name}
                </div>
                <div className="flex-1 truncate-text">
                  {(data as CustomerType).company_name}
                </div>
                <div className="flex-1 truncate-text">
                  {(data as CustomerType).address}
                </div>
                <div className="flex-1 truncate-text">
                  {(data as CustomerType).mobile}
                </div>
              </>
            )}

            <div className="relative">
              <div
                className="bg-secondary px-2 py-1 cursor-pointer"
                onClick={() => handleActionClick(data.id)}
              >
                <HiDotsHorizontal />
              </div>

              {activeId === data.id && (
                <div className="absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-lg py-2 z-10">
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={() => openModal("update", data.id)}
                  >
                    Update
                  </button>
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={() => openModal("delete", data.id)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {modalAction === "delete" && (
        <DeleteModal
          activeElement={
            activeId != null
              ? tableData.find((emp) => emp.id === activeId)
              : undefined
          }
          setData={setData}
          closeModal={closeModal}
          setReload={setReload}
        />
      )}
      {modalAction === "update" && (
        <AddFormModal
          title="Update Employyee"
          closeModal={closeModal}
          // setData={setData}
          action={`update${format}`}
          // data={tableData}
          currentData={
            activeId != null
              ? tableData.find((emp) => emp.id === activeId)
              : undefined
          }
          setReload={setReload}
        />
      )}
    </div>
  );
};

export default Table;
