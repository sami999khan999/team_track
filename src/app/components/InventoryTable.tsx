"use client";

import React, { useEffect, useState } from "react";
import TableActions from "./TableActions";
import Pagination from "./Pagination";
import InventoryModal from "./InventoryModal";
import { InventoryType } from "@/types";
import { getInventory } from "@/utils/inventoryApiRequests";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";

const InventoryTable = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [totabPage, setTotalPage] = useState<number | undefined>(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [action, setAction] = useState<
    "create" | "update" | "delete" | undefined
  >();
  const [defaultValue, setDefaultValue] = useState<InventoryType | undefined>();
  const [reload, setReload] = useState(false);
  const [inventory, setInventory] = useState<InventoryType[]>([]);

  const columns = inventory?.length > 0 ? Object.keys(inventory[0]) : [];

  useEffect(() => {
    const fetchEnventory = async () => {
      const response = await getInventory(currentPage);

      if (response.success) {
        const firstElement = response.data.shift();
        const totalPages = firstElement.total_page;

        setTotalPage(totalPages);
        setInventory(response.data);
      }
    };
    fetchEnventory();
  }, [currentPage, reload]);

  return (
    <div>
      {isOpen && (
        <InventoryModal
          setIsOpen={setIsOpen}
          defaultValue={defaultValue}
          setDefalutValue={setDefaultValue}
          action={action}
          setReload={setReload}
        />
      )}
      <div className="w-full h-fit bg-secondary shadow-2xl shadow-[#19253859] px-2 py-6 xl:py-8 xl:px-8 rounded-xl">
        <TableActions
          tableName="Inventory"
          setIsOpen={setIsOpen}
          setModalAction={setAction}
        />
        <div>
          <div className="flex text-primary-foreground justify-between px-4 xl:px-6 py-2 xl:py-4 xl:text-lg text-xs gap-2 mt-3 bg-background font-semibold tracking-wide uppercase">
            {columns.map((col, i) => (
              <div
                key={i}
                className={`text-primary-foreground uppercase ${
                  i === 0 ? "w-1/12" : "flex-1"
                }`}
              >
                {col}
              </div>
            ))}
            <div>ACTIONS</div>
          </div>
          <div>
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

                <div className="flex items-center gap-3 text-primary-foreground">
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
          </div>
        </div>
        <Pagination
          totalPage={totabPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default InventoryTable;
