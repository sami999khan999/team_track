"use client";

import { useRouter } from "next/navigation";
import React, { SetStateAction } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Pagination = ({
  handleNext,
  handlePrevious,
  totalPage,
  setCurrentPage,
  currentPage,
}: {
  handleNext: () => void;
  handlePrevious: () => void;
  totalPage: number | undefined;
  setCurrentPage: React.Dispatch<SetStateAction<number>>;
  currentPage: number;
}) => {
  const path = useRouter();

  const pageNumber = () => {
    const pages: number[] = [];
    const pagesToShow = 5;
    const start = Math.floor((currentPage - 1) / pagesToShow) * pagesToShow + 1;
    const end = Math.min(start + pagesToShow - 1, totalPage!);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };
  return (
    <div className="flex items-center mt-6 xl:gap-4 justify-center mb-16 xl:mb-0">
      <div className="flex items-center justify-center text-sm xl:text-xl gap-5 border xl:px-8 px-3 py-2 rounded w-fit cursor-pointer">
        <button onClick={handlePrevious} disabled={currentPage === 1}>
          <IoIosArrowBack />
        </button>

        <div className=" flex gap-3 items-center">
          <div className=" xl:w-[10rem] flex items-center">
            {pageNumber().map((i) => (
              <div
                key={i}
                className={`px-2 py-1 rounded-sm text-center ${
                  currentPage === i && "bg-primary text-secondary"
                }`}
                onClick={() =>
                  setCurrentPage(() => {
                    path.push(`?page=${i}`);
                    return i;
                  })
                }
              >
                {i}
              </div>
            ))}
          </div>
          <p className="px-4">•••</p>
          <p
            onClick={() =>
              setCurrentPage(() => {
                path.push(`?page=${totalPage}`);
                return totalPage!;
              })
            }
          >
            {totalPage}
          </p>
        </div>

        <button onClick={handleNext} disabled={currentPage === totalPage}>
          <IoIosArrowForward />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
