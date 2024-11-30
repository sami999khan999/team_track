"use client";

import { InventoryType } from "@/types";
import { getInventory } from "@/utils/inventoryApiRequests";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import InventoryModal from "./InventoryModal";
import Pagination from "./Pagination";
import TableActions from "./TableActions";
import LoadingSkeleton from "./LoadingSkeleton";

const InventoryTable = () => {
  const param = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [totabPage, setTotalPage] = useState<number | undefined>(1);
  const [currentPage, setCurrentPage] = useState(
    Number(param.get("page")) || 1
  );
  const [action, setAction] = useState<
    "create" | "update" | "delete" | undefined
  >();
  const [defaultValue, setDefaultValue] = useState<InventoryType | undefined>();
  const [reload, setReload] = useState(false);
  const [inventory, setInventory] = useState<InventoryType[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  const columns = inventory?.length > 0 ? Object.keys(inventory[0]) : [];

  useEffect(() => {
    const fetchEnventory = async () => {
      setIsLoading(true);

      try {
        const response = await getInventory(currentPage);

        await new Promise((resolve) => setTimeout(resolve, 250));

        if (response.success) {
          const firstElement = response.data[0];

          if (firstElement?.total_page !== null) {
            setTotalPage(firstElement.total_page);
            setInventory(response.data.slice(1));
          } else {
            console.error("Invalid Response Format: total_page is missing");
            setTotalPage(undefined);
            setInventory([]);
          }
        } else {
          console.error("Error Fetching Inventory:", response.message);
          setTotalPage(undefined);
          setInventory([]);
        }
      } catch (err) {
        console.error("Unexpected Error While Fetching Inventory:", err);
        setTotalPage(undefined);
        setInventory([]);
      } finally {
        setIsLoading(false);
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
      <div className="w-full h-fit bg-secondary shadow-2xl shadow-[#19253859] px-2 py-6 xl:py-8 xl:px-8 rounded-xl mb-5">
        <TableActions
          tableName="Inventory"
          setIsOpen={setIsOpen}
          setModalAction={setAction}
        />

        {isLoading && <LoadingSkeleton />}

        {!isLoading && inventory.length === 0 && (
          <div className="text-mutated tracking-wide text-xl xl:text-3xl text-center font-semibold xl:my-[6rem] my-[2rem] flex w-full items-center justify-center">
            <div className="w-fit px-6 py-2 rounded-lg cursor-pointer">
              There are no customer data available
            </div>
          </div>
        )}

        {!isLoading && inventory.length > 0 && (
          <div className="overflow-x-auto">
            <div className="w-[40rem] xl:w-full">
              <div className="flex text-primary-foreground justify-between px-4 xl:px-6 py-2 xl:py-4 xl:text-lg text-xs gap-4 mt-3 bg-background font-semibold tracking-wide uppercase">
                {columns.map((col, i) => (
                  <p
                    key={i}
                    className={`text-primary-foreground uppercase truncate-text ${
                      i === 0 ? "w-1/12" : "flex-1"
                    }`}
                  >
                    {col}
                  </p>
                ))}
              </div>
              <div>
                {inventory.map((item, i) => (
                  <div
                    key={i}
                    className="flex text-primary-foreground bg-secondary justify-between border-b border-secondary-foreground px-4 xl:px-6 py-2 xl:py-4 text-sm xl:text-lg gap-4 relative hover:bg-secondary-foreground duration-200 font-medium"
                    onClick={() => {
                      console.log(item);
                    }}
                  >
                    <div className="w-1/12 truncate-text">{item.id}</div>
                    <div className="flex-1 truncate-text">
                      {item.product.name}
                    </div>
                    <div className="flex-1 truncate-text">
                      {item.employee.name}
                    </div>
                    <div className="flex-1 truncate-text">
                      {item.production}
                    </div>
                    <div className="flex-1 truncate-text">{item.quantity}</div>
                    <div className="flex-1 truncate-text">{item.status}</div>
                    <div className="flex-1 truncate-text">{item.date}</div>

                    {/* <div className="xl:px-5 px-3 text-primary-foreground">
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
                  </div> */}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

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
