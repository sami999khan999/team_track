import React from "react";

const DorpdownHeader = ({
  type,
}: {
  type:
    | "product"
    | "employee"
    | "production"
    | "status"
    | "customer"
    | "Method";
}) => {
  return (
    <div className="flex px-4 bg-background rounded-t-md mt-2 gap-10 py-3 font-semibold">
      {type === "employee" && (
        <>
          <div className="w-1/6">ID</div>
          <div className="flex-1 truncate-text">Name</div>
        </>
      )}
      {type === "product" && (
        <>
          <div className="w-1/6">ID</div>
          <div className="flex-1 truncate-text">Name</div>
          <div className="flex-1 truncate-text">Rate</div>
        </>
      )}

      {type === "production" && (
        <>
          <div className="w-1/6">ID</div>
          <div className="flex-1 truncate-text">Product</div>
          <div className="flex-1 truncate-text">Employee</div>
          <div className="flex-1 truncate-text">Quantity</div>
        </>
      )}

      {type === "status" && (
        <>
          <div className="w-1/6">ID</div>
          <div className="flex-1 truncate-text">Status</div>
        </>
      )}

      {type === "customer" && (
        <>
          <div className="w-1/6">ID</div>
          <div className="flex-1 truncate-text">Name</div>
          <div className="flex-1 truncate-text">Company Name</div>
        </>
      )}

      {type === "Method" && <div>Method</div>}
    </div>
  );
};

export default DorpdownHeader;
