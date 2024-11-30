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

  console.log(invoice);

  return (
    <div>
      {isOpen && <InvoiceModal setIsOpen={setIsOpen} />}

      <div className="w-full h-fit bg-secondary shadow-2xl shadow-[#19253859] px-2 py-6 xl:py-8 xl:px-8 rounded-xl mb-10">
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
              <div className="flex text-primary-foreground justify-between px-4 xl:px-6 py-2 xl:py-4 xl:text-lg text-xs gap-4 mt-3 bg-background font-semibold tracking-wide uppercase">
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
                    className="flex text-primary-foreground justify-between border-b border-secondary-foreground px-4 xl:px-6 py-2 xl:py-4 text-xs xl:text-lg gap-4 relative hover:bg-secondary-foreground duration-200 font-medium bg-secondary capitalize"
                    onClick={() => {
                      path.push(`/invoice/${item.id}`);
                    }}
                  >
                    <div className="w-1/12">{item.id}</div>
                    <div className="flex-1">
                      {item.customer.name} ({item.customer.id})
                    </div>
                    <div className="flex-1">{item.products}</div>
                    <div className="flex-1">{item.quantity}</div>
                    <div className="flex-1">{item.total}</div>
                    <div className="flex-1">{item.current_status}</div>
                    <div className="w-1/12">{item.date}</div>
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
