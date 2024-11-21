import CustomerTable from "@/app/components/CustomerTable";
import { Suspense } from "react";

const page = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <CustomerTable />
      </Suspense>
    </div>
  );
};

export default page;
