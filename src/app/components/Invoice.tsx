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
  }, [id]);

  const printInvoice = () => {
    window.print();
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      {/* Printable Invoice Section */}
      <div className="printable bg-white xl:w-[70%] px-10 py-16 rounded-lg shadow-lg">
        {/* Header Section */}
        <div className="text-center mb-4">
          <h1 className="text-4xl font-bold">Next Fashion Textile</h1>
          <p className="text-sm text-gray-600">
            Garashin, Karatia, Tangail-Sadar <br />
            Call: 01711959527 | Mail: mustafatex@gmail.com
          </p>
          <div className="border-b-2 border-green-600 mt-2"></div>
        </div>

        {/* Customer and Invoice Details */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <p className="font-bold text-xl">
              {invoiceData?.customer_company || invoiceData?.customer_name}
            </p>
            <p className="text-gray-700">{invoiceData?.customer_address}</p>
          </div>
          <div className="text-right">
            <p>
              <strong>Date:</strong> {invoiceData?.date}
            </p>
            <h2 className="text-lg">
              <strong>Challan No:</strong> {invoiceData?.challan_no}
            </h2>
          </div>
        </div>

        {/* Invoice Table */}
        <table className="w-full border-collapse border border-gray-300 mb-6">
          <thead>
            <tr className="bg-green-600 text-white">
              <th className="py-2 px-4 border border-gray-300">Product</th>
              <th className="py-2 px-4 border border-gray-300">Rolls (yds)</th>
              <th className="py-2 px-4 border border-gray-300">Total (yds)</th>
            </tr>
          </thead>
          <tbody>
            {invoiceData?.total_column.map((item, i) => (
              <tr key={i} className="hover:bg-gray-100">
                <td className="py-2 px-4 border">{item.product}</td>
                <td className="py-2 px-4 border">{item.rolls}</td>
                <td className="py-2 px-4 border">{item.total}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={2} className="text-right py-2 px-4 font-bold">
                Grand Total:
              </td>
              <td className="py-2 px-4 font-bold">{invoiceData?.grand_total} yds</td>
            </tr>
          </tfoot>
        </table>

        {/* Signature Section */}
        <div className="text-right mt-16 pr-4">
          <div className="inline-block text-center">
            <div className="border-t-2 border-gray-600 w-48 mx-auto"></div>
            <p className="mt-2 text-sm font-semibold">Authorized Signature</p>
          </div>
        </div>
      </div>

      {/* Print Button */}
      <button
        onClick={printInvoice}
        className="mt-8 bg-green-600 text-white py-2 px-4 rounded shadow hover:bg-green-700"
        id="print"
      >
        Print Invoice
      </button>

      {/* Print Styling */}
      <style jsx>{`
        @media print {
          /* Hide all elements except those inside the printable area */
          body * {
            display: none !important;
          }

          .printable {
            display: block !important;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            background: white !important;
            padding: 20mm;
          }

          /* Sidebar, Navigation, and Other UI Elements */
          .sidebar,
          .mobile-bg,
          .header,
          .footer {
            display: none !important;
          }

          /* A4 Paper Setup */
          @page {
            size: A4;
            margin: 20mm;
          }
        }
      `}</style>
    </div>
  );
};

export default Invoice;
