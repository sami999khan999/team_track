"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import TableActions from "./TableActions";
import Pagination from "./Pagination";
import { getProduction } from "@/utils/productionApiRequests";
import ProductionModal from "./ProductionModal";
import { ProductType } from "@/types";

const ProductionTable = () => {
  const path = useRouter();
  const param = useSearchParams();

  const [currentPage, setCurrentPage] = useState(
    Number(param.get("page")) || 1
  );
  const [totalPage, setTotalPage] = useState<number | undefined>(undefined);
  const [isOpen, setIsOpen] = useState(false);
  const [defalutValue, setDefalutValue] = useState<ProductType | undefined>();

  const handleNext = () => {
    setCurrentPage((pre) => pre + 1);
  };

  const handlePrevious = () => {
    setCurrentPage((pre) => pre - 1);
  };

  useEffect(() => {
    const productions = async () => {
      const response = await getProduction(currentPage);
      console.log(response);

      if (response.success) {
        const firstElement = response.data.shift();
        const totalePages = firstElement ? firstElement.total_page : undefined;
        console.log(totalePages);
        setTotalPage(totalePages);
        console.log(totalPage);
      }
    };

    productions();
  }, [currentPage]);

  useEffect(() => {
    path.push(`?page=${currentPage}`);
  }, [currentPage, path]);

  return (
    <div>
      {isOpen && (
        <ProductionModal setIsOpen={setIsOpen} defalutValue={defalutValue} />
      )}
      <div className="w-full h-fit bg-secondary shadow-2xl shadow-[#19253859] px-2 py-6 xl:py-8 xl:px-8 rounded-xl">
        <TableActions tableName="Production" setIsOpen={setIsOpen} />

        {/* Table */}

        <Pagination
          handleNext={handleNext}
          handlePrevious={handlePrevious}
          totalPage={totalPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default ProductionTable;
