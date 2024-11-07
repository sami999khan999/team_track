import React from "react";

const page = ({ params }: { params: { id: number } }) => {
  console.log(params.id);
  return <div>page</div>;
};

export default page;
