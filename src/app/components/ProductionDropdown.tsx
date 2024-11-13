import { DropdownType, PorductionType, ProductType } from "@/types";
import React, { SetStateAction, useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import Pagination from "./Pagination";
import DorpdownHeader from "./DorpdownHeader";
import DropdownBody from "./DropdownBody";

const ProductionDropdown = ({
  data,
  totalPage,
  currentPage,
  setCurrentPage,
  setId,
  setValue,
  defalutValue,
  type,
}: {
  data: DropdownType[] | undefined;
  totalPage?: number | undefined;
  currentPage: number;
  setCurrentPage: React.Dispatch<SetStateAction<number>>;
  setId?: React.Dispatch<SetStateAction<number | undefined>>;
  setValue?: React.Dispatch<SetStateAction<string | undefined>>;
  defalutValue?: DropdownType;
  type: "product" | "employee" | "production" | "status";
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | undefined>();

  useEffect(() => {
    if (defalutValue) {
      if (type === "employee") {
        setSelectedItem(defalutValue?.employee?.name);
      }
      if (type === "product") {
        setSelectedItem(defalutValue?.product?.name);
      }
      if (type === "production") {
        setSelectedItem(defalutValue?.product?.name);
      }
      if (type === "status") {
        setSelectedItem(defalutValue?.status);
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
          <div>{selectedItem ? selectedItem : <p>Select {type}</p>}</div>
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
            {/* <div className="flex px-4 bg-background rounded-t-md mt-2 gap-10 py-3 font-semibold">
              <div className="w-1/6">ID</div>
              <div className="flex-1">Name</div>
              {type === "product" && <div className="flex-1">Rate</div>}
            </div> */}
            <div>
              <DorpdownHeader type={type} />
            </div>
            <div>
              {data?.map((item, i) => (
                <DropdownBody
                  i={i}
                  type={type}
                  setId={setId}
                  setValue={setValue}
                  item={item}
                  setIsDropdownOpen={setIsDropdownOpen}
                  setSelectedItem={setSelectedItem}
                />
              ))}
            </div>
            <div className="mb-3">
              <Pagination
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
