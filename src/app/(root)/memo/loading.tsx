import React from "react";
import { CgSpinnerTwo } from "react-icons/cg";

const loading = () => {
  return (
    <div className="flex w-full h-screen">
      <CgSpinnerTwo className="animate-spin text-primary-foreground dark:text-primary-foreground xl:text-[5rem] text-4xl" />
    </div>
  );
};

export default loading;
