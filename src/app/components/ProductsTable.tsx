"use client";

import { ProductType } from "@/types";
import { getProducts } from "@/utils/productApiRequests";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import Pagination from "./Pagination";
import ProductModal from "./ProductModal";
import TableActions from "./TableActions";

const ProductsTable = () => {
  const param = useSearchParams();
  const path = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState<
    "create" | "update" | "delete" | undefined
  >();
  const [activeId, setActiveId] = useState<number | undefined | string>(
    undefined
  );
  const [currentPage, setCurrentPage] = useState(
    Number(param.get("page")) || 1
  );
  const [totalPage, setTotalPage] = useState<number | undefined>(10);
  const [reload, setReload] = useState(false);
  const [products, setProducts] = useState<ProductType[]>([]);

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
    const productsGet = async () => {
      const response = await getProducts(currentPage);

      if (response.success) {
        const firstElement = response.data.shift();
        const totalePage = firstElement ? firstElement.total_page : undefined;

        setProducts(response?.data);
        console.log(products);
        setTotalPage(totalePage);
      }
    };

    productsGet();
  }, [reload, currentPage]);

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
          setReload={setReload}
          reload={reload}
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
              <div
                className={`${
                  i === 0
                    ? "w-1/12 uppercase                                                     "
                    : "flex-1"
                } capitalize`}
              >
                {cols}
              </div>
            ))}
            <div>Actions</div>
          </div>
          <div className="">
            {products.map((product, i) => (
              <div className="flex justify-between border-b px-4 xl:px-6 py-2 xl:py-4 xl:text-lg gap-2 text-xs bg-white text-secondary-foreground relative">
                <div className="w-1/12 truncate-text">{product.id}</div>
                <div className="flex-1 truncate-text">{product.name}</div>
                <div className="flex-1 truncate-text">{product.rate}</div>
                <div className="flex-1 truncate-text">
                  {product.catagory_name}
                </div>
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
