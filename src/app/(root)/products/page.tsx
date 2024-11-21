import ProductsTable from "@/app/components/ProductsTable";
import React, { Suspense } from "react";

const page = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <ProductsTable />
      </Suspense>
    </div>
  );
};

export default page;
