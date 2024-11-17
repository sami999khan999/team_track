import Invoice from "@/app/components/Invoice";
import React from "react";

const page = async ({ params }: { params: { id: number } }) => {
  const { id } = await params;

  return (
    <div>
      <Invoice id={id} />
    </div>
  );
};

export default page;
