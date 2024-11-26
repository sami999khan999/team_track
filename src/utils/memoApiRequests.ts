const url = process.env.NEXT_PUBLIC_API_URL;

export const getFilterMemo = async (id: number) => {
  try {
    const response = await fetch(`${url}api/memo/filter/${id}`);

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Failed to fetch filtered data",
      };
    }

    return {
      success: true,
      data: data,
    };
  } catch (err) {
    console.log("Failed To Filter Memo: ", err);
    return {
      success: false,
      message: "Failed to fetch filtered data",
    };
  }
};

export const createMemo = async (selectedId: number[]) => {
  try {
    const response = await fetch(`${url}api/memo/create/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ challan: selectedId }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Failed to create memo",
      };
    }

    return {
      success: true,
      message: data.message || "Memo created successfully",
    };
  } catch (err) {
    console.log("Failed To Create Memo: ", err);
    return {
      success: false,
      message: "Failed to create memo",
    };
  }
};

export const getMemo = async (page: number) => {
  try {
    const response = await fetch(`${url}api/memo/view/${page}`);

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Failed to fetch memo",
      };
    }

    return {
      success: true,
      message: data.message || "Successfully Fetched Memo",
      data: data,
    };
  } catch (err) {
    console.log("Failed to fetch memo: ", err);
    return {
      success: false,
      message: "Failed to fetch memo",
    };
  }
};
