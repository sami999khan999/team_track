import React from "react";
import { HiPlus } from "react-icons/hi";

const AddButton = ({ text }: { text: string }) => {
  return (
    <div className="flex justify-end mb-4">
      <div className="bg-primary text-sm lg:text-xl w-full xl:w-fit text-center py-2 lg:py-3 px-3 lg:px-5 flex items-center gap-3 rounded self-end text-secondary font-medium hover:bg-primary/90 duration-300 group justify-center">
        <HiPlus className="text-2xl transition-transform group-hover:rotate-180 origin-center" />

        <p className="text-center text-base">{text}</p>
      </div>
    </div>
  );
};

export default AddButton;
