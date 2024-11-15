import { DropdownType } from "@/types";
import React, { SetStateAction } from "react";

const DropdownBody = ({
  type,
  i,
  setId,
  setValue,
  item,
  setIsDropdownOpen,
  setSelectedItem,
}: {
  type: "product" | "employee" | "production" | "status";
  i: number;
  setId?: React.Dispatch<SetStateAction<number | undefined>>;
  setValue?: React.Dispatch<SetStateAction<string | undefined>>;
  item: DropdownType;
  setIsDropdownOpen: React.Dispatch<SetStateAction<boolean>>;
  setSelectedItem: React.Dispatch<SetStateAction<string | undefined>>;
}) => {
  return (
    <>
      {type === "employee" && (
        <div
          key={i}
          className="flex px-4 gap-10 border-b border-border_color py-2 hover:bg-secondary-foreground duration-200"
          onClick={() => {
            setId && setId(Number(item.id));
            setSelectedItem(item.name);
            setIsDropdownOpen((prv) => !prv);
          }}
        >
          <div className="w-1/6 truncate-text">{item.id}</div>
          <div className="flex-1 truncate-text">{item.name}</div>
        </div>
      )}

      {type === "product" && (
        <div
          key={i}
          className="flex px-4 gap-10 border-b border-border_color py-2 hover:bg-secondary-foreground duration-200"
          onClick={() => {
            setId && setId(Number(item.id));
            setSelectedItem(item.name);
            setIsDropdownOpen((prv) => !prv);
          }}
        >
          <div className="w-1/6 truncate-text">{item.id}</div>
          <div className="flex-1 truncate-text">{item.name}</div>
          <div className="flex-1 truncate-text">{item.rate}</div>
        </div>
      )}

      {type === "production" && (
        <div
          key={i}
          className="flex px-4 gap-10 border-b border-border_color py-2 hover:bg-secondary-foreground duration-200"
          onClick={() => {
            setId && setId(Number(item.id));
            setSelectedItem(item.product?.name);
            setIsDropdownOpen((prv) => !prv);
          }}
        >
          <div className="w-1/6 truncate-text">{item.id}</div>
          <div className="flex-1 truncate-text">{item.product?.name}</div>
          <div className="flex-1 truncate-text">{item.employee?.name}</div>
          <div className="flex-1 truncate-text">{item.quantity}</div>
        </div>
      )}

      {type === "status" && (
        <div
          key={i}
          className="flex px-4 gap-10 border-b border-border_color py-2 hover:bg-secondary-foreground duration-200"
          onClick={() => {
            setValue && setValue(item.status);
            setSelectedItem(item.status);
            setIsDropdownOpen((prv) => !prv);
          }}
        >
          <div className="w-1/6 truncate-text">{i + 1}</div>
          <div className="flex-1 truncate-text">{item.status}</div>
        </div>
      )}
    </>
  );
};

export default DropdownBody;
