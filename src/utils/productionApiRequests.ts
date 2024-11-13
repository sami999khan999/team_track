import { CreatePorductionType } from "@/types";

export const getProduction = async (page: number) => {
  try {
    const response = await fetch(
      `http://127.0.0.1:8000/api/production/view/${page}/`
    );

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Can't find production",
      };
    }

    return {
      success: true,
      message: data.message || "Production fetch successfull",
      data: data,
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: "Error fetching production",
    };
  }
};

export const createProduction = async (production: CreatePorductionType) => {
  try {
    console.log(production);
    const response = await fetch(
      "http://127.0.0.1:8000/api/production/create/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(production),
      }
    );

    console.log(response);
    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Can't create production",
      };
    }

    return {
      success: true,
      message: data.message || "Production created successfully",
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: "Error creating production",
    };
  }
};

export const updateProduction = async (
  id: number | undefined,
  production: CreatePorductionType
) => {
  try {
    const response = await fetch(
      `http://127.0.0.1:8000/api/production/update/${id}/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(production),
      }
    );

    const data = await response.json();
    console.log(data);
    console.log(id);

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Can't update production",
      };
    }

    return {
      success: true,
      message: data.message || "Production updated successfully",
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: "Error updating production",
    };
  }
};

export const deleteProduction = async (id: number | undefined) => {
  try {
    const response = await fetch(
      `http://127.0.0.1:8000/api/production/delete/${id}/`
    );
    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Can't delete production",
      };
    }

    return {
      success: true,
      message: data.message || "Production deleted successfully",
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: "Error deleting production",
    };
  }
};
