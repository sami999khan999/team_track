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

  const columns = production?.length > 0 ? Object.keys(production[0]) : [];

  useEffect(() => {
    const productions = async () => {
      const response = await getProduction(currentPage);
      console.log(response);

      if (response.success) {
        const firstElement = response.data.shift();
        const totalePages = firstElement ? firstElement.total_page : undefined;

        setTotalPage(totalePages);
        setProduction(response.data);
      }
    };

    productions();
  }, [currentPage, reload]);

  useEffect(() => {
    path.push(`?page=${currentPage}`);
  }, [currentPage, path]);

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
      <div className="w-full h-fit bg-secondary shadow-2xl shadow-[#19253859] px-2 py-6 xl:py-8 xl:px-8 rounded-xl">
        <TableActions
          tableName="Production"
          setIsOpen={setIsOpen}
          setModalAction={setModalAction}
        />

        {/* Table */}
        <div>
          <div className="flex text-primary-foreground justify-between px-4 xl:px-6 py-2 xl:py-4 xl:text-lg text-xs gap-2 mt-3 bg-background font-semibold tracking-wide uppercase">
            {columns.map((col, i) => (
              <div
                key={i}
                className={`text-primary-foreground uppercase ${
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
                className="flex text-primary-foreground justify-between border-b border-secondary-foreground px-4 xl:px-6 py-2 xl:py-4 xl:text-lg gap-2 relative hover:bg-secondary-foreground duration-200 font-medium"
              >
                <div className="w-1/12 truncate-text">{item.id}</div>
                <div className="flex-1 truncate-text">{item.product.name}</div>
                <div className="flex-1 truncate-text">{item.employee.name}</div>
                <div className="flex-1 truncate-text">{item.quantity}</div>
                <div className="flex-1 truncate-text">{item.rate}</div>
                <div className="flex-1 truncate-text">{item.payment}</div>
                <div className="flex-1 truncate-text">{item.date}</div>
                <div className="flex items-center gap-3 text-primary-foreground">
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
