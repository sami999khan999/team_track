import EmployeeTable from "@/app/components/EmployeeTable";
import React from "react";
import { HiPlus } from "react-icons/hi";

const page = () => {
  const totalPage = 10;
  return (
    <div className="bg-secondary w-full mt-[5rem] rounded-t-[1.3rem] p-3 xl:p-8">
      <div className="flex justify-end">
        <div className="bg-primary text-sm lg:text-xl w-fit py-2 lg:py-3 px-3 lg:px-5 flex items-center gap-3 rounded self-end text-secondary font-medium hover:bg-primary/90 duration-300 group">
          <HiPlus className="text-2xl transition-transform group-hover:rotate-180 origin-center" />

          <p>Add Employee</p>
        </div>
      </div>

      {/* employee table */}
      <EmployeeTable />
    </div>
  );
};

export default page;
