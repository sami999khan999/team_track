"use client";

import React, { useState } from "react";
import TableActions from "./TableActions";
import Pagination from "./Pagination";
import PaymentModal from "./PaymentModal";

const PaymentTable = () => {
  const [isOpen, setIsopen] = useState(false);
  const [totalPage, setTotalPage] = useState<number | undefined>(10);
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div>
      {isOpen && <PaymentModal setIsopen={setIsopen} />}
      <div className="w-full h-fit bg-secondary shadow-2xl shadow-[#19253859] px-2 py-6 xl:py-8 xl:px-8 rounded-xl">
        <TableActions setIsOpen={setIsopen} tableName="Payment" />

        <div className="overflow-x-auto">
          <div className="w-fit xl:w-full"></div>
        </div>

        <Pagination
          totalPage={totalPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default PaymentTable;
