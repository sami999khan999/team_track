"use client";

import { SingleEmployeeBillType } from "@/types";
import { getSingleEmployeeBill } from "@/utils/employeeBillApiRequests";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";

const EmployeePayment = ({ id }: { id: number }) => {
  const path = useRouter();
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

  return (
    <div className="bg-secondary w-full h-full xl:px-12 px-4 py-10 xl:py-8 rounded-xl relative">
      <h2 className="text-primary font-sour_gummy text-2xl border-b border-border_color pb-3 xl:pb-8 xl:text-3xl font-semibold text-center ">
        Employee Bill
      </h2>

      <div
        className="absolute top-4 xl:top-8 left-4 xl:left-8 text-base xl:text-2xl text-primary-foreground px-4 py-1 rounded-md hover:bg-secondary-foreground duration-200"
        onClick={() => path.back()}
      >
        <FaArrowLeftLong />
      </div>

      <div className="mt-6 text-primary-foreground text-xl font-semibold flex flex-col xl:flex-row text-center xl:text-left justify-between gap-5 xl:gap-0">
        <div className="border-4 border-border_color flex-1 px-6 xl:py-3 py-1 rounded-l-md space-y-1 hover:bg-secondary-foreground duration-200">
          <div className="border-b border-border_color">
            <span className="text-primary font-bold font-sour_gummy">ID:</span>{" "}
            {employeeBills?.employee.id}
          </div>
          <div className="font-semibold">{employeeBills?.employee.name}</div>
        </div>
        <div className="border-4 xl:border-y-4 border-border_color flex-1 px-6 xl:py-3 py-1 space-y-1 hover:bg-secondary-foreground duration-200">
          <div className="font-bold text-primary border-b border-border_color font-sour_gummy">
            Paid
          </div>
          <div>
            <span className="font-normal">Grand Total: </span>{" "}
            {employeeBills?.grand_total}
          </div>
        </div>
        <div className="border-4 border-border_color flex-1 px-6 xl:py-3 py-1 rounded-r-md space-y-1 hover:bg-secondary-foreground duration-200">
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
