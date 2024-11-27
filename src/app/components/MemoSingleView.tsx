"use client";

import { MemoColumnType, MemoHeadingType } from "@/types";
import { getSingleMemo } from "@/utils/memoApiRequests";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";

const MemoSingleView = ({ id }: { id: number }) => {
  const path = useRouter();
  const [memoHeadingData, setMemoHeadingData] =
    useState<MemoHeadingType | null>(null);
  const [memoColumnData, setMemoColumnData] = useState<MemoColumnType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [column, setColumn] = useState<string[]>();

  useEffect(() => {
    const fetchMemoSingleData = async () => {
      try {
        setIsLoading(true);

        await new Promise((resolve) => setTimeout(resolve, 250));

        const response = await getSingleMemo(id);

        if (response.success) {
          const headingData = response.data[0];

          if (headingData) {
            setMemoHeadingData(headingData);

            const columns = response.data.slice(1);

            if (columns.length > 0) {
              setMemoColumnData(columns);
              setColumn(Object.keys(columns[0]));
            } else {
              console.log("Invalid response format: Missing Column Data");
              setMemoColumnData([]);
            }
          } else {
            console.log("Invalid response format: Missing Heading Data");
            setMemoHeadingData(null);
            setMemoColumnData([]);
          }
        } else {
          console.log(response.message || "Failed to fetch memo data");
          setMemoHeadingData(null);
          setMemoColumnData([]);
        }
      } catch (err) {
        console.error("Error while fetching memo data:", err);
        setMemoHeadingData(null);
        setMemoColumnData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMemoSingleData();
  }, [id]);

  console.log(column);

  const handlePrint = () => {
    const printContent = document.getElementById("pdf-content");
    const printButton = document.getElementById("print-button");

    if (printContent) {
      // Hide the print button before printing
      if (printButton) printButton.style.display = "none";

      const printWindow = window.open("", "", "width=900,height=600");
      if (printWindow) {
        // Manually interpolate invoiceData values into the HTML template
        // const columns = invoiceData
        //   ? Object.keys(invoiceData.total_column[0])
        //   : [];

        const customerName = memoHeadingData?.customer;
        const customerAddress = memoHeadingData?.address;
        const date = memoHeadingData?.date;
        const challanNo = memoHeadingData?.memo_id;
        const grandTotal = memoHeadingData?.total_amount;
        const totalColumnHtml = memoColumnData
          .map(
            (item) => `
          <div class="table-body border-b flex justify-between px-8 py-1 text-base gap-5 font-medium">
            <div class="w-1/12 break-words cursor-auto">
                          ${item.slno}
                        </div>
                        <div class="flex-1 break-words cursor-auto">
                          ${item.products}
                        </div>
                      <div class="flex-1 break-words cursor-auto">
  ${item.challan
    .map((product, i) => `${product}${i < item.challan.length - 1 ? ", " : ""}`)
    .join("")}
</div>
                        <div class="flex-1 break-words cursor-auto">
                          ${item.quantity}
                        </div>
                        <div class="flex-1 break-words cursor-auto">
                          ${item.rate}
                        </div>
                        <div class="w-[4rem] break-words cursor-auto">
                          ${item.amount}
                        </div>
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
              <div class=" bg-white w-[100%]">
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
                  <div class="flex text-white px-8 py-2 rounded-t-lg text-base bg-[#068a4c] w-full justify-between font-bold gap-5 capitalize">
                    <p class="w-1/12 break-words">slno</p>
                    <p class="flex-1 break-words">Products</p>
                    <p class="flex-1 break-words">Challan </p>
                    <p class="flex-1 break-words">Quantity</p>
                    <p class="flex-1 break-words">Rate</p>
                    <p class="w-[4rem] break-words">Amount</p>
                  </div>

                  ${totalColumnHtml}

                  <div class="px-8 flex border-b justify-between py-2">
                    <div class="w-1/12 font-bold text-gray-900 text-lg">Total</div>
                    <div class="flex-1"></div>
                    <div class=flex-1"></div>
                    <div class="flex-1"></div>
                    <div class="flex-1"></div>
                    <div class="w-[4rem] font-bold text-gray-900 text-lg">${grandTotal}</div>
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

  console.log(memoColumnData);
  console.log(memoHeadingData);

  return (
    <div className="flex justify-center text-primary-foreground h-screen mt-5">
      <div
        className="relative bg-secondary w-[98%] xl:w-[80%] h-fit px-3 xl:px-10 pb-10 rounded-xl"
        id="pdf-content"
      >
        <div
          className="absolute top-4 xl:top-8 left-4 xl:left-8 text-base xl:text-2xl text-primary-foreground px-4 py-1 rounded-md hover:bg-secondary-foreground duration-200"
          onClick={() => path.back()}
        >
          <FaArrowLeftLong />
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

        {isLoading && (
          <div className="text-primary-foreground tracking-wide text-xl xl:text-4xl text-center font-semibold flex items-center justify-center">
            Loading...
          </div>
        )}

        {!isLoading &&
          (memoColumnData.length === 0 || memoHeadingData === null) && (
            <div className="text-primary-foreground tracking-wide text-xl xl:text-3xl text-center font-semibold xl:my-[6rem] my-[2rem] flex w-full items-center justify-center">
              <div className="w-fit px-6 py-2 rounded-lg cursor-pointer ">
                There is no memos available
              </div>
            </div>
          )}

        {!isLoading &&
          memoHeadingData !== null &&
          memoColumnData.length > 0 && (
            <>
              <div className="customer-info flex justify-between px-4">
                <div className="left">
                  <p className="customer-name tracking-wider font-bold text-base xl:text-xl capitalize">
                    {memoHeadingData?.customer}
                  </p>
                  <p className="address text-sm xl:text-lg font-medium">
                    {memoHeadingData?.address}
                  </p>
                </div>
                <div className="right text-base xl:text-xl">
                  <p>
                    Date:{" "}
                    <span className="bold font-semibold">
                      {memoHeadingData?.date}
                    </span>
                  </p>
                  <p>
                    Challan No:{" "}
                    <span className="bold font-semibold">
                      {memoHeadingData?.memo_id}
                    </span>
                  </p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <div className="w-[40rem] xl:w-full mt-4">
                  <div className="table-header flex text-primary-foreground uppercase font-semibold xl:px-8 px-4 py-3 rounded-t-lg text-xs xl:text-xl bg-background w-full justify-between gap-2 xl:gap-3">
                    {column &&
                      column.map((col, i) => (
                        <p
                          key={i}
                          className={` ${
                            (i === 0 || i === column.length - 1) &&
                            "w-1/12 xl:w-1/12"
                          }  ${
                            i !== 0 && i !== column.length - 1 && "flex-1"
                          } break-words`}
                        >
                          {col}
                        </p>
                      ))}
                  </div>

                  <div>
                    {memoColumnData?.map((item, i) => (
                      <div
                        key={i}
                        className="table-body border-b border-border_color flex justify-between px-4 xl:px-8 py-2 xl:text-lg text-sm gap-2 xl:gap-3 capitalize cursor-pointer hover:bg-secondary-foreground duration-200"
                      >
                        <div className="w-1/12 xl:w-1/12 break-words cursor-auto">
                          {item.slno}
                        </div>
                        <div className="flex-1 break-words cursor-auto">
                          {item.products}
                        </div>
                        <div className="flex-1 break-words cursor-auto">
                          {item.challan.map((challanNumber, i) => (
                            <p key={i}>
                              {challanNumber}
                              {i < item.challan.length - 1 && ", "}
                            </p>
                          ))}
                        </div>
                        <div className="flex-1 break-words cursor-auto">
                          {item.quantity}
                        </div>
                        <div className="flex-1 break-words cursor-auto">
                          {item.rate}/=
                        </div>
                        <div className="w-1/12 break-words cursor-auto">
                          {item.amount}/=
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="px-4 xl:px-8 flex border-b border-border_color justify-between py-2 xl:py-3 text-sm xl:text-xl">
                    <div className="w-1/12 font-bold">Total</div>
                    <div className="flex-1"></div>
                    <div className="flex-1"></div>
                    <div className="flex-1"></div>
                    <div className="flex-1"></div>
                    <div className="w-1/12 font-bold">
                      {memoHeadingData?.total_amount}/=
                    </div>
                  </div>
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
            </>
          )}
      </div>
    </div>
  );
};

export default MemoSingleView;
