"use client";

import { InvoiceDataType } from "@/types";
import { getSingleInvoice } from "@/utils/invoiceApiRequests";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { ImInsertTemplate } from "react-icons/im";

const Invoice = ({ id }: { id: number }) => {
  const path = useRouter();
  const [invoiceData, setInvoiceData] = useState<InvoiceDataType>();

  const columns = invoiceData ? Object.keys(invoiceData.total_column[0]) : [];

  useEffect(() => {
    const fetchInvoiceData = async () => {
      const response = await getSingleInvoice(id);

      if (response.success) {
        setInvoiceData(response.data);
      }
    };

    fetchInvoiceData();
  }, [id]);

  const handlePrint = () => {
    const printContent = document.getElementById("pdf-content");
    const printButton = document.getElementById("print-button");

    if (printContent) {
      // Hide the print button before printing
      if (printButton) printButton.style.display = "none";

      const printWindow = window.open("", "", "width=900,height=600");
      if (printWindow) {
        // Manually interpolate invoiceData values into the HTML template
        const columns = invoiceData
          ? Object.keys(invoiceData.total_column[0])
          : [];

        const customerName =
          invoiceData?.customer_company || invoiceData?.customer_name;
        const customerAddress = invoiceData?.customer_address;
        const date = invoiceData?.date;
        const challanNo = invoiceData?.challan_no;
        const grandTotal = invoiceData?.grand_total;
        const totalColumnHtml = invoiceData?.total_column
          .map(
            (item) => `
          <div class="table-body border-b flex justify-between px-8 py-1 text-base gap-5 font-medium">
            <div class="w-2/12 break-words capitalize">${item.employee}</div>
            <div class="w-3/12 break-words capitalize">${item.product}</div>
            <div class="flex-1 break-words ">${item.quantity}</div>
            <div class="w-2/12 break-words ">${item.total}</div>
          </div>
        `
          )
          .join("");

        printWindow.document.write(`
          <html>
            <head>
              <title>Invoice</title>
               <script src="https://cdn.tailwindcss.com"></script>
              <style>
                /* Styles go here */

                  .break-words {
    overflow-wrap: break-word; /* Ensures text breaks within container */
    word-wrap: break-word; /* Provides similar behavior */
    white-space: normal; /* Allows text to wrap to new lines */
    word-break: break-word; /* Breaks long words as needed */
  }
      @media print {
    .print-button {
      display: none;
    }
  }
              </style>
            </head>
            <body>
              <div class="invoice-content flex flex-col items-center justify-center">
              <div class=" bg-white w-[95%]">
                <div class="text-center pt-4 pb-3">
                  <h1 class="text-4xl mb-1 font-semibold">Next Fashion Textile</h1>
                  <p class="text-base mb-1 text-[#5c5f63] font-medium">
                    Garashin, Karatia, Tangail-Sadar call: 01711959527 Mail:
                    mustafatex@gmail.com
                  </p>
                  <div class="border-b border-[#11a560]"></div>
                </div>
  
                <div class="flex justify-between px-4">
                  <div class="text-gray-900">
                    <p class="tracking-wide font-bold text-lg capitalize">
                      ${customerName}
                    </p>
                    <p class="text-base font-medium capitalize ">
                      ${customerAddress}
                    </p>
                  </div>
                  <div class="text-base">
                    <p>Date: <span class="bold font-semibold text-gray-950">${date}</span></p>
                    <p>Challan No: <span class="bold font-semibold text-gray-950">${challanNo}</span></p>
                  </div>
                </div>
  
                <div class="table w-full mt-4">
                  <div class="flex text-white px-8 py-2 rounded-t-lg text-base bg-[#068a4c] w-full justify-between font-bold gap-5">
                    <p class="w-2/12 break-words">Employee</p>
                    <p class="w-3/12 break-words">Product</p>
                    <p class="flex-1 break-words">Rolls (yds)</p>
                    <p class="w-2/12 break-words">Total (yds)</p>
                  </div>
  
                  ${totalColumnHtml}
  
                  <div class="px-8 flex border-b justify-between py-2">
                    <div class="w-2/12 font-bold text-gray-900 text-lg">Total</div>
                    <div class="w-3/12"></div>
                    <div class="flex-1"></div>
                    <div class="w-2/12 font-bold text-gray-900 text-lg">${grandTotal}</div>
                  </div>
                </div>

                <div class="mt-20 text-right pr-4">
        <div class="inline-block text-center">
            <div class="border-t-2 border-gray-900 w-48"></div> <!-- Signature line -->
            <p class="mt-1 text-sm font-semibold text-gray-900">Authorized Signature</p>
        </div>
    </div>
  
                <div class="print-button" id="print-button">
                  <button onClick="window.print()">Print Invoice</button>
                </div>
              </div>
              </div>
            </body>
          </html>
        `);

        printWindow.document.close();
        printWindow.print();

        // Show the print button again after printing
        if (printButton) printButton.style.display = "block";
      }
    }
  };

  return (
    <div className="flex justify-center text-primary-foreground h-screen mt-5">
      <div
        className="relative bg-secondary w-[98%] xl:w-[80%] h-fit px-3 xl:px-10 pb-10 rounded-xl"
        id="pdf-content"
      >
        <div
          className="absolute top-4 xl:top-8 left-4 xl:left-8 text-base xl:text-xl bg-secondary-foreground px-2 py-1 rounded-md"
          onClick={() => path.back()}
        >
          <FaArrowLeftLong className="hover:animate-pulse" />
        </div>
        <div className="header text-center py-10">
          <h1 className="text-2xl xl:text-4xl font-semibold text-primary">
            Next Fashion Textile
          </h1>
          <p className="text-sm xl:text-lg mb-3">
            Garashin, Karatia, Tangail-Sadar call: 01711959527 Mail:
            mustafatex@gmail.com
          </p>
          <div className="border border-border_color"></div>
        </div>

        <div className="customer-info flex justify-between px-4">
          <div className="left">
            <p className="customer-name tracking-wider font-bold text-base xl:text-xl capitalize">
              {invoiceData?.customer_company
                ? invoiceData?.customer_company
                : invoiceData?.customer_name}
            </p>
            <p className="address text-sm xl:text-lg font-medium">
              {invoiceData?.customer_address}
            </p>
          </div>
          <div className="right text-base xl:text-xl">
            <p>
              Date:{" "}
              <span className="bold font-semibold">{invoiceData?.date}</span>
            </p>
            <p>
              Challan No:{" "}
              <span className="bold font-semibold">
                {invoiceData?.challan_no}
              </span>
            </p>
          </div>
        </div>

        <div className="table w-full mt-4">
          <div className="table-header flex text-primary-foreground uppercase font-semibold xl:px-8 px-4 py-3 rounded-t-lg text-xs xl:text-xl bg-background w-full justify-between gap-2 xl:gap-3">
            {columns.map((col, i) => (
              <p
                key={i}
                className={`${i === 0 && "w-3/12 xl:w-2/12"} ${
                  i === 1 && "w-3/12"
                } ${i === 2 && "flex-1"} ${i === 3 && "w-2/12"} break-words`}
              >
                {col}
              </p>
            ))}
          </div>

          <div>
            {invoiceData?.total_column.map((item, i) => (
              <div
                key={i}
                className="table-body border-b border-border_color flex justify-between px-4 xl:px-8 py-2 xl:text-lg text-sm gap-2 xl:gap-3 capitalize cursor-pointer hover:bg-secondary-foreground duration-200"
              >
                <div className="w-3/12 xl:w-2/12 break-words cursor-auto">
                  {item.employee}
                </div>
                <div className="w-3/12 break-words cursor-auto">
                  {item.product}
                </div>
                <div className="flex-1 break-words cursor-auto">
                  {item.quantity}
                </div>
                <div className="w-2/12 break-words cursor-auto">
                  {item.total}
                </div>
              </div>
            ))}
          </div>
          <div className="px-4 xl:px-8 flex border-b border-border_color justify-between py-2 xl:py-3 text-sm xl:text-xl">
            <div className="w-2/12 font-bold">Total</div>
            <div className="w-3/12"></div>
            <div className="flex-1"></div>
            <div className="w-2/12 font-bold">{invoiceData?.grand_total}</div>
          </div>
        </div>
        <div className="w-full mt-10" id="print-button">
          <button
            onClick={handlePrint}
            className="border border-border_color w-full xl:w-fit text-primary-foreground hover:bg-primary hover:text-background duration-200 font-semibold px-8 py-1 rounded-full text-lg"
          >
            Print Invoice
          </button>
        </div>
      </div>
    </div>
  );
};

export default Invoice;