"use client";

import { SingleEmployeeBillType } from "@/types";
import { getSingleEmployeeBill } from "@/utils/employeeBillApiRequests";
import React, { useEffect, useState } from "react";

const EmployeePayment = ({ id }: { id: number }) => {
  const [employeeBills, setEmployeeBills] = useState<
    SingleEmployeeBillType | undefined
  >();

  useEffect(() => {
    const fetchEmployeeBill = async () => {
      const response = await getSingleEmployeeBill(id);

      if (response.success) {
        setEmployeeBills(response.data);
      }
    };
    fetchEmployeeBill();
  }, [id]);

  console.log(employeeBills);

  return (
    <div className="bg-secondary w-full h-full xl:px-12 px-4 py-3 xl:py-8">
      <h2 className="text-primary font-sour_gummy text-2xl border-b border-border_color pb-3 xl:pb-8 xl:text-3xl font-semibold text-center">
        Employee Bill
      </h2>

      <div className="mt-6 text-primary-foreground text-xl font-semibold flex flex-col xl:flex-row text-center xl:text-left justify-between gap-5">
        <div className="bg-secondary-foreground flex-1 px-3 py-1 rounded-md space-y-1 hover:shadow-xl cursor-pointer duration-200 hover:scale-105">
          <div className="border-b border-border_color">
            <span className="text-primary font-bold font-sour_gummy">ID:</span>{" "}
            {employeeBills?.employee.id}
          </div>
          <div className="font-semibold">{employeeBills?.employee.name}</div>
        </div>
        <div className="bg-secondary-foreground flex-1 px-3 py-1 rounded-md space-y-1">
          <div className="font-bold text-primary border-b border-border_color font-sour_gummy">
            Paid
          </div>
          <div>
            <span className="font-normal">Grand Total: </span>{" "}
            {employeeBills?.grand_total}
          </div>
        </div>
        <div className="bg-secondary-foreground flex-1 px-3 py-1 rounded-md space-y-1">
          <div className="font-bold text-primary border-b border-border_color font-sour_gummy">
            Date
          </div>
          <div>{employeeBills?.date}</div>
        </div>
      </div>

      <div className="overflow-x-auto mt-8">
        <div className="w-[35rem] xl:w-full">
          <div className="flex bg-background text-primary-foreground justify-between px-4 py-3 rounded-t-lg font-semibold text-lg xl:text-xl gap-3">
            <p className="w-1/12">ID</p>
            <p className="flex-1">Products</p>
            <p className="flex-1">Quantity</p>
            <p className="flex-1">Rate</p>
            <p className="flex-1">Total QTY</p>
            <p className="flex-1">Amount</p>
          </div>
          <div>
            {employeeBills?.data.map((item, i) => (
              <div
                key={i}
                className="flex justify-between bg-secondary text-primary-foreground px-4 py-2 border-b border-border_color hover:bg-secondary-foreground duration-200 xl:text-lg text-base gap-3"
              >
                <p className="w-1/12">{item.sl_no}</p>
                <p className="flex-1">{item.products}</p>
                <p className="flex-1">{item.quantity}</p>
                <p className="flex-1">{item.rate}</p>
                <p className="flex-1">{item.total_qty}</p>
                <p className="flex-1">{item.amount}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeePayment;
