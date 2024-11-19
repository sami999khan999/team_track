import { InvoiceType } from "@/types";
import { getInvoice } from "@/utils/invoiceApiRequests";
import React, { SetStateAction, useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import Pagination from "./Pagination";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { IoIosCheckbox } from "react-icons/io";
import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";

const BillInvoiceModal = ({
  setInoviceId,
  invoiceId,
  setIsInvoiceModalOpen,
}: {
  setInoviceId: React.Dispatch<SetStateAction<number[] | undefined>>;
  invoiceId: number[] | undefined;
  setIsInvoiceModalOpen: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const [invoiceData, setInvoiceData] = useState<InvoiceType[]>([]);
  const [invoiceCurrentPage, setInvoiceCurrentPage] = useState(1);
  const [invoiceTotalPage, setInvoiceTotalPage] = useState<
    number | undefined
  >();

  useEffect(() => {
    const fetchInvoiceData = async () => {
      const response = await getInvoice(invoiceCurrentPage);

      if (response.success) {
        const firstElement = response.data.shift();
        const totalPage = firstElement.total_page;

        setInvoiceData(response.data);
        // setInvoiceTotalPage(totalPage);
      }
    };

    fetchInvoiceData();
  }, [setIsInvoiceModalOpen]);

  return (
    <div className="absolute top-0 left-0 h-full w-full backdrop-blur-lg flex items-center justify-center z-50">
      <div className="relative border border-border_color rounded-xl bg-secondary w-[95%] xl:w-[60%] px-2 xl:px-6 ">
        <div
          className="absolute top-3 xl:top-5 right-3 xl:right-5 text-2xl text-primary-foreground hover:bg-primary hover:text-background p-1 rounded-sm"
          onClick={() => {
            setIsInvoiceModalOpen((prv) => !prv);
            invoiceId &&
              setInoviceId(invoiceId?.length === 0 ? undefined : invoiceId);
          }}
        >
          <IoCloseSharp className="transition-transform hover:rotate-90 duration-200 origin-center" />
        </div>

        <div>
          <p className="xl:text-3xl text-2xl text-primary font-semibold text-center py-6">
            Select Inovice
          </p>
        </div>

        <div className="xl:mb-8">
          <div className="xl:h-[20rem] h-[14rem] overflow-y-auto remove-scrollbar">
            <div className="flex text-primary-foreground justify-between px-4 xl:px-6 py-2 xl:py-4 xl:text-lg text-sm gap-3 bg-background font-semibold tracking-wide uppercase ">
              <p className="w-1/12 xl:w-2/12">ID</p>
              <p className="flex-1 truncate-text">Products</p>

              <p className="flex-1 truncate-text">Status</p>
              <p className="flex-1">Date</p>
              <p className="">Select</p>
            </div>

            {/* Table Body */}
            <div>
              {invoiceData.map((item, i) => (
                <div>
                  <div
                    key={i}
                    className="flex text-primary-foreground bg-secondary justify-between border-b border-secondary-foreground px-4 xl:px-6 py-2 xl:py-4 text-sm xl:text-lg gap-3 relative hover:bg-secondary-foreground duration-200 font-medium"
                  >
                    <div className="w-1/12 xl:w-2/12 truncate-text">
                      {item.id}
                    </div>

                    <div className="flex-1 truncate-text">{item.total}</div>
                    <div className="flex-1 truncate-text">
                      {item.current_status}
                    </div>
                    <div className="flex-1 truncate-text">{item.date}</div>
                    <div
                      className="flex items-center justify-center xl:px-5 px-4"
                      onClick={() => {
                        if (invoiceId?.includes(item.id)) {
                          setInoviceId((prv) =>
                            prv?.filter((ele) => ele !== item.id)
                          );
                        } else {
                          setInoviceId((prv) =>
                            prv ? [...prv, item.id] : [item.id]
                          );
                        }
                      }}
                    >
                      {invoiceId?.includes(item.id) ? (
                        <ImCheckboxChecked />
                      ) : (
                        <ImCheckboxUnchecked />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Pagination
              totalPage={invoiceTotalPage}
              currentPage={invoiceCurrentPage}
              setCurrentPage={setInvoiceCurrentPage}
            />
          </div>
        </div>

        <div className="w-full flex items-center justify-center mb-6">
          <button
            className="bg-primary text-background font-semibold text-base xl:text-2xl w-full xl:w-fit px-20 py-1 rounded-full hover:bg-primary-foreground duration-200 mt-4"
            onClick={() => setIsInvoiceModalOpen(false)}
          >
            Select
          </button>
        </div>
      </div>
    </div>
  );
};

export default BillInvoiceModal;
