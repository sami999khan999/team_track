import { EmployeeBillFilterParametersType, FilteredBill } from "@/types";

export const getFilteredEmployeeBillData = async (
  filterParams: EmployeeBillFilterParametersType
) => {
  try {
    const response = await fetch(
      `http://192.168.0.136:8000/api/employee/bill/filter/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(filterParams),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Failed to fetch filtered data",
      };
    }

    return {
      success: true,
      message: "Filtered data fetched successfully",
      data: data,
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: "Failed to fetch filtered data",
    };
  }
};

export const createBill = async (filteredData: FilteredBill[] | undefined) => {
  try {
    const response = await fetch(
      "http://192.168.0.136:8000/api/employee/bill/create/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(filteredData),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Failed to create bill",
      };
    }

    return {
      success: true,
      message: "Bill created successfully",
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: "Failed to create bill",
    };
  }
};

export const getEmployeeBill = async (page: number | undefined) => {
  try {
    const response = await fetch(
      `http://127.0.0.1:8000/api/employee/bill/view/${page}`
    );

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Failed to fetch employee bill data",
      };
    }

    return {
      success: true,
      message: "Employee bill data fetched successfully",
      data: data,
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: "Failed to fetch employee bill data",
    };
  }
};

export const getSingleEmployeeBill = async (id: number) => {
  try {
    const response = await fetch(
      `http://127.0.0.1:8000/api/employee/bill/single/view/${id}`
    );

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Failed to fetch single employee bill data",
      };
    }

    return {
      success: true,
      message: "Single employee bill data fetched successfully",
      data: data,
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: "Failed to fetch single employee bill data",
    };
  }
};
