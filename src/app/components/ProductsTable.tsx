"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import ProductModal from "./ProductModal";
import Pagination from "./Pagination";
import TableActions from "./TableActions";

const products = [
  { id: 1, name: "Wireless Mouse", category: "Electronics", rate: 29.99 },
  { id: 2, name: "Laptop Stand", category: "Accessories", rate: 19.99 },
  {
    id: 3,
    name: "Bluetooth Headphones",
    category: "Electronics",
    rate: 59.99,
  },
  { id: 4, name: "Smartphone Charger", category: "Electronics", rate: 15.49 },
  { id: 5, name: "USB Flash Drive", category: "Accessories", rate: 9.99 },
  { id: 6, name: "Gaming Keyboard", category: "Electronics", rate: 89.99 },
  { id: 7, name: "Smartwatch", category: "Electronics", rate: 199.99 },
  { id: 8, name: "Bluetooth Speaker", category: "Electronics", rate: 49.99 },
  { id: 9, name: "Phone Case", category: "Accessories", rate: 12.99 },
  {
    id: 10,
    name: "External Hard Drive",
    category: "Electronics",
    rate: 119.99,
  },
];

const ProductsTable = () => {
  const param = useSearchParams();
  const path = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState<
    "create" | "update" | "delete" | undefined
  >();
  const [activeId, setActiveId] = useState<number | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(
    Number(param.get("page")) || 1
  );
  const [totalPage, setTotalPage] = useState<number | undefined>(10);
  const [reload, setReload] = useState(false);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < (totalPage || 0)) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const columns = products.length > 0 ? Object.keys(products[0]) : [];

  const activeProduct = products.find((porduct) => porduct.id === activeId);

  useEffect(() => {
    path.push(`?page=${currentPage}`);
  }, [currentPage, path]);

  return (
    <div>
      {isModalOpen && (
        <ProductModal
          modalAction={modalAction}
          activeProduct={activeProduct}
          setIsModalOpen={setIsModalOpen}
        />
      )}
      <div className="w-full h-fit bg-white px-2 py-6 xl:py-8 xl:px-8 rounded-[1.3rem] border">
        <TableActions
          setIsOpen={setIsModalOpen}
          tableName="Products"
          setModalAction={setModalAction}
        />

        <div>
          <div className="flex border px-4 xl:px-6 py-2 xl:py-4 xl:text-lg gap-2 mt-3 text-xs bg-secondary text-secondary-foreground">
            {columns.map((cols, i) => (
              <div className={`${i === 0 ? "w-1/12" : "flex-1"}`}>{cols}</div>
            ))}
            <div>Actions</div>
          </div>
          <div className="">
            {products.map((product, i) => (
              <div className="flex justify-between border-b px-4 xl:px-6 py-2 xl:py-4 xl:text-lg gap-2 text-xs bg-white text-secondary-foreground relative">
                <div className="w-1/12 truncate-text">{product.id}</div>
                <div className="flex-1 truncate-text">{product.name}</div>
                <div className="flex-1 truncate-text">{product.category}</div>
                <div className="flex-1 truncate-text">{product.rate}</div>
                <div className="flex items-center gap-2 text-secondary-foreground">
                  <div
                    className="hover:bg-primary p-1 rounded hover:text-gray-200 duration-200"
                    onClick={() => {
                      setActiveId(product.id);
                      setModalAction("update");
                      setIsModalOpen(true);
                    }}
                  >
                    <MdOutlineEdit />
                  </div>
                  <div
                    className="hover:bg-primary p-1 rounded hover:text-gray-200 duration-200"
                    onClick={() => {
                      setActiveId(product.id);
                      setModalAction("delete");
                      setIsModalOpen(true);
                    }}
                  >
                    <RiDeleteBin6Line />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

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

export default ProductsTable;
