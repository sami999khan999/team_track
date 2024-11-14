"use client";

import React, { useState } from "react";
import TableActions from "./TableActions";
import Pagination from "./Pagination";
import InvoiceModal from "./InvoiceModal";

const InvoiceTable = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [action, setAction] = useState<
    "create" | "update" | "delete" | undefined
  >();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState<number | undefined>(1);

  return (
    <div>
      {isOpen && <InvoiceModal setIsOpen={setIsOpen} />}
      <div className="w-full h-fit bg-secondary shadow-2xl shadow-[#19253859] px-2 py-6 xl:py-8 xl:px-8 rounded-xl">
        <TableActions
          tableName="Inventory"
          setIsOpen={setIsOpen}
          setModalAction={setAction}
        />
        <div>
          {/* <div className="flex text-primary-foreground justify-between px-4 xl:px-6 py-2 xl:py-4 xl:text-lg text-xs gap-2 mt-3 bg-background font-semibold tracking-wide uppercase">
            {columns.map((col, i) => (
              <div
                key={i}
                className={`text-primary-foreground uppercase truncate-text ${
                  i === 0 ? "w-1/12" : "flex-1"
                }`}
              >
                {col}
              </div>
            ))}
            <div>ACTIONS</div>
          </div> */}
          {/* <div>
            {inventory.map((item, i) => (
              <div
                key={i}
                className="flex text-primary-foreground justify-between border-b border-secondary-foreground px-4 xl:px-6 py-2 xl:py-4 xl:text-lg gap-2 relative hover:bg-secondary-foreground duration-200 font-medium"
              >
                <div className="w-1/12 truncate-text">{item.id}</div>
                <div className="flex-1 truncate-text">{item.product.name}</div>
                <div className="flex-1 truncate-text">{item.employee.name}</div>
                <div className="flex-1 truncate-text">{item.production}</div>
                <div className="flex-1 truncate-text">{item.quantity}</div>
                <div className="flex-1 truncate-text">{item.status}</div>
                <div className="flex-1 truncate-text">{item.date}</div>

                <div className="flex xl:px-5 items-center gap-3 text-primary-foreground">
                  <div
                    className="hover:bg-primary p-1 rounded-md hover:text-gray-200 duration-200"
                    onClick={() => {
                      setDefaultValue(item);
                      setIsOpen(true);
                      setAction("update");
                    }}
                  >
                    <MdOutlineEdit />
                  </div>
                  <div
                    className="hover:bg-primary p-1 rounded-md hover:text-gray-200 duration-200"
                    onClick={() => {
                      setDefaultValue(item);
                      setIsOpen(true);
                      setAction("delete");
                    }}
                  >
                    <RiDeleteBin6Line />
                  </div>
                </div>
              </div>
            ))}
          </div> */}
        </div>
        <Pagination
          totalPage={totalPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default InvoiceTable;
