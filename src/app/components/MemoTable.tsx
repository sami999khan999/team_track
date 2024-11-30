"use client";

import React, { useEffect, useState } from "react";
import TableActions from "./TableActions";
import MemoModal from "./MemoModal";
import { useRouter, useSearchParams } from "next/navigation";
import { MemoType } from "@/types";
import { getMemo } from "@/utils/memoApiRequests";
import Pagination from "./Pagination";
import LoadingSkeleton from "./LoadingSkeleton";

const MemoTable = () => {
  const param = useSearchParams();
  const path = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [memo, setMemo] = useState<MemoType[]>([]);
  const [currentPage, setCurrentPage] = useState(
    Number(param.get("page")) || 1
  );
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
      <div className="w-full h-fit bg-secondary shadow-xl shadow-[#1925380c] px-2 py-6 xl:py-8 xl:px-8 rounded-xl mb-10">
        <TableActions setIsOpen={setIsOpen} tableName="Cash Memo" />

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
              <div className="flex text-primary-foreground justify-between px-4 xl:px-6 py-2 xl:py-4 xl:text-lg text-xs gap-4 mt-3 bg-background font-semibold tracking-wide uppercase">
                <p className="w-1/12">ID</p>
                <p className="flex-1">Cusotmer</p>
                <p className="flex-1">Challan No.</p>
                <p className="flex-1">Products</p>
                <p className="flex-1">Total Qty</p>
                <p className="flex-1">Amount</p>
                <p className="flex-1">Date</p>
              </div>
              <div>
                {memo.map((item, i) => (
                  <div
                    key={i}
                    className="flex text-primary-foreground justify-between border-b border-secondary-foreground px-4 xl:px-6 py-2 xl:py-4 text-xs xl:text-lg gap-4 relative hover:bg-secondary-foreground duration-200 font-medium bg-secondary capitalize"
                    onClick={() => {
                      path.push(`memo/${item.id}`);
                    }}
                  >
                    <div className="w-1/12">{item.id}</div>
                    <div className="flex-1">
                      {item.customer.name} ({item.customer.id})
                    </div>
                    <div className="flex-1 flex">
                      {item.challan_no.map((challan, i) => (
                        <p key={i}>
                          {challan}
                          {i < item.challan_no.length - 1 && ", "}
                        </p>
                      ))}
                    </div>
                    <div className="flex-1 flex">
                      {item.products.map((product, i) => (
                        <p key={i}>
                          {product}
                          {i < item.products.length - 1 && ", "}
                        </p>
                      ))}
                    </div>
                    <div className="flex-1">{item.total_qty}</div>
                    <div className="flex-1">{item.amount}/=</div>
                    <div className="flex-1">{item.date}</div>
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
