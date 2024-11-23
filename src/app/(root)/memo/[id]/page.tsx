import React from "react";

const page = ({ params }: { params: { id: number } }) => {
  const { id } = params;
  return <div>page</div>;
};

export default page;
