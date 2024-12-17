"use client";

import React, { useEffect, useState } from "react";
import TableActions from "./TableActions";
import Pagination from "./Pagination";
import PaymentModal from "./PaymentModal";
import { EmployeeBillType } from "@/types";
import { getEmployeeBill } from "@/utils/employeeBillApiRequests";
import { useRouter, useSearchParams } from "next/navigation";
import LoadingSkeleton from "./LoadingSkeleton";
import { logo } from "@/utils/logo";

const PaymentTable = () => {
  const path = useRouter();
  const param = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [totalPage, setTotalPage] = useState<number | undefined>();
  const [currentPage, setCurrentPage] = useState(
    Number(param.get("page")) || 1
  );
  const [employeeBill, setEmployeeBill] = useState<EmployeeBillType[]>([]);

  const [reload, setReload] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEmployeeBill = async () => {
      setIsLoading(true);

      try {
        const response = await getEmployeeBill(currentPage);

        await new Promise((resolve) => setTimeout(resolve, 250));

        if (response.success) {
          const firstElement = response.data[0];

          if (firstElement?.total_page !== null) {
            setTotalPage(firstElement.total_page);
            setEmployeeBill(response.data.slice(1));
          } else {
            console.error("Invalid Response Format: total_page is missing");
            setTotalPage(undefined);
            setEmployeeBill([]);
          }
        } else {
          console.error("Error Fetching Employee Bill:", response.message);
          setTotalPage(undefined);
          setEmployeeBill([]);
        }
      } catch (error) {
        console.error("Unexpected Error Fetching Employee Bill:", error);
        setTotalPage(undefined);
        setEmployeeBill([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmployeeBill();
  }, [currentPage, reload]);

  return (
    <div>
      {isOpen && <PaymentModal setIsopen={setIsOpen} setReload={setReload} />}
      <div className="table-wrapper">
        <TableActions
          setIsOpen={setIsOpen}
          tableName="Payment"
          logo={logo.Payment}
        />

        {isLoading && (
          // <div className="text-primary-foreground tracking-wide text-xl xl:text-4xl text-center font-semibold flex items-center justify-center">
          //   Loading...
          // </div>
          <LoadingSkeleton />
        )}

        {!isLoading && employeeBill.length === 0 && (
          <div className="text-mutated tracking-wide text-xl xl:text-3xl text-center font-semibold xl:my-[6rem] my-[2rem] flex w-full items-center justify-center">
            <div className="w-fit px-6 py-2 rounded-lg cursor-pointer ">
              There are no payment data available
            </div>
          </div>
        )}

        {!isLoading && employeeBill.length > 0 && (
          <div className="overflow-x-auto">
            <div className="w-[45rem] xl:w-full">
              {/* Table Header */}
              <div className="table-header">
                <p className="w-1/12">ID</p>
                <p className="flex-1">Employee</p>
                <p className="flex-1">Products</p>
                <p className="flex-1">Production</p>
                <p className="flex-1">Quantity</p>
                <p className="flex-1">Amount</p>
                <p className="flex-1">Status</p>
                <p className="w-1/12">Date</p>
              </div>
              {/* Table Rows */}
              <div>
                {employeeBill.map((bill, i) => (
                  <div
                    key={i}
                    className="table-col"
                    onClick={() => {
                      path.push(`/payment/${bill.id}`);
                    }}
                  >
                    <div className="w-1/12 truncate-text">{bill.id}</div>
                    <div className="flex-1 truncate-text">
                      {bill.employee.name} ({bill.employee.id})
                    </div>
                    <div className="flex-1 truncate-text">{bill.products}</div>
                    <div className="flex-1 truncate-text">
                      {bill.production}
                    </div>
                    <div className="flex-1 truncate-text">{bill.quantity}</div>
                    <div className="flex-1 truncate-text">
                      {bill.Amount}
                      <span className="xl:text-sm text-[8px]"> TK</span>
                    </div>
                    <div className="flex-1 truncate-text">
                      {bill.current_status}
                    </div>
                    <div className="w-1/12 truncate-text">{bill.date}</div>
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

export default PaymentTable;
