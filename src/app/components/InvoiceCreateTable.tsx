import { SelectInventoryType } from "@/types";
import React, { SetStateAction } from "react";
import { ImCheckboxChecked } from "react-icons/im";
import { MdCheckBoxOutlineBlank } from "react-icons/md";

const InvoiceCreateTable = ({
  type,
  setFilterdInventoryIds,
  filterdInventoryIds,
  inventories,
  setFilterdInventory,
  filterdInventory,
}: {
  type: "selection" | "selected";
  setFilterdInventoryIds?: React.Dispatch<SetStateAction<number[] | undefined>>;
  filterdInventoryIds?: number[] | undefined;
  inventories: SelectInventoryType[] | undefined;
  setFilterdInventory?: React.Dispatch<
    SetStateAction<SelectInventoryType[] | undefined>
  >;
  filterdInventory?: SelectInventoryType[] | undefined;
}) => {
  const handleSelect = (inventory: SelectInventoryType) => {
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

    if (setFilterdInventory) {
      if (filterdInventoryIds?.includes(inventory.id)) {
        setFilterdInventory((prv) =>
          prv?.filter((item) => item.id !== inventory.id)
        );
      } else {
        setFilterdInventory((prv) => (prv ? [...prv, inventory] : [inventory]));
      }
    }
  };

  const isAllSelected = () => {
    if (filterdInventory && inventories) {
      const isAllSelected = inventories.every((item1) =>
        filterdInventory.some((item2) => item1.id === item2.id)
      );
      return isAllSelected;
    } else {
      return false;
    }
  };

  const handelAllSelect = () => {
    if (inventories) {
      if (!filterdInventory || filterdInventory.length === 0) {
        if (setFilterdInventory) setFilterdInventory(inventories);
        if (setFilterdInventoryIds)
          setFilterdInventoryIds(inventories.map((item) => item.id));
      }

      if (isAllSelected()) {
        if (setFilterdInventory) {
          setFilterdInventory((prev) =>
            prev
              ? prev.filter(
                  (item) =>
                    !inventories.some((inventory) => inventory.id === item.id)
                )
              : []
          );
        }

        if (setFilterdInventoryIds) {
          setFilterdInventoryIds((prev) =>
            prev
              ? prev.filter(
                  (id) => !inventories.some((inventory) => inventory.id === id)
                )
              : []
          );
        }
      } else {
        if (setFilterdInventory) {
          setFilterdInventory((prev) => {
            if (prev) {
              const newItems = inventories.filter(
                (inventory) => !prev.some((item) => item.id === inventory.id)
              );
              return [...prev, ...newItems];
            } else {
              return inventories;
            }
          });
        }

        if (setFilterdInventoryIds) {
          setFilterdInventoryIds((prev) => {
            if (prev) {
              const newIds = inventories
                .filter((inventory) => !prev.includes(inventory.id))
                .map((inventory) => inventory.id);
              return [...prev, ...newIds];
            } else {
              return inventories.map((item) => item.id);
            }
          });
        }
      }
    }
  };

  console.log(filterdInventory);
  console.log(filterdInventoryIds);

  return (
    <div className="overflow-auto">
      {inventories ? (
        <div className="h-[15rem] xl:h-[18rem] w-[40rem] xl:w-full">
          <div className="flex gap-2 bg-background text-sm xl:text-xl text-primary-foreground px-4 py-3 font-medium  rounded-t-md capitalize">
            <p className="w-1/12 truncate-text">ID</p>
            <p className="flex-1 truncate-text">Employee</p>
            <p className="flex-1 truncate-text">Product</p>
            <p className="flex-1 truncate-text">Production</p>
            <p className="flex-1 truncate-text">Quantity</p>
            {type === "selection" && (
              <div
                className="flex gap-2 justify-center items-center"
                onClick={handelAllSelect}
              >
                <p>Select</p>
                <div className="">
                  {isAllSelected() ? (
                    <ImCheckboxChecked />
                  ) : (
                    <MdCheckBoxOutlineBlank />
                  )}
                </div>
              </div>
            )}
          </div>
          <div className="border rounded-b-xl border-t-0 border-border_color">
            {inventories?.map((inventory, i) => (
              <div
                key={i}
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
                    onClick={() => handleSelect(inventory)}
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
