"use client";

import { InvoiceDataType } from "@/types";
import { getSingleInvoice } from "@/utils/invoiceApiRequests";
import React, { useEffect, useState } from "react";
import { ImInsertTemplate } from "react-icons/im";

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
        const customerName =
          invoiceData?.customer_company || invoiceData?.customer_name;
        const customerAddress = invoiceData?.customer_address;
        const date = invoiceData?.date;
        const challanNo = invoiceData?.challan_no;
        const grandTotal = invoiceData?.grand_total;
        const totalColumnHtml = invoiceData?.total_column
          .map(
            (item) => `
          <div class="table-body border-b flex justify-between px-8 py-1 text-base gap-5">
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
                  <p class="text-base mb-1 text-[#45484b]">
                    Garashin, Karatia, Tangail-Sadar call: 01711959527 Mail:
                    mustafatex@gmail.com
                  </p>
                  <div class="border-b border-green-700"></div>
                </div>
  
                <div class="flex justify-between">
                  <div class="text-gray-800">
                    <p class="customer-name tracking-wider font-bold text-lg capitalize">
                      ${customerName}
                    </p>
                    <p class="address text-base font-medium">
                      ${customerAddress}
                    </p>
                  </div>
                  <div class="text-base">
                    <p>Date: <span class="bold font-semibold text-[#45484b]">${date}</span></p>
                    <p>Challan No: <span class="bold font-semibold ">${challanNo}</span></p>
                  </div>
                </div>
  
                <div class="table w-full mt-4">
                  <div class="flex text-white px-8 py-1 rounded-t-lg text-base bg-green-600 w-full justify-between font-bold gap-5">
                    <p class="w-2/12 break-words">Employee</p>
                    <p class="w-3/12 break-words">Product</p>
                    <p class="flex-1 break-words">Rolls (yds)</p>
                    <p class="w-2/12 break-words">Total (yds)</p>
                  </div>
  
                  ${totalColumnHtml}
  
                  <div class="px-8 flex border-b justify-between py-2">
                    <div class="w-2/12 font-bold text-[#45484b] text-xl">Total</div>
                    <div class="w-3/12"></div>
                    <div class="flex-1"></div>
                    <div class="w-2/12 font-bold text-[#45484b] text-xl">${grandTotal}</div>
                  </div>
                </div>

                <div class="mt-20 text-right pr-4">
        <div class="inline-block text-center">
            <div class="border-t-2 border-[#45484b] w-48"></div> <!-- Signature line -->
            <p class="mt-1 text-sm font-semibold text-[#45484b]">Authorized Signature</p>
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
    <div className="flex items-center justify-center">
      <div className=" bg-white w-[80%] px-10" id="pdf-content">
        <div className="header text-center py-10">
          <h1 className="text-4xl font-semibold">Next Fashion Textile</h1>
          <p className="text-lg mb-3">
            Garashin, Karatia, Tangail-Sadar call: 01711959527 Mail:
            mustafatex@gmail.com
          </p>
          <div className="border border-green-600"></div>
        </div>

        <div className="customer-info flex justify-between">
          <div className="left">
            <p className="customer-name tracking-wider font-bold text-xl capitalize">
              {invoiceData?.customer_company
                ? invoiceData?.customer_company
                : invoiceData?.customer_name}
            </p>
            <p className="address text-lg font-medium">
              {invoiceData?.customer_address}
            </p>
          </div>
          <div className="right text-xl">
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
          <div className="table-header flex text-white px-8 py-2 rounded-t-lg text-xl bg-green-600 w-full justify-between gap-3">
            <p className="w-2/12  break-words">Employee</p>
            <p className="w-3/12 break-words">Product</p>
            <p className="flex-1 break-words">Rolls (yds)</p>
            <p className="w-2/12 break-words">Total (yds)</p>
          </div>

          <div>
            {invoiceData?.total_column.map((item, i) => (
              <div
                key={i}
                className="table-body border-b flex justify-between px-8 py-2 text-lg gap-3"
              >
                <div className="w-2/12 break-words">{item.employee}</div>
                <div className="w-3/12 break-words">{item.product}</div>
                <div className="flex-1 break-words">{item.quantity}</div>
                <div className="w-2/12 break-words">{item.total}</div>
              </div>
            ))}
          </div>
          <div className="px-8 flex border-b justify-between py-2">
            <div className="w-2/12 font-bold text-[#45484b] text-xl">Total</div>
            <div className="w-3/12"></div>
            <div className="flex-1"></div>
            <div className="w-2/12 font-bold text-[#45484b] text-xl">
              {invoiceData?.grand_total}
            </div>
          </div>
        </div>

        <div className="print-button" id="print-button">
          <button onClick={handlePrint}>Print Invoice</button>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
