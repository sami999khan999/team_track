"use client";

import { InvoiceDataType } from "@/types";
import { getSingleInvoice } from "@/utils/invoiceApiRequests";
import React, { useEffect, useState } from "react";

const Invoice = ({ id }: { id: number }) => {
  const [invoiceData, setInvoiceData] = useState<InvoiceDataType>();

  useEffect(() => {
    const fetchInvoiceData = async () => {
      const response = await getSingleInvoice(id);

      if (response.success) {
        setInvoiceData(response.data);
      }
    };

    fetchInvoiceData();
  });

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white xl:w-[70%] px-10 py-24 ">
        <div className="flex flex-col items-center gap-1 ">
          <h1 className="text-5xl font-semibold">Next Fashion Textile</h1>
          <p className="text-gray-600 text-center text-xl">
            Garashin, Karatia, Tangail-Sadar call: 01711959527 Mail:
            mustafatex@gmail.com
          </p>
          <div className="border-b-4 border-[#0ba759] w-full"></div>
        </div>

        <div className="mt-6 flex justify-between">
          <div>
            <p className="text-3xl font-bold">
              {invoiceData?.customer_company
                ? invoiceData?.customer_company
                : invoiceData?.customer_name}
            </p>
            <p className="text-xl font-medium">
              {invoiceData?.customer_address}
            </p>
          </div>
          <div className="text-2xl font-medium">
            <p>
              Date: <span className="font-bold">{invoiceData?.date}</span>
            </p>
            <p>
              Challan No:{" "}
              <span className="font-bold">{invoiceData?.challan_no}</span>
            </p>
          </div>
        </div>

        <div className="mt-10">
          {/* Header */}
          <div className="flex justify-between bg-[#0ba759] text-gray-50 text-2xl py-2 px-5 rounded-t-lg font-semibold tracking-wide">
            <p className="flex-1">Employee Name</p>
            <p className="flex-1">Product</p>
            <p className="flex-1">Rolls (yds)</p>
            <p className="flex-1">Total (yds)</p>
          </div>

          {/* Table Rows */}
          <div>
            {invoiceData?.total_column.map((item, i) => (
              <div
                key={i}
                className="flex justify-between text-2xl py-2 px-5 border-b"
              >
                <div className="capitalize flex-1 ">{item.product}</div>
                <div className="flex-1 ">{item.quantity}</div>
                <div className="flex-1 ">{item.total}</div>
                <div className="flex-1">{item.quantity}</div>
              </div>
            ))}
          </div>
          <div className="px-5 text-2xl mt-4 font-semibold flex justify-between">
            <div className="flex-1">Total</div>
            <div className="flex-1"></div>
            <div className="flex-1"></div>
            <div className="flex-1">{invoiceData?.grand_total}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
