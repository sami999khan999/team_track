import EmployeeTable from "@/app/components/EmployeeTable";
import React, { Suspense } from "react";

const page = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EmployeeTable />
      </Suspense>
    </div>
  );
};

export default page;
