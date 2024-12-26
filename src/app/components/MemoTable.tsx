"use client";

import React, { useEffect, useState } from "react";
import TableActions from "./TableActions";
import MemoModal from "./MemoModal";
import { useRouter, useSearchParams } from "next/navigation";
import { DeleteDataType, MemoType } from "@/types";
import { getMemo } from "@/utils/memoApiRequests";
import Pagination from "./Pagination";
import LoadingSkeleton from "./LoadingSkeleton";
import { formatNumberWithCommas } from "@/utils/numberFormat";
import { logo } from "@/utils/logo";
import { RiDeleteBin6Line } from "react-icons/ri";

const MemoTable = () => {
  const param = useSearchParams();
  const path = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [memo, setMemo] = useState<MemoType[]>([]);
  const [currentPage, setCurrentPage] = useState(
    Number(param.get("page")) || 1
  );
  const [activeElement, setActiveElement] = useState<
    DeleteDataType | undefined
  >();
  const [isDeleteOpen, setIsDeleteModalOpen] = useState();

  const [totalpages, setTotalPages] = useState<number | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMemo = async () => {
      setIsLoading(true);

      try {
        const response = await getMemo(currentPage);

        await new Promise((resolve) => setTimeout(resolve, 250));

        if (response.success) {
          const firstElement = response.data[0];

          if (firstElement?.total_page !== null) {
            setTotalPages(firstElement.total_page);
            setMemo(response.data.slice(1));
          } else {
            console.error("Invalid Response Format: total_page is missing");
            setTotalPages(undefined);
            setMemo([]);
          }
        } else {
          console.error("Error Fetching Memo:", response.message);
          setTotalPages(undefined);
          setMemo([]);
        }
      } catch (err) {
        console.error("Unexpected Error While Fetching Memo:", err);
        setTotalPages(undefined);
        setMemo([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMemo();
  }, [currentPage]);

  return (
    <div>
      {isOpen && <MemoModal setIsOpen={setIsOpen} />}
      <div className="table-wrapper">
        <TableActions
          setIsOpen={setIsOpen}
          tableName="Cash Memo"
          logo={logo.Memo}
        />

        {isLoading && (
          // <div className="text-primary-foreground tracking-wide text-xl xl:text-4xl text-center font-semibold flex items-center justify-center">
          //   Loading...
          // </div>
          <LoadingSkeleton />
        )}

        {!isLoading && memo.length === 0 && (
          <div className="text-mutated tracking-wide text-xl xl:text-3xl text-center font-semibold xl:my-[6rem] my-[2rem] flex w-full items-center justify-center">
            <div className="w-fit px-6 py-2 rounded-lg cursor-pointer ">
              There are no memos available
            </div>
          </div>
        )}

        {!isLoading && memo.length > 0 && (
          <div className="overflow-x-auto">
            <div className="w-[45rem] xl:w-full">
              <div className="table-header">
                <p className="w-1/12">ID</p>
                <p className="flex-1">Cusotmer</p>
                <p className="flex-1">Challan No.</p>
                <p className="flex-1">Products</p>
                <p className="flex-1">Total Qty</p>
                <p className="flex-1">Amount</p>
                <p className="w-1/12">Date</p>
              </div>
              <div>
                {memo.map((item, i) => (
                  <div
                    key={i}
                    className="table-col"
                    onClick={() => {
                      path.push(`memo/${item.id}`);
                    }}
                  >
                    <div className="w-1/12 truncate-text">{item.id}</div>
                    <div className="flex-1 truncate-text">
                      {item.customer.name} ({item.customer.id})
                    </div>
                    <div className="flex-1 flex gap-1 truncate-text">
                      {item.challan_no.map((challan, i) => (
                        <p key={i}>
                          {challan}
                          {i < item.challan_no.length - 1 && ", "}
                        </p>
                      ))}
                    </div>
                    <div className="flex-1 flex gap-2 truncate-text">
                      {item.products.map((product, i) => (
                        <p key={i}>
                          {product}
                          {i < item.products.length - 1 && ", "}
                        </p>
                      ))}
                    </div>
                    <div className="flex-1 truncate-text">{item.total_qty}</div>
                    <div className="flex-1 truncate-text">
                      {formatNumberWithCommas(item.amount)}
                      <span className="xl:text-sm text-[8px]"> TK</span>
                    </div>
                    <div className="w-1/12 truncate-text">{item.date}</div>
                    <div
                      className="w-[4rem] flex items-center justify-center text-primary-foreground"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <div
                        className="w-full flex items-center justify-center hover:bg-primary hover:text-background p-1 rounded-sm duration-200"
                        onClick={() => {
                          setIsDeleteModalOpen(true);
                          setActiveElement({
                            id: item.id,
                            customer: item.customer.name,
                            products: item.products,
                            current_status: item.current_status,
                            date: item.date,
                          });
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
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPage={totalpages}
        />
      </div>

      {/* <LoadingSkeleton /> */}
    </div>
  );
};

export default MemoTable;
