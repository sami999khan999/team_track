"use client";

import React, { SetStateAction, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import AddFormModal from "./AddFormModal";
import ProductionModal from "./ProductionModal";
import ProductModal from "./ProductModal";
import Dropdown from "./Dropdown";
import {
  CustomerType,
  DashboardProductionType,
  DropdownType,
  EmployeeType,
  ProductType,
} from "@/types";
import { getCustoer } from "@/utils/customerApiRerquest";
import { getProducts } from "@/utils/productApiRequests";
import { getEmployee } from "@/utils/employeeApiRequest";

const DashboardModal = ({
  setIsOpen,
  setReload,
  reload,
}: {
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
  setReload: React.Dispatch<SetStateAction<boolean>>;
  reload: boolean;
}) => {
  const [createAction, setCreateAction] = useState<
    "employee" | "customer" | "product" | "production"
  >();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [customers, setCustomers] = useState<CustomerType[]>([]);
  const [customerTotalPage, setCustomerTotalPage] = useState<
    number | undefined
  >();
  const [customerCurrentPage, setCustomerCurrentPage] = useState(1);
  const [selectedCustomer, setSelectedCustomer] = useState<
    number | undefined
  >();
  const [customerSelecteonError, setCustomerSelecteonError] = useState("");

  const [employees, setEmployees] = useState<EmployeeType[]>([]);
  const [employeeTotalPage, setEmployeeTotalPage] = useState<
    number | undefined
  >();
  const [employeeCurrentPage, setEmployeeCurrentPage] = useState(1);

  const [products, setProducts] = useState<ProductType[]>([]);
  const [productTotalPage, setProductTotalPage] = useState<
    number | undefined
  >();
  const [productCurrentPage, setProductCurrentPage] = useState(1);

  const [selectedEmployee, setSelectedEmployee] = useState<
    number | undefined
  >();
  const [selectedProduct, setSelectedProduct] = useState<number | undefined>();

  const [productions, setProductions] = useState<DashboardProductionType[]>([]);
  const [activeProductionIndex, setActiveProductionIndex] = useState<
    number | undefined
  >();

  const [quantity, setQuantity] = useState("");

  const [employeeDefaultValue, setEmployeeDefaultValue] = useState<
    DropdownType | undefined
  >();
  const [productDefaultValue, setProductDefaultValue] = useState<
    DropdownType | undefined
  >();

  const [employeeName, setEmployeeName] = useState<string | undefined>();
  const [productName, setProductName] = useState<string | undefined>();

  const [employeeSelectionError, setEmployeeSelectionError] = useState("");
  const [productSelectionError, setProductSelectionError] = useState("");
  const [quantityError, setQuantityError] = useState("");

  const addProductions = () => {
    if (activeProductionIndex !== undefined) {
      const error = {
        employee: "",
        product: "",
        quantity: "",
      };

      if (selectedEmployee === undefined) {
        error.employee = "Please select an employee";
      }

      if (selectedProduct === undefined) {
        error.product = "Please select a product";
      }

      if (quantity === "") {
        error.quantity = "Please enter a quantity";
      }

      if (error.employee || error.product || error.quantity) {
        if (error.employee) {
          setEmployeeSelectionError(error.employee);
        }

        if (error.product) {
          setProductSelectionError(error.product);
        }

        if (error.quantity) {
          setQuantityError(error.quantity);
        }

        return;
      }

      const data = {
        employee: {
          id: selectedEmployee,
          name: employeeName,
        },
        product: {
          id: selectedProduct,
          name: productName,
        },
        quantity: quantity,
      };

      const updatedProductions = productions.map((production, index) =>
        index === activeProductionIndex ? data : production
      );

      setProductions(updatedProductions);

      setQuantity("");
      setEmployeeDefaultValue({
        employee: {
          name: "",
        },
      });
      setProductDefaultValue({
        product: {
          name: "",
        },
      });
      setSelectedProduct(undefined);
      setSelectedEmployee(undefined);
      setActiveProductionIndex(undefined);
    } else {
      const error = {
        employee: "",
        product: "",
        quantity: "",
      };

      if (selectedEmployee === undefined) {
        error.employee = "Please select an employee";
      }

      if (selectedProduct === undefined) {
        error.product = "Please select a product";
      }

      if (quantity === "") {
        error.quantity = "Please enter a quantity";
      }

      if (error.employee || error.product || error.quantity) {
        if (error.employee) {
          setEmployeeSelectionError(error.employee);
        }

        if (error.product) {
          setProductSelectionError(error.product);
        }

        if (error.quantity) {
          setQuantityError(error.quantity);
        }

        return;
      }

      const data = {
        employee: {
          id: selectedEmployee,
          name: employeeName,
        },
        product: {
          id: selectedProduct,
          name: productName,
        },
        quantity: quantity,
      };

      setProductions([...productions, data]);
      setQuantity("");
      setEmployeeDefaultValue({
        employee: {
          name: "",
        },
      });
      setProductDefaultValue({
        product: {
          name: "",
        },
      });
      setSelectedProduct(undefined);
      setSelectedEmployee(undefined);
    }
  };

  const removeHandler = (index: number) => {
    setProductions((prv) => prv.filter((_, i) => i !== index));
  };

  // Fetch customer
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await getCustoer(customerCurrentPage);

        if (response.success) {
          const firstElement = response.data[0];

          if (firstElement.total_page !== null) {
            setCustomerTotalPage(firstElement.total_page);
            setCustomers(response.data.slice(1));
          } else {
            console.error("Invalid Response Format: total_page is missing");
            setCustomers([]);
            setCustomerTotalPage(undefined);
          }
        } else {
          console.error("Error While Fetching Cusotmers: ", response.message);
          setCustomers([]);
          setCustomerTotalPage(undefined);
        }
      } catch (err) {
        console.log("Unexpected Error While Fetching Customers: ", err);
        setCustomers([]);
        setCustomerTotalPage(undefined);
      }
    };

    fetchCustomers();
  }, [customerCurrentPage]);

  // Fetch Employees
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await getEmployee(employeeCurrentPage);

        if (response.success) {
          const firstElement = response.data[0];

          if (firstElement.total_page !== null) {
            setEmployeeTotalPage(firstElement.total_page);
            setEmployees(response.data.slice(1));
          } else {
            console.error("Invalid Response Format: total_page is missing");
            setEmployees([]);
            setEmployeeTotalPage(undefined);
          }
        } else {
          console.error("Error While Fetching Employees: ", response.message);
          setEmployees([]);
          setEmployeeTotalPage(undefined);
        }
      } catch (err) {
        console.error("Unexpected Error While Fetching Employees: ", err);
        setEmployees([]);
        setEmployeeTotalPage(undefined);
      }
    };

    fetchEmployees();
  }, [employeeCurrentPage]);

  // Fetch Products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts(productCurrentPage);

        if (response.success) {
          const firstElement = response.data[0];

          if (firstElement.total_page !== null) {
            setProductTotalPage(firstElement.total_page);
            setProducts(response.data.slice(1));
          } else {
            console.error("Invalid Response Format: total_page is missing");
            setProducts([]);
            setProductTotalPage(undefined);
          }
        } else {
          console.error("Error While Fetching Products: ", response.message);
          setProducts([]);
          setProductTotalPage(undefined);
        }
      } catch (err) {
        console.error("Unexpected Error While Fetching Products: ", err);
        setProducts([]);
        setProductTotalPage(undefined);
      }
    };

    fetchProducts();
  }, [productCurrentPage]);

  console.log(productions);

  return (
    <div>
      {createAction === "employee" && isModalOpen && (
        <AddFormModal
          title="Create Employee"
          setIsFormOpen={setIsModalOpen}
          action="addEmployee"
          closeModal={() => {}}
          setReload={setReload}
        />
      )}

      {createAction === "customer" && isModalOpen && (
        <AddFormModal
          title="Create Customer"
          setIsFormOpen={setIsModalOpen}
          action="addCustomer"
          closeModal={() => {}}
          setReload={setReload}
        />
      )}

      {createAction === "production" && isModalOpen && (
        <ProductionModal
          setIsOpen={setIsModalOpen}
          action="create"
          setReload={setReload}
        />
      )}

      {createAction === "product" && isModalOpen && (
        <ProductModal
          modalAction="create"
          setIsModalOpen={setIsModalOpen}
          setReload={setReload}
          reload={reload}
        />
      )}

      <div className="absolute top-0 left-0 w-full h-full backdrop-blur-md flex items-center justify-center z-10">
        <div className="overflow-y-auto xl:w-[85%] w-[95%] h-[80%] xl:h-[90%] relative  bg-secondary rounded-xl border border-border_color xl:px-8 px-3 py-5">
          <div
            className="absolute xl:top-6 top-4 xl:right-6 right-4 text-2xl xl:text-3xl text-primary-foreground hover:bg-secondary-foreground p-1 w-fit rounded-md"
            onClick={() => {
              setIsOpen((prv) => !prv);
            }}
          >
            <IoMdClose className="transition-transform hover:rotate-90 origin-center" />
          </div>

          <div className="pt-6 xl:pt-10">
            <div className="text-center xl:text-3xl text-2xl text-primary font-sour_gummy font-semibold mb-4">
              <p>Create</p>
            </div>
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 text-xl text-primary-foreground font-semibold border-b-4 border-border_color mb-4 xl:mb-8 pb-4 xl:pb-8">
              <button
                className="border border-border_color hover:bg-primary hover:text-background px-6 py-2 rounded-lg duration-200"
                onClick={() => {
                  setCreateAction("customer");
                  setIsModalOpen((prv) => !prv);
                }}
              >
                Create Customer
              </button>
              <button
                className="border border-border_color hover:bg-primary hover:text-background px-6 py-2 rounded-lg duration-200"
                onClick={() => {
                  setCreateAction("employee");
                  setIsModalOpen((prv) => !prv);
                }}
              >
                Create Employee
              </button>
              <button
                className="border border-border_color hover:bg-primary hover:text-background px-6 py-2 rounded-lg duration-200"
                onClick={() => {
                  setCreateAction("product");
                  setIsModalOpen((prv) => !prv);
                }}
              >
                Create Product
              </button>
              <button
                className="border border-border_color hover:bg-primary hover:text-background px-6 py-2 rounded-lg duration-200"
                onClick={() => {
                  setCreateAction("production");
                  setIsModalOpen((prv) => !prv);
                }}
              >
                Create Production
              </button>
            </div>
          </div>
          <div>
            <div>
              <Dropdown
                data={customers}
                totalPage={customerTotalPage}
                currentPage={customerCurrentPage}
                setCurrentPage={setCustomerCurrentPage}
                setId={setSelectedCustomer}
                setSelectionError={setCustomerSelecteonError}
                type="customer"
              />
              <p>{customerSelecteonError}</p>
            </div>

            <div>
              <div className="border-b border-border_color xl:pb-8 pb-4">
                <div className="text-center xl:text-3xl text-2xl text-primary font-sour_gummy font-semibold mt-4">
                  <p>Add Production</p>
                </div>

                <div className="flex flex-col xl:flex-row w-full justify-between gap-4 xl:py-5">
                  <div className="flex-1">
                    <Dropdown
                      data={employees}
                      currentPage={employeeCurrentPage}
                      setCurrentPage={setEmployeeCurrentPage}
                      totalPage={employeeTotalPage}
                      setId={setSelectedEmployee}
                      setSelectionError={setEmployeeSelectionError}
                      setValue={setEmployeeName}
                      defalutValue={employeeDefaultValue}
                      type="employee"
                    />
                    <p className="error_message">{employeeSelectionError}</p>
                  </div>
                  <div className="flex-1">
                    <Dropdown
                      data={products}
                      currentPage={productCurrentPage}
                      setCurrentPage={setProductCurrentPage}
                      totalPage={productTotalPage}
                      setId={setSelectedProduct}
                      setSelectionError={setProductSelectionError}
                      setValue={setProductName}
                      defalutValue={productDefaultValue}
                      type="product"
                    />
                    <p className="error_message">{productSelectionError}</p>
                  </div>
                  <div className="flex-1">
                    <input
                      type="text"
                      value={quantity}
                      onChange={(e) => {
                        setQuantity(e.target.value);
                        setQuantityError("");
                      }}
                      placeholder="Emter Quantity"
                      className="add_field xl:h-12"
                    />
                    <p className="error_message">{quantityError}</p>
                  </div>
                  {/* <div className="flex items-center justify-center mb-3 xl:mb-0">
                    <div className="xl:border-4 border-2 w-fit border-border_color rounded-full xl:text-2xl text-xl text-primary-foreground p-2 hover:bg-primary hover:text-background duration-200">
                      <IoMdClose />
                    </div>
                  </div> */}
                </div>

                <div className="flex flex-col xl:flex-row items-center justify-center mt-4 gap-4 text-xl">
                  <button
                    onClick={addProductions}
                    className="w-full xl:w-fit text-primary-foreground px-4 py-2 border border-border_color rounded-full hover:bg-secondary-foreground duration-200"
                  >
                    {activeProductionIndex === undefined
                      ? "+ Add Production"
                      : "+ Update Production"}
                  </button>

                  {/* <button
                    type="submit"
                    className="w-full xl:w-fit bg-primary text-background px-10 py-2 font-semibold rounded-full"
                  >
                    Submit
                  </button> */}
                </div>
              </div>

              <div className="mt-4 overflow-x-auto mb-6">
                {productions.length > 0 ? (
                  <div className="w-[25rem] xl:w-full">
                    <div className="text-primary-foreground text-base xl:text-xl font-semibold bg-background flex justify-between px-4 xl:px-6 py-3 rounded-t-md">
                      <p className="flex-1">Employee</p>
                      <p className="flex-1">Product</p>
                      <p className="flex-1">Quantity</p>
                      <p className="">Delete</p>
                    </div>
                    <div className="border border-t-0 border-border_color rounded-b-md">
                      {productions.map((production, i) => (
                        <div
                          key={i}
                          className="text-primary-foreground xl:text-xl flex justify-between xl:px-6 px-3 border-b border-secondary-foreground capitalize py-1"
                          onClick={() => {
                            // updateHandler(production, i);

                            setActiveProductionIndex(i);

                            setSelectedEmployee(production.employee.id);
                            setSelectedProduct(production.product.id);
                            setQuantity(production.quantity);

                            setEmployeeDefaultValue(production);
                            setProductDefaultValue(production);
                          }}
                        >
                          <div className="flex-1 flex items-center">
                            {production.employee.name} ({production.employee.id}
                            )
                          </div>
                          <div className="flex-1 flex items-center">
                            {production.product.name} ({production.product.id})
                          </div>
                          <div className="flex-1 flex items-center">
                            {production.quantity}
                          </div>
                          <div
                            className="bg-secondary-foreground  px-4 text-xl group hover:bg-primary hover:text-background py-3"
                            onClick={() => removeHandler(i)}
                          >
                            <IoMdClose className="group-hover:scale-125 duration-200" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardModal;
