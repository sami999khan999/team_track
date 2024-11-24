import InventoryTable from "@/app/components/InventoryTable";
import React, { Suspense } from "react";

const page = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <InventoryTable />
      </Suspense>
    </div>
  );
};

export default page;
