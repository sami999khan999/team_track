import MemoTable from "@/app/components/MemoTable";
import { Suspense } from "react";

const page = () => {
  return (
    <div>
      {/* <Suspense fallback={<div className="text-primary-foreground"></div>}> */}
      <MemoTable />
      {/* </Suspense> */}
    </div>
  );
};

export default page;
