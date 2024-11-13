import React from "react";

const DorpdownHeader = ({
  type,
}: {
  type: "product" | "employee" | "production" | "status";
}) => {
  return (
    <div className="flex px-4 bg-background rounded-t-md mt-2 gap-10 py-3 font-semibold">
      {type === "employee" && (
        <>
          <div className="w-1/6">ID</div>
          <div className="flex-1">Name</div>
        </>
      )}
      {type === "product" && (
        <>
          <div className="w-1/6">ID</div>
          <div className="flex-1">Name</div>
          <div className="flex-1">Rate</div>
        </>
      )}

      {type === "production" && (
        <>
          <div className="w-1/6">ID</div>
          <div className="flex-1">Product</div>
          <div className="flex-1">Employee</div>
          <div className="flex-1">Quantity</div>
        </>
      )}

      {type === "status" && (
        <>
          <div className="w-1/6">ID</div>
          <div className="flex-1">Status</div>
        </>
      )}
    </div>
  );
};

export default DorpdownHeader;
