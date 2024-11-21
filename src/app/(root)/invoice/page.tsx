import InvoiceTable from "@/app/components/InvoiceTable";
import React, { Suspense } from "react";

const page = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <InvoiceTable />
      </Suspense>
    </div>
  );
};

export default page;
