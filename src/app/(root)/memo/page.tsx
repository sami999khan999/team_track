import MemoTable from "@/app/components/MemoTable";
import { Suspense } from "react";

const page = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading..............</div>}>
        <MemoTable />
      </Suspense>
    </div>
  );
};

export default page;
