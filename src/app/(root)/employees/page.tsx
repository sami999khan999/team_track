import EmployeeTable from "@/app/components/EmployeeTable";
import React from "react";
import { HiPlus } from "react-icons/hi";

const page = () => {
  // const totalPage = 10;
  return (
    <div className="w-full rounded-t-[1.3rem] ">
      {/* employee table */}
      <EmployeeTable />
    </div>
  );
};

export default page;
