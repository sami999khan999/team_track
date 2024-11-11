import { CustomerType, EmployeeType } from "@/types";
import React, { useState } from "react";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import AddFormModal from "./AddFormModal";
import DeleteModal from "./DeleteModal";

type TableDataType = EmployeeType | CustomerType;

const Table = ({
  tableData,
  columns,
  format,
  setReload,
}: {
  tableData: EmployeeType[] | CustomerType[];
  columns: string[];
  format: string;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [activeId, setActiveId] = useState<number | null>(null);
  const [modalAction, setModalAction] = useState<"update" | "delete" | null>(
    null
  );

  // const handleActionClick = (id: number) => {
  //   setActiveId(activeId === id ? null : id);
  // };

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
      <div className="flex text-primary-foreground justify-between px-4 xl:px-6 py-2 xl:py-4 xl:text-lg text-xs gap-2 mt-3 bg-background font-semibold tracking-wide uppercase">
        {columns.map((col, i) => {
          return (
            <p
              key={i}
              className={`${
                i === 0 ? "w-1/12 " : "flex-1 "
              } cursor-pointer truncate-text`}
            >
              {col}
            </p>
          );
        })}
        <p className="cursor-pointer">Action</p>
      </div>
      <div>
        {tableData?.map((data, i) => (
          <div
            key={i}
            className="flex text-primary-foreground justify-between border-b border-secondary-foreground px-4 xl:px-6 py-2 xl:py-4 xl:text-lg gap-2 relative hover:bg-secondary-foreground duration-200 font-medium"
          >
            {format === "Employee" ? (
              <>
                <div className="w-1/12 text-xs xl:text-xl">
                  {(data as EmployeeType).id}
                </div>
                <div className="flex-1 truncate-text text-xs xl:text-xl">
                  {(data as EmployeeType).name}
                </div>
                <div className="flex-1 truncate-text text-xs xl:text-xl">
                  {(data as EmployeeType).address}
                </div>
                <div className="flex-1 truncate-text text-xs xl:text-xl">
                  {(data as EmployeeType).nid_no}
                </div>
                <div className="flex-1 truncate-text text-xs xl:text-xl">
                  {(data as EmployeeType).mobile}
                </div>
              </>
            ) : (
              <>
                <div className="w-1/12 text-xs xl:text-xl">
                  {(data as CustomerType).id}
                </div>
                <div className="flex-1 truncate-text text-xs xl:text-xl">
                  {(data as CustomerType).name}
                </div>
                <div className="flex-1 truncate-text text-xs xl:text-xl">
                  {(data as CustomerType).company_name}
                </div>
                <div className="flex-1 truncate-text text-xs xl:text-xl">
                  {(data as CustomerType).address}
                </div>
                <div className="flex-1 truncate-text text-xs xl:text-xl">
                  {(data as CustomerType).mobile}
                </div>
              </>
            )}

            <div className="flex items-center gap-2 text-primary-foreground">
              <div
                className="hover:bg-primary p-1 rounded-md hover:text-gray-200 duration-200"
                onClick={() => {
                  setActiveId(data.id);
                  setModalAction("update");
                }}
              >
                <MdOutlineEdit />
              </div>
              <div
                className="hover:bg-primary p-1 rounded-md hover:text-gray-200 duration-200"
                onClick={() => {
                  setActiveId(data.id);
                  setModalAction("delete");
                }}
              >
                <RiDeleteBin6Line />
              </div>
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
          closeModal={closeModal}
          setReload={setReload}
        />
      )}
      {modalAction === "update" && (
        <AddFormModal
          title="Update Employee"
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
