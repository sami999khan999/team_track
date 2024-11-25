import { FilterMemoType } from "@/types";
import React, { SetStateAction } from "react";
import { ImCheckboxChecked } from "react-icons/im";
import { MdCheckBoxOutlineBlank } from "react-icons/md";

const MemoFilterTable = ({
  data,
  type,
  setSelectedData,
  selectedData,
  setSelectedId,
}: {
  data: FilterMemoType[];
  type: "selection" | "selected";
  setSelectedData: React.Dispatch<SetStateAction<FilterMemoType[] | undefined>>;
  selectedData: FilterMemoType[] | undefined;
  setSelectedId?: React.Dispatch<SetStateAction<number[] | undefined>>;
}) => {
  const handleCheckboxChange = (item: FilterMemoType) => {
    if (selectedData?.some((selectedItem) => selectedItem.id === item.id)) {
      setSelectedData((prevData) =>
        prevData?.filter((selectedItem) => selectedItem.id !== item.id)
      );
      if (setSelectedId)
        setSelectedId((prevId) => prevId?.filter((id) => id !== item.id));
    } else {
      setSelectedData((prevData) => (prevData ? [...prevData, item] : [item]));
      if (setSelectedId)
        setSelectedId((prevId) => (prevId ? [...prevId, item.id] : [item.id]));
    }
  };

  return (
    <div className="overflow-y-auto">
      {data.length > 0 ? (
        <div className="h-[15rem] xl:h-[24rem] xl:w-full mt-4 w-[35rem]">
          <div className="flex gap-2 bg-background text-sm xl:text-xl text-primary-foreground px-5 py-3 font-medium rounded-t-md capitalize">
            <p className="w-1/12 truncate-text">ID</p>
            <p className="flex-1 truncate-text">products</p>
            <p className="flex-1 truncate-text">quantity</p>
            <p className="flex-1 truncate-text">total</p>
            <p className="flex-1 truncate-text">amount</p>
            <p className="flex-1 truncate-text">current_status</p>
            <p className="flex-1 truncate-text">Date</p>
            {type === "selection" && <p className="w-1/12">Select</p>}
          </div>
          <div className="border-2 xl:border-4 border-t-0 border-border_color">
            {data.map((item, i) => (
              <div
                key={i}
                className={`flex gap-2 border-b border-border_color text-sm xl:text-xl text-primary-foreground px-4 py-2 hover:bg-secondary-foreground duration-200 ${
                  i === data.length - 1 && "border-none"
                }`}
              >
                <p className="w-1/12 truncate-text">{item.id}</p>
                <p className="flex-1 truncate-text">{item.products}</p>
                <p className="flex-1 truncate-text">{item.quantity}</p>
                <p className="flex-1 truncate-text">{item.total}</p>
                <p className="flex-1 truncate-text">{item.amount}</p>
                <p className="flex-1 truncate-text">{item.current_status}</p>
                <p className="flex-1 truncate-text">{item.date}</p>
                {type === "selection" && (
                  <div className="w-1/12 flex items-center justify-center cursor-pointer">
                    <div onClick={() => handleCheckboxChange(item)}>
                      {selectedData?.some(
                        (selectedItem) => selectedItem.id === item.id
                      ) ? (
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
        <div className="h-[15rem] xl:h-[24rem] text-primary-foreground font-bold xl:text-3xl text-xl text-center remove-scrollbar  mt-4">
          <p className="pt-10">No Data Found</p>
        </div>
      )}
    </div>
  );
};

export default MemoFilterTable;
