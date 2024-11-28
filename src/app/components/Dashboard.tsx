"use client";

import React, { useState } from "react";
import DashboardModal from "./DashboardModal";
import { IoMdAdd } from "react-icons/io";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [reload, setReload] = useState(true);

  return (
    <div className="">
      {isOpen && (
        <DashboardModal
          setIsOpen={setIsOpen}
          setReload={setReload}
          reload={reload}
        />
      )}
      <div
        className="absolute xl:bottom-10 bottom-16 xl:right-10 right-4 text-primary-foreground xl:text-4xl text-2xl border border-border_color rounded-full p-3 hover:text-primary bg-background group transition-all duration-200 xl:w-[4rem] w-[3rem] hover:xl:w-[10rem] hover:w-[8rem]"
        onClick={() => setIsOpen((prv) => !prv)}
      >
        <p className="opacity-0 group-hover:opacity-100 absolute bottom-[7px] xl:bottom-3 right-0 bg-background text-xl text-primary-foreground px-2 py-1 rounded-md shadow-md transition-all duration-200 group-hover:-translate-x-2 font-semibold">
          Invoice
        </p>
        <IoMdAdd className="text-right" />
      </div>
    </div>
  );
};

export default Dashboard;
