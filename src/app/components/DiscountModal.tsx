import React, { SetStateAction } from "react";
import { IoCloseSharp } from "react-icons/io5";

const DiscountModal = ({
  isModalOpen,
  discountData,
}: {
  isModalOpen: React.Dispatch<SetStateAction<boolean>>;
  discountData: {
    total: number | undefined;
    total_after_discount: number | undefined;
  };
}) => {
  return (
    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-50 backdrop-blur-lg">
      <div className="xl:w-[60%] w-[95%] bg-secondary border border-border_color rounded-lg xl:px-8 px-4 xl:py-10 py-5 relative">
        <div className="close-btn" onClick={() => isModalOpen(false)}>
          <IoCloseSharp className="transition-transform hover:rotate-90 duration-200 origin-center" />
        </div>
        <h2 className="text-xl xl:text-3xl font-sour_gummy text-primary font-semibold text-center">
          Add Discount
        </h2>
        <div>
          <div>Total Amount: {discountData.total}</div>
        </div>
      </div>
    </div>
  );
};

export default DiscountModal;
