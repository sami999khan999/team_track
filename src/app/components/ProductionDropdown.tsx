import { EmployeeType, PorductionType, ProductType } from "@/types";
import React, { SetStateAction, useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import Pagination from "./Pagination";

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
  defalutValue?: PorductionType | undefined;
  type: "product" | "employee";
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | undefined>();

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < (totalPage || 0)) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (defalutValue) {
      if (type === "employee") {
        setSelectedItem(defalutValue?.employee?.name);
      }
      if (type === "product") {
        setSelectedItem(defalutValue?.products?.name);
      }
    }
  }, [defalutValue, type]);

  return (
    <div>
      <div className="relative">
        <div
          className=" bg-secondary-foreground text-primary-foreground rounded-full py-2 px-5 border border-border_color text-base xl:text-xl flex items-center justify-between "
          onClick={() => {
            setIsDropdownOpen(!isDropdownOpen); // This toggles the dropdown open/close state
          }}
        >
          <div>
            {selectedItem ? (
              selectedItem
            ) : (
              <p>Select {type === "employee" ? "Employee" : "Product"}</p>
            )}
          </div>
          <div
            className={`transition-transform ${isDropdownOpen && "rotate-180"}`}
          >
            <IoIosArrowDown />
          </div>
        </div>
        {isDropdownOpen && (
          <div
            className="absolute z-50 w-full self-center h-[14rem] top-14 bg-secondary border border-border_color rounded-md overflow-auto remove-scrollbar text-primary-foreground text-base px-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex px-4 bg-background mt-2 gap-10 py-3 font-semibold">
              <div className="w-1/6">ID</div>
              <div className="flex-1">Name</div>
              {type === "product" && <div className="flex-1">Rate</div>}
            </div>
            <div>
              {data?.map((item, i) => (
                <div
                  key={i}
                  className="flex px-4 gap-10 border-b border-border_color py-2 hover:bg-secondary-foreground duration-200"
                  onClick={() => {
                    if (type === "employee") {
                      setEmployeeId(Number(item.id));
                      setSelectedItem(item.name);
                      setIsDropdownOpen(!isDropdownOpen);
                    } else {
                      setProductId(Number(item.id));
                      setSelectedItem(item.name);
                      setIsDropdownOpen(!isDropdownOpen);
                    }
                  }}
                >
                  <div className="w-1/6 truncate-text">{item.id}</div>
                  <div className="flex-1 truncate-text">{item.name}</div>
                  {type === "product" && "rate" in item && (
                    <div className="flex-1 truncate-text">
                      {(item as ProductType).rate}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="mb-3">
              <Pagination
                handlePrevious={handlePrevious}
                handleNext={handleNext}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPage={totalPage}
              />
            </div>
          </div>
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
