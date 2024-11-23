"use client";

import React, { useState } from "react";
import TableActions from "./TableActions";
import MemoModal from "./MemoModal";

const MemoTable = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {isOpen && <MemoModal setIsOpen={setIsOpen} />}
      <div className="w-full h-fit bg-secondary shadow-2xl shadow-[#19253859] px-2 py-6 xl:py-8 xl:px-8 rounded-xl mb-10">
        <TableActions setIsOpen={setIsOpen} tableName="Cash Memo" />
      </div>
    </div>
  );
};

export default MemoTable;
