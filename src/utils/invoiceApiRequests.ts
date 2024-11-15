export const getFilterInventory = async (filterParam: {
  product: number | string;
  employee: number | string;
}) => {
  try {
    const response = await fetch(
      "http://127.0.0.1:8000/api/inventory/filter/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(filterParam),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Can't fetch filtered inventory",
      };
    }

    return {
      success: true,
      message: "Filtered inventory fetched successfully",
      data: data,
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: "Error fetching filtered inventory",
    };
  }
};
