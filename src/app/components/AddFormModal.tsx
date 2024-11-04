"use client";

import { EmployeeType } from "@/types";
import { createEmployee } from "@/utils/employeeApiRequest";
import React, { Dispatch, SetStateAction, useState } from "react";
import { IoMdClose } from "react-icons/io";

const AddFormModal = ({
  title,
  setIsFormOpen,
  action,
  setEmployees,
  employees,
  currentPage,
  setCurrentPage,
}: {
  title: string;
  setIsFormOpen: Dispatch<SetStateAction<boolean>>;
  action: string;
  setEmployees: React.Dispatch<React.SetStateAction<EmployeeType[]>>;
  employees: EmployeeType[];
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}) => {
  const [employee, setEmployee] = useState({
    name: "",
    address: "",
    mobile: "",
    nid_no: "",
  });

  const [employeeInputError, setEmployeeInputError] = useState({
    name: "",
    address: "",
    mobile: "",
    nid_no: "",
  });

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
    setEmployeeInputError({ ...employeeInputError, [e.target.name]: "" });
  };

  console.log(employeeInputError);

  const submieHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors = {
      name: employee.name ? "" : "Name is required",
      address: employee.address ? "" : "Address is required",
      mobile: employee.mobile ? "" : "Mobile No is required",
      nid_no: employee.nid_no ? "" : "NID No is required",
    };

    setEmployeeInputError(newErrors);

    // Check if there are any validation errors
    const hasError = Object.values(newErrors).some((error) => error);

    console.log(hasError);
    if (!hasError) {
      // create exployee

      const response = await createEmployee(employee);

      if (response.success) {
        const newEmployee = {
          id: employees[employees.length - 1].id + 1,
          ...employee,
        };
        if (employees.length === 10) {
          const newEmployees = [newEmployee];
          setCurrentPage(currentPage + 1);
          setEmployees(newEmployees);
        } else {
          const newEmployees = [...employees, newEmployee];
          setEmployees(newEmployees);
        }
        setIsFormOpen(false); // Close modal after successful submit
      }
    }
  };

  return (
    <div
      className="flex items-center justify-center absolute top-0 left-0  z-50 w-full h-full backdrop-blur-md"
      onClick={() => setIsFormOpen((prv) => !prv)}
    >
      <form
        className="bg-secondary xl:px-8 px-5 xl:py-10 py-6 shadow-md flex flex-col w-[90%] xl:w-[35%] relative border rounded"
        onClick={(e) => e.stopPropagation()}
        onSubmit={submieHandler}
      >
        <button
          className="absolute top-4 right-4 rounded text-xl xl:text-3xl transition-transform hover:rotate-90 duration-300 origin-center"
          onClick={() => setIsFormOpen((prv) => !prv)}
        >
          <IoMdClose />
        </button>
        <h2 className="text-center text-lg xl:text-2xl mb-5 mt-5 font-semibold tracking-wider text-secondary-foreground">
          {title}
        </h2>
        <div className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Employee Name..."
              name="name"
              value={employee.name}
              onChange={changeHandler}
              className="add_field"
            />
            <p className="error_message">{employeeInputError.name}</p>
          </div>

          <div>
            <input
              type="text"
              placeholder="Address..."
              name="address"
              value={employee.address}
              onChange={changeHandler}
              className="add_field"
            />
            <p className="error_message">{employeeInputError.address}</p>
          </div>

          <div>
            <input
              type="text"
              placeholder="Phone Number..."
              name="mobile"
              value={employee.mobile}
              onChange={changeHandler}
              className="add_field"
            />
            <p className="error_message">{employeeInputError.mobile}</p>
          </div>

          <div>
            <input
              type="text"
              placeholder="NID"
              name="nid_no"
              value={employee.nid_no}
              onChange={changeHandler}
              className="add_field"
            />
            <p className="error_message">{employeeInputError.nid_no}</p>
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-primary mt-6 xl:text-xl rounded-sm font-medium tracking-wide  py-2 xl:py-3  capitalize text-gray-100 hover:bg-primary/80 duration-200"
        >
          {action}
        </button>
      </form>
    </div>
  );
};

export default AddFormModal;
