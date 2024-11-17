import { SelectInventoryType } from "@/types";
import React, { SetStateAction } from "react";
import { ImCheckboxChecked } from "react-icons/im";
import { MdCheckBoxOutlineBlank } from "react-icons/md";

const InvoiceCreateTable = ({
  type,
  setFilterdInventoryIds,
  filterdInventoryIds,
  inventories,
}: {
  type: "selection" | "selected";
  setFilterdInventoryIds?: React.Dispatch<SetStateAction<number[] | undefined>>;
  filterdInventoryIds?: number[] | undefined;
  inventories: SelectInventoryType[] | undefined;
}) => {
  return (
    <div className="">
      {inventories ? (
        <div className="h-[15rem] xl:h-[20rem] overflow-y-auto remove-scrollbar">
          <div className="flex gap-2 bg-background text-sm xl:text-xl text-primary-foreground px-4 py-3 font-medium sticky top-0 rounded-t-md">
            <p className="w-1/12 truncate-text">ID</p>
            <p className="flex-1 truncate-text">Employee</p>
            <p className="flex-1 truncate-text">Product</p>
            <p className="flex-1 truncate-text">Production</p>
            <p className="flex-1 truncate-text">Quantity</p>
            {type === "selection" && <p>Select</p>}
          </div>
          <div className="border border-border_color  rounded-b-xl">
            {inventories?.map((inventory, i) => (
              <div
                className={`flex gap-2 border-b border-border_color text-sm xl:text-xl text-primary-foreground px-4 py-2 hover:bg-secondary-foreground duration-200 ${
                  i === inventories.length - 1 && "border-none"
                }`}
              >
                <div className="w-1/12 truncate-text">{inventory.id}</div>
                <div className="flex-1 truncate-text">
                  {inventory.employee.name}
                </div>
                <div className="flex-1 truncate-text">
                  {inventory.product.id}
                </div>
                <div className="flex-1 truncate-text">
                  {inventory.production.id}
                </div>
                <div className="flex-1 truncate-text">
                  {inventory.production.quantity}
                </div>
                {type === "selection" && (
                  <div
                    className="px-3 flex items-center justify-center cursor-pointer"
                    onClick={() => {
                      if (setFilterdInventoryIds) {
                        if (filterdInventoryIds?.includes(inventory.id)) {
                          setFilterdInventoryIds((prv) =>
                            prv?.filter((item) => item !== inventory.id)
                          );
                        } else {
                          setFilterdInventoryIds((prv) =>
                            prv ? [...prv, inventory.id] : [inventory.id]
                          );
                        }
                      }
                    }}
                  >
                    <div className="">
                      {filterdInventoryIds?.includes(inventory.id) ? (
                        <ImCheckboxChecked />
                      ) : (
                        <MdCheckBoxOutlineBlank />
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default InvoiceCreateTable;
