"use client";

import React, { useEffect, useState } from "react";
import TableActions from "./TableActions";
import Pagination from "./Pagination";
import InvoiceModal from "./InvoiceModal";
import { InvoiceType } from "@/types";
import { getInvoice } from "@/utils/invoiceApiRequests";
import { useRouter, useSearchParams } from "next/navigation";
import LoadingSkeleton from "./LoadingSkeleton";

const InvoiceTable = () => {
  const path = useRouter();
  const param = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(
    Number(param.get("page")) || 1
  );
  const [totalPage, setTotalPage] = useState<number | undefined>(1);
  const [invoice, setInvoice] = useState<InvoiceType[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchInvoice = async () => {
      setIsLoading(true);

      try {
        const response = await getInvoice(currentPage);

        await new Promise((resolve) => setTimeout(resolve, 250)); // Simulate a delay

        if (response.success) {
          const firstElement = response.data[0];

          if (firstElement?.total_page !== null) {
            setTotalPage(firstElement.total_page);
            setInvoice(response.data.slice(1)); // Skip the first element
          } else {
            console.error("Invalid Response Format: total_page is missing");
            setTotalPage(undefined);
            setInvoice([]);
          }
        } else {
          console.error("Error Fetching Invoice:", response.message);
          setTotalPage(undefined);
          setInvoice([]);
        }
      } catch (err) {
        console.error("Unexpected Error While Fetching Invoice:", err);
        setTotalPage(undefined);
        setInvoice([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInvoice();
  }, [currentPage]);

  return (
    <div>
      {isOpen && <InvoiceModal setIsOpen={setIsOpen} />}

      <div className="table-wrapper">
        <TableActions tableName="Invoice" setIsOpen={setIsOpen} />

        {isLoading && <LoadingSkeleton />}

        {!isLoading && invoice.length === 0 && (
          <div className="text-mutated tracking-wide text-xl xl:text-3xl text-center font-semibold xl:my-[6rem] my-[2rem] flex w-full items-center justify-center">
            <div className="w-fit px-6 py-2 rounded-lg cursor-pointer">
              There are no invoice data available
            </div>
          </div>
        )}

        {!isLoading && invoice.length > 0 && (
          <div className="overflow-x-auto">
            <div className="w-[45rem] xl:w-full">
              {/* Table Header */}
              <div className="table-header">
                <p className="w-1/12">ID</p>
                <p className="flex-1 truncate-text">Customer</p>
                <p className="flex-1 truncate-text">Products</p>
                <p className="flex-1 truncate-text">Quantity</p>
                <p className="flex-1 truncate-text">Total</p>
                <p className="flex-1 truncate-text">Status</p>
                <p className="w-1/12 truncate-text">Date</p>
              </div>

              {/* Table Rows */}
              <div>
                {invoice.map((item, i) => (
                  <div
                    key={i}
                    className="table-col capitalize"
                    onClick={() => {
                      path.push(`/invoice/${item.id}`);
                    }}
                  >
                    <div className="w-1/12 truncate-text">{item.id}</div>
                    <div className="flex-1 truncate-text">
                      {item.customer.name} ({item.customer.id})
                    </div>
                    <div className="flex-1 truncate-text">{item.products}</div>
                    <div className="flex-1 truncate-text">{item.quantity}</div>
                    <div className="flex-1 truncate-text">{item.total}</div>
                    <div className="flex-1 truncate-text">
                      {item.current_status}
                    </div>
                    <div className="w-1/12 truncate-text">{item.date}</div>
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

export default InvoiceTable;
