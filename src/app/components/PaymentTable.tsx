"use client";

import React, { useEffect, useState } from "react";
import TableActions from "./TableActions";
import Pagination from "./Pagination";
import PaymentModal from "./PaymentModal";
import { EmployeeBillType } from "@/types";
import { getEmployeeBill } from "@/utils/employeeBillApiRequests";
import { useRouter, useSearchParams } from "next/navigation";

const PaymentTable = () => {
  const path = useRouter();
  const param = useSearchParams();
  const [isOpen, setIsopen] = useState(false);
  const [totalPage, setTotalPage] = useState<number | undefined>(10);
  const [currentPage, setCurrentPage] = useState(
    Number(param.get("page")) || 1
  );
  const [employeeBill, setEmployeeBill] = useState<
    EmployeeBillType[] | undefined
  >([]);
  const [reload, setReload] = useState(false);

  const columns = employeeBill?.length ? Object.keys(employeeBill[0]) : [];

  useEffect(() => {
    const fetchEmployeeBill = async () => {
      const response = await getEmployeeBill(currentPage);

      if (response.success) {
        const firstElement = response.data.shift();
        const totalPage = firstElement.total_page;

        setTotalPage(totalPage);
        setEmployeeBill(response.data);
      }
    };

    fetchEmployeeBill();
  }, [currentPage, reload]);

  console.log(employeeBill);

  return (
    <div>
      {isOpen && <PaymentModal setIsopen={setIsopen} setReload={setReload} />}
      <div className="w-full h-fit bg-secondary shadow-2xl shadow-[#19253859] px-2 py-6 xl:py-8 xl:px-8 rounded-xl">
        <TableActions setIsOpen={setIsopen} tableName="Payment" />

        <div className="overflow-x-auto">
          <div className="w-[55rem] xl:w-full">
            <div className="flex text-primary-foreground justify-between px-4 xl:px-6 py-2 xl:py-4 xl:text-lg text-xs gap-4 mt-3 bg-background font-semibold tracking-wide uppercase">
              {columns.map((column, i) => (
                <div
                  key={i}
                  className={`text-primary-foreground ${
                    i === 0 ? "w-1/12" : "flex-1"
                  }`}
                >
                  {column}
                </div>
              ))}
            </div>
            <div>
              {employeeBill?.map((bill, i) => (
                <div
                  key={i}
                  className="flex text-primary-foreground justify-between border-b border-secondary-foreground px-4 xl:px-6 py-2 xl:py-4 text-xs xl:text-lg gap-4 relative hover:bg-secondary-foreground duration-200 font-medium bg-secondary capitalize"
                  onClick={() => {
                    path.push(`/payment/${bill.id}`);
                  }}
                >
                  <div className="w-1/12">{bill.id}</div>
                  <div className="flex-1">
                    {bill.employee.name} ({bill.employee.id})
                  </div>
                  <div className="flex-1">{bill.products}</div>
                  <div className="flex-1">{bill.production}</div>
                  <div className="flex-1">{bill.quantity}</div>
                  <div className="flex-1">{bill.Amount}</div>
                  <div className="flex-1">{bill.current_status}</div>
                  <div className="flex-1">{bill.date}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

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
