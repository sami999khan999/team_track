import { InventoryType, PorductionType, ProductType } from "@/types";
import React, { SetStateAction, useEffect, useState } from "react";
import DeleteModal from "./DeleteModal";
import ProductionDropdown from "./ProductionDropdown";
import { getProduction } from "@/utils/productionApiRequests";
import { createInventory } from "@/utils/inventoryApiRequests";

const InventoryModal = ({
  setIsOpen,
  defaultValue,
  setDefalutValue,
  action,
  setReload,
}: {
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
  defaultValue?: InventoryType | undefined;
  setDefalutValue?: React.Dispatch<SetStateAction<InventoryType | undefined>>;
  action: "create" | "update" | "delete" | undefined;
  setReload: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const [production, setProduction] = useState<PorductionType[]>();
  const [productionTotalPage, setProductionTotalPage] = useState<
    number | undefined
  >();
  const [productionCurrentPage, setProductionCurrentPage] = useState(1);
  const [productionId, setProductionId] = useState<number | undefined>();
  const [statusCurrentPage, setStatusCurrentPage] = useState(1);
  const [productionStatus, setProductionStatus] = useState<
    string | undefined
  >();
  const [activeProduction, setActiveProduction] = useState<
    PorductionType | undefined
  >();
  const [inputError, setInputError] = useState({
    productionId: "",
    status: "",
  });

  // console.log(productionId);
  // console.log(productionStatus);

  const adtiveElement = {
    id: defaultValue?.id,
    name: defaultValue?.product.name,
  };

  const status = [
    {
      status: "IN-STOCK",
    },
    {
      status: "OUT-OF-STOCK",
    },
  ];

  const handleSubmit = async () => {
    const newError = {
      productionId: !productionId ? "Select a Porduction to continue..." : "",
      status: !productionStatus ? "Select Porduction to continue..." : "",
    };

    const hasError = Object.values(newError).some(
      (errorMessage) => errorMessage !== ""
    );

    if (hasError) {
      setInputError(newError);
      return;
    } else {
      const data = {
        production: productionId,
        current_status: productionStatus,
      };

      if (action === "create") {
        const response = await createInventory(data);

        if (response.success) {
          setIsOpen(false);
          setReload(true);
        }
      }
    }
  };
  const deleteHandler = () => {};

  useEffect(() => {
    const productions = async () => {
      const response = await getProduction(productionCurrentPage);

      if (response.success) {
        const firstElement = response.data.shift();
        const totalPages = firstElement.total_page;

        setActiveProduction(
          response.data?.find(
            (element: ProductType) => element.id === defaultValue?.product.id
          )
        );
        console.log(defaultValue);
        setProductionTotalPage(totalPages);
        setProduction(response.data);
      }
    };

    productions();
  }, [productionCurrentPage]);

  useEffect(() => {
    if (defaultValue) {
      setProductionId(defaultValue.id);
      setProductionStatus(defaultValue.status);
    }
  }, [defaultValue]);

  useEffect(() => {
    setActiveProduction(
      production?.find((element) => element.id === productionId)
    );
  }, [productionId]);

  return (
    <>
      {action === "delete" ? (
        <DeleteModal
          activeElement={adtiveElement}
          handler={deleteHandler}
          setIsOpen={setIsOpen}
          title={"Production"}
        />
      ) : (
        <div
          className="absolute top-0 left-0 w-full h-full backdrop-blur-md flex items-center justify-center z-20"
          onClick={() => {
            setIsOpen((prv) => !prv);
            if (setDefalutValue) {
              setDefalutValue(undefined);
            }
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-secondary w-[90%] xl:w-[80%] border border-border_color rounded-xl px-3 xl:px-8 py-6 xl:py-8"
          >
            <div className="text-primary-foreground text-center border-b border-border_color pb-6 xl:pb-8">
              {defaultValue ? (
                <div className="text-xl xl:text-3xl font-semibold flex flex-col items-center justify-center gap-2">
                  <p>Update Production</p>
                  <div className="hidden xl:block text-base w-[60%]">
                    To update production records, include{" "}
                    <span className="text-primary">
                      dropdowns for selecting an employee and product
                    </span>
                    , along with input fields for rate and quantity. This
                    ensures accurate assignments and streamlines data tracking.
                  </div>
                </div>
              ) : (
                <div className="text-xl xl:text-3xl font-semibold flex flex-col items-center justify-center gap-2">
                  <p>Creaate Production</p>
                  <div className="hidden xl:block text-base w-[60%]">
                    To create production records, include{" "}
                    <span className="text-primary">
                      dropdowns for selecting an employee and product
                    </span>
                    , along with input fields for rate and quantity. This
                    ensures accurate assignments and streamlines data tracking.
                  </div>
                </div>
              )}
            </div>
            <div className="flex flex-col xl:flex-row mt-6 xl:mt-8 gap-6 xl:gap-10">
              <div className="xl:w-[50%] space-y-3">
                <p className="text-primary-foreground text-xl font-medium text-center">
                  Select{" "}
                  <span className="text-primary font-semibold">Production</span>{" "}
                  and
                  <span className="text-primary font-semibold"> Status</span>
                </p>
                <div className="space-y-9">
                  <ProductionDropdown
                    data={production}
                    totalPage={productionTotalPage}
                    currentPage={productionCurrentPage}
                    setCurrentPage={setProductionCurrentPage}
                    setId={setProductionId}
                    defalutValue={defaultValue}
                    type="production"
                  />
                  <ProductionDropdown
                    data={status}
                    currentPage={statusCurrentPage}
                    setCurrentPage={setStatusCurrentPage}
                    defalutValue={defaultValue}
                    setValue={setProductionStatus}
                    type="status"
                  />
                </div>
              </div>
              <div className="border-b xl:border-l border-border_color"></div>

              <div className="xl:w-[50%] space-y-2 xl:space-y-3">
                {activeProduction && (
                  <div className="text-primary-foreground text-base xl:text-[21px] flex gap-4">
                    <div className="flex flex-col gap-2">
                      <p className="font-semibold">Production ID: </p>
                      <p className="font-semibold">Product: </p>
                      <p className="font-semibold">Employee: </p>
                      <p className="font-semibold">Rate: </p>
                      <p className="font-semibold">Quantity: </p>
                      <p className="font-semibold">Date: </p>
                    </div>
                    <div className="flex flex-col gap-2 w-[60%] xl:w-[80%] font-medium">
                      <p className="rounded-sm px-3">{activeProduction.id}</p>
                      <p className="px-3">{activeProduction.product.name}</p>
                      <p className="px-3">{activeProduction.employee.name}</p>
                      <p className="px-3">{activeProduction.rate}</p>
                      <p className="px-3">{activeProduction.quantity}</p>
                      <p className="px-3">{activeProduction.date}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="w-full flex items-center justify-center mt-5 xl:mt-8">
              <button
                className="bg-primary w-full py-2 xl:py-3 font-semibold text-background text-base xl:text-[1.4rem] rounded-full"
                onClick={handleSubmit}
              >
                {defaultValue ? "Update" : "Create"} Inventory
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default InventoryModal;
