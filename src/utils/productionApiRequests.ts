export const getProduction = async (page: number) => {
  try {
    const response = await fetch(
      `http://127.0.0.1:8000/api/production/view/${page}/`
    );

    console.log(response);

    const data = await response.json();
    console.log(data);

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
