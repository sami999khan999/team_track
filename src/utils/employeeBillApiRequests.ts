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
