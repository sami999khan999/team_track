import ProductionTable from "@/app/components/ProductionTable";
import React, { Suspense } from "react";

const page = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <ProductionTable />
      </Suspense>
    </div>
  );
};

export default page;
