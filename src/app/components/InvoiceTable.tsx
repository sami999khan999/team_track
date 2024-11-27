"use client";

import React, { useEffect, useState } from "react";
import TableActions from "./TableActions";
import Pagination from "./Pagination";
import InvoiceModal from "./InvoiceModal";
import { InvoiceType } from "@/types";
import { getInvoice } from "@/utils/invoiceApiRequests";
import { useRouter, useSearchParams } from "next/navigation";

const InvoiceTable = () => {
  const path = useRouter();
  const param = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(
    Number(param.get("page")) || 1
  );
  const [totalPage, setTotalPage] = useState<number | undefined>(1);
  const [invoice, setInvoice] = useState<InvoiceType[]>([]);

  useEffect(() => {
    const fetchInovice = async () => {
      const response = await getInvoice(currentPage);

      if (response.success) {
        const firstElement = response.data.shift();
        const totalPage = firstElement.total_page;

        setInvoice(response.data);
        setTotalPage(totalPage);
      }
    };

    fetchInovice();
  }, [currentPage]);

  console.log(invoice);

  return (
    <div>
      {isOpen && <InvoiceModal setIsOpen={setIsOpen} />}

      <div className="w-full h-fit bg-secondary shadow-2xl shadow-[#19253859] px-2 py-6 xl:py-8 xl:px-8 rounded-xl mb-10">
        <TableActions
          tableName="Invoice"
          setIsOpen={setIsOpen}
          // setModalAction={setAction}
        />
        <div className="overflow-x-auto">
          <div className="w-[45rem] xl:w-auto">
            <div className="flex text-primary-foreground justify-between px-4 xl:px-6 py-2 xl:py-4 xl:text-lg text-xs gap-2 mt-3 bg-background font-semibold tracking-wide uppercase">
              <p className="w-1/12">ID</p>
              <p className="flex-1 truncate-text">Customer</p>
              <p className="flex-1 truncate-text">Products</p>
              <p className="flex-1 truncate-text">Quantity</p>
              <p className="flex-1 truncate-text">Total</p>
              <p className="flex-1 truncate-text">Status</p>
              <p className="w-1/12">Date</p>
            </div>

            {/* Table Body */}
            <div>
              {invoice.map((item, i) => (
                <div
                  key={i}
                  className="flex text-primary-foreground bg-secondary justify-between border-b border-secondary-foreground px-4 xl:px-6 py-2 xl:py-4 text-sm xl:text-lg gap-2 relative hover:bg-secondary-foreground duration-200 font-medium"
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

        {/* Pagination */}
        <Pagination
          totalPage={totalPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default InvoiceTable;
