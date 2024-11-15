import Invoice from "@/app/components/Invoice";
import React from "react";

const page = ({ params }: { params: { id: number } }) => {
  console.log(params.id);
  return (
    <div>
      <Invoice id={params.id} />
    </div>
  );
};

export default page;
