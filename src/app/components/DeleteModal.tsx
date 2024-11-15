"use client";

import { CustomerType, EmployeeType } from "@/types";
import { usePathname } from "next/navigation";
import React from "react";

type TableDataType = EmployeeType | CustomerType;

const DeleteModal = ({
  activeElement,
  handler,
  setIsOpen,
  title,
}: {
  activeElement: { id: number | undefined; name: string | undefined };
  handler: () => void;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
}) => {
  return (
    <div
      className="flex items-center justify-center absolute  top-0 left-0  z-50 w-full h-full backdrop-blur-md"
      onClick={() => {
        setIsOpen(false); // Close modal using setState if needed
      }}
    >
      <div
        className="bg-secondary border border-border_color rounded-xl py-5 px-3 xl:px-5 w-[90%] xl:w-[35%]"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-center font-semibold xl:text-2xl text-primary-foreground mb-3">
          {title} Delete
        </h2>

        <p className="text-xs xl:text-xl text-primary-foreground">
          Would you like to delete{" "}
          <span className="text-primary font-semibold ">
            {`{ id: ${activeElement?.id} | Name: ${activeElement?.name} } `}
          </span>
          this {title}?
        </p>
        <div className="flex justify-end gap-2 xl:gap-3 mt-2 xl:mt-4">
          <button
            className="bg-primary-foreground hover:bg-gray-300 duration-200 font-semibold tracking-wide xl:text-lg text-background text-sm px-4 xl:px-6 xl:py-1 py-1 rounded-md"
            onClick={() => setIsOpen(false)}
          >
            Cancle
          </button>
          <button
            className="bg-primary text-background font-semibold tracking-wide hover:bg-[#0ea30e] duration-200 rounded-md xl:text-lg text-sm px-4 xl:px-6 xl:py-1 py-1"
            onClick={() => {
              handler();
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
