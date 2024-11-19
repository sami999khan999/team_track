import { FilteredBill } from "@/types";
import React, { SetStateAction } from "react";
import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";

const BillFilterTable = ({
  data,
  method,
  setSelectedData,
  selectedData,
  type,
}: {
  data: FilteredBill[] | undefined;
  method: string | undefined;
  setSelectedData?: React.Dispatch<SetStateAction<FilteredBill[] | undefined>>;
  selectedData?: FilteredBill[] | undefined;
  type?: string;
}) => {
  const columns = data && data?.length > 0 ? Object.keys(data[0]) : undefined;

  return (
    <div>
      {data && (
        <div className="relative h-[10rem] xl:h-[16rem] overflow-y-auto remove-scrollbar mb-2">
          <div className="overflow-auto remove-scrollbar">
            {data.length > 0 ? (
              <div className="xl:w-full w-[40rem]">
                <div className="flex text-primary-foreground bg-background px-4 py-2 xl:py-3 rounded-t-md mt-4 text-sm xl:text-base gap-3 uppercase font-semibold sticky top-0">
                  {columns?.map((col, i) => (
                    <p
                      key={i}
                      className={`truncate-text ${
                        i === 0 ? "w-1/12" : "flex-1 "
                      }`}
                    >
                      {col}
                    </p>
                  ))}
                  {type && <p>Select</p>}
                </div>
                <div className="text-primary-foreground border border-border_color rounded-b-xl">
                  {data?.map((item, i) => (
                    <div
                      key={i}
                      className={`flex gap-3 border-b border-border_color py-2 xl:py-3 text-sm capitalize xl:text-base px-4 ${
                        i === data.length - 1 && "border-none"
                      }`}
                    >
                      <div className="w-1/12 truncate-text">{item.id}</div>
                      <div className="flex-1 truncate-text">
                        {item.employee.name} ({item.employee.id})
                      </div>
                      <div className="flex-1 truncate-text">
                        {item.product.name} ({item.product.id})
                      </div>
                      {method === "challan" && (
                        <div className="flex-1 truncate-text">
                          {item.challan?.id}
                        </div>
                      )}
                      <div className="flex-1 truncate-text">
                        {item.quantity}
                      </div>
                      <div className="flex-1 truncate-text">{item.rate}</div>
                      <div className="flex-1 truncate-text">{item.amount}</div>
                      {type && (
                        <div
                          className="xl:px-4 px-3 flex items-center"
                          onClick={() => {
                            if (!selectedData) {
                              setSelectedData && setSelectedData([item]);
                            } else {
                              const isSelected = selectedData.some(
                                (selectedItem) => selectedItem.id === item.id
                              );
                              console.log(isSelected);

                              if (isSelected) {
                                setSelectedData &&
                                  setSelectedData(
                                    selectedData.filter(
                                      (selectedItem) =>
                                        selectedItem.id !== item.id
                                    )
                                  );
                              } else {
                                setSelectedData &&
                                  setSelectedData([...selectedData, item]);
                              }
                            }
                          }}
                        >
                          {selectedData?.some(
                            (selectedItem) => selectedItem.id === item.id
                          ) ? (
                            <ImCheckboxChecked />
                          ) : (
                            <ImCheckboxUnchecked />
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              type && (
                <div className="text-primary-foreground font-bold text-2xl text-center mt-6">
                  No Data Found
                </div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BillFilterTable;
