import MemoSingleView from "@/app/components/MemoSingleView";
import React from "react";

const page = async ({ params }: { params: { id: number } }) => {
  const { id } = await params;
  return (
    <div>
      <MemoSingleView id={id} />
    </div>
  );
};

export default page;
