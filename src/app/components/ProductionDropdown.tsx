import { EmployeeType, ProductType } from "@/types";
import React, { SetStateAction, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

const ProductionDropdown = ({
  data,
  totalPage,
  currentPage,
  setCurrentPage,
  setEmployeeId,
  setProductId,
  defalutValue,
  type,
}: {
  data: ProductType[] | EmployeeType[] | undefined;
  totalPage: number | undefined;
  currentPage: number;
  setCurrentPage: React.Dispatch<SetStateAction<number>>;
  setEmployeeId: React.Dispatch<SetStateAction<number | undefined>>;
  setProductId: React.Dispatch<SetStateAction<number | undefined>>;
  defalutValue?: ProductType;
  type: "product" | "employee";
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  console.log(isDropdownOpen);

  return (
    <div>
      <div className="relative">
        <div
          className=" bg-secondary-foreground text-primary-foreground rounded-full py-2 px-5 border border-border_color text-base xl:text-xl flex items-center justify-between "
          onClick={() => {
            setIsDropdownOpen(!isDropdownOpen); // This toggles the dropdown open/close state
          }}
        >
          <p>Select {type === "employee" ? "Employee" : "Product"}</p>
          <div
            className={`transition-transform ${isDropdownOpen && "rotate-180"}`}
          >
            <IoIosArrowDown />
          </div>
        </div>
        {isDropdownOpen && (
          <div
            className="absolute z-50 w-[50%] self-center h-10 top-14 bg-secondary-foreground border border-border_color rounded-md"
            onClick={(e) => e.stopPropagation()}
          ></div>
        )}
      </div>
      {isDropdownOpen && (
        <div
          className="absolute top-0 left-0  w-full h-full"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        ></div>
      )}
    </div>
  );
};

export default ProductionDropdown;
