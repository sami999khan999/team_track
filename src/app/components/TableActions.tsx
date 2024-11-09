import React, { SetStateAction } from "react";
import { IoFilterSharp } from "react-icons/io5";
import { MdOutlineSort } from "react-icons/md";
import { HiPlus } from "react-icons/hi";

const TableActions = ({
  setIsOpen,
  tableName,
  setModalAction,
}: {
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
  tableName: string;
  setModalAction: React.Dispatch<
    SetStateAction<"create" | "update" | "delete" | undefined>
  >;
}) => {
  return (
    <div className="">
      {/* <div className="bg-black">
        <AddButton text={`Add ${tableName}`} />
      </div> */}

      <div
        className="w-fit ml-auto mb-3"
        onClick={() => {
          setIsOpen((prv) => !prv);
          setModalAction("create");
        }}
      >
        <div className="bg-primary text-sm lg:text-xl w-full xl:w-fit text-center py-2 lg:py-3 px-3 lg:px-5 flex items-center gap-3 rounded self-end text-secondary font-medium hover:bg-primary/90 duration-300 group justify-center cursor-pointer">
          <HiPlus className="text-2xl transition-transform group-hover:rotate-180 origin-center" />

          <p className="text-center text-base">Add {tableName}</p>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row gap-4 justify-between text-center ">
        <div className="text-lg xl:text-2xl font-semibold tracking-wide text-primary-foreground">
          {`${tableName}`}
        </div>
        <div className="flex gap-2 justify-around">
          <input
            type="text"
            placeholder="Search..."
            className="outline-none text-sm rounded-full bg-secondary border border-border_color w-[50%] xl:w-[20rem] h-8 xl:h-12 xl:text-xl px-4 text-primary-foreground hover:text-background hover:bg-gray-300 duration-300"
          />
          <div className="flex gap-2 xl:text-xl text-sm">
            <div className=" flex items-center gap-2 px-2 xl:px-6 text-primary-foreground rounded-full bg-secondary border border-border_color">
              <IoFilterSharp />
              <p>Filter</p>
            </div>
            <div className=" flex items-center gap-2 px-2 xl:px-6 text-primary-foreground rounded-full bg-secondary border border-border_color">
              <MdOutlineSort />
              <p>Sort</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableActions;
