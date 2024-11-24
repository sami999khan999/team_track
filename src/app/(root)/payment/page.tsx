import PaymentTable from "@/app/components/PaymentTable";
import React, { Suspense } from "react";

const page = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <PaymentTable />
      </Suspense>
    </div>
  );
};

export default page;
