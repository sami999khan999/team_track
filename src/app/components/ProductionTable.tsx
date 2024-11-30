"use client";

import { PorductionType } from "@/types";
import { getProduction } from "@/utils/productionApiRequests";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import Pagination from "./Pagination";
import ProductionModal from "./ProductionModal";
import TableActions from "./TableActions";
import LoadingSkeleton from "./LoadingSkeleton";

const ProductionTable = () => {
  const path = useRouter();
  const param = useSearchParams();

  const [currentPage, setCurrentPage] = useState(
    Number(param.get("page")) || 1
  );
  const [totalPage, setTotalPage] = useState<number | undefined>(undefined);
  const [isOpen, setIsOpen] = useState(false);
  const [defalutValue, setDefalutValue] = useState<
    PorductionType | undefined
  >();
  const [reload, setReload] = useState(false);
  const [modalAction, setModalAction] = useState<
    "create" | "update" | "delete"
  >();
  const [production, setProduction] = useState<PorductionType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const columns = production?.length > 0 ? Object.keys(production[0]) : [];

  useEffect(() => {
    const productions = async () => {
      setIsLoading(true);

      try {
        const response = await getProduction(currentPage);

        await new Promise((resolve) => setTimeout(resolve, 250));

        if (response.success) {
          const firstElement = response.data[0];

          if (firstElement?.total_page !== null) {
            setTotalPage(firstElement.total_page);
            setProduction(response.data.slice(1));
          } else {
            console.error("Invalid Response Format: total_page is missing");
            setTotalPage(undefined);
            setProduction([]);
          }
        } else {
          console.error("Error Fetching Production:", response.message);
          setTotalPage(undefined);
          setProduction([]);
        }
      } catch (err) {
        console.error("Unexpected Error While Fetching Production:", err);
        setTotalPage(undefined);
        setProduction([]);
      } finally {
        setIsLoading(false);
      }
    };

    productions();
  }, [currentPage, reload]);

  console.log(production);

  return (
    <div>
      {isOpen && (
        <ProductionModal
          setIsOpen={setIsOpen}
          defalutValue={defalutValue}
          setDefalutValue={setDefalutValue}
          action={modalAction}
          setReload={setReload}
        />
      )}
      <div className="w-full h-fit bg-secondary shadow-2xl shadow-[#19253859] px-2 py-6 xl:py-8 xl:px-8 rounded-xl mb-4">
        <TableActions
          tableName="Production"
          setIsOpen={setIsOpen}
          setModalAction={setModalAction}
        />

        {isLoading && (
          // <div className="text-primary-foreground tracking-wide text-xl xl:text-4xl text-center font-semibold flex items-center justify-center">
          //   Loading...
          // </div>
          <LoadingSkeleton />
        )}

        {!isLoading && production.length === 0 && (
          <div className="text-mutated tracking-wide text-xl xl:text-3xl text-center font-semibold xl:my-[6rem] my-[2rem] flex w-full items-center justify-center">
            <div className="w-fit px-6 py-2 rounded-lg cursor-pointer ">
              There are no memos available
            </div>
          </div>
        )}

        {!isLoading && production.length > 0 && (
          <div className="overflow-x-auto">
            <div className="w-[40rem] xl:w-full">
              <div className="flex text-primary-foreground justify-between px-4 xl:px-6 py-2 xl:py-4 xl:text-lg text-xs gap-3 mt-3 bg-background font-semibold tracking-wide uppercase">
                {columns.map((col, i) => (
                  <div
                    key={i}
                    className={`text-primary-foreground uppercase truncate-text ${
                      i === 0 ? "w-1/12" : "flex-1"
                    }`}
                  >
                    {col}
                  </div>
                ))}
                <div>ACTIONS</div>
              </div>
              <div>
                {production.map((item, i) => (
                  <div
                    key={i}
                    className="flex text-primary-foreground justify-between border-b border-secondary-foreground px-4 xl:px-6 py-2 xl:py-4 text-xs xl:text-lg gap-3 relative hover:bg-secondary-foreground duration-200 font-medium bg-secondary "
                  >
                    <div className="w-1/12 truncate-text">{item.id}</div>
                    <div className="flex-1 truncate-text">
                      {item.product.name}
                    </div>
                    <div className="flex-1 truncate-text">
                      {item.employee.name}
                    </div>
                    <div className="flex-1 truncate-text">{item.quantity}</div>
                    <div className="flex-1 truncate-text">{item.rate}</div>
                    <div className="flex-1 truncate-text">{item.payment}</div>
                    <div className="flex-1 truncate-text">{item.date}</div>
                    <div className="flex  items-center xl:gap-3 text-primary-foreground px-1">
                      <div
                        className="hover:bg-primary p-1 rounded-md hover:text-gray-200 duration-200"
                        onClick={() => {
                          setDefalutValue(item);
                          setIsOpen(true);
                          setModalAction("update");
                        }}
                      >
                        <MdOutlineEdit />
                      </div>
                      <div
                        className="hover:bg-primary p-1 rounded-md hover:text-gray-200 duration-200"
                        onClick={() => {
                          setDefalutValue(item);
                          setIsOpen(true);
                          setModalAction("delete");
                        }}
                      >
                        <RiDeleteBin6Line />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <Pagination
          totalPage={totalPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default ProductionTable;
