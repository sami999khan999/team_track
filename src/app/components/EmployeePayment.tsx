"use client";

import { SingleEmployeeBillType } from "@/types";
import { getSingleEmployeeBill } from "@/utils/employeeBillApiRequests";
import React, { useEffect, useState } from "react";

const EmployeePayment = ({ id }: { id: number }) => {
  const [employeeBills, setEmployeeBills] = useState<
    SingleEmployeeBillType[] | undefined
  >();

  useEffect(() => {
    const fetchEmployeeBill = async () => {
      const response = await getSingleEmployeeBill(id);

      if (response.success) {
        setEmployeeBills(response.data);
      }
    };
    fetchEmployeeBill();
  }, [id]);

  console.log(employeeBills);

  return <div>EmployeePayment</div>;
};

export default EmployeePayment;
