import { LoginUserType, SignupUserType } from "@/types";

export const userSignup = async (userData: SignupUserType) => {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/register/", {
      // API route for POST request
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData), // Convert payload to JSON string
    });

    const data = await response.json();

    if (!response.ok) {
      console.log("Registration failed");

      return { success: false, message: data.message || "Registration failed" };
    }

    return {
      success: true,
      message: data.message || "Registration successful",
    };
  } catch (err) {
    return {
      success: false,
      message: "An error occurred during registration. Please try again.",
    };
  }
};

export const userLogin = async (userData: LoginUserType) => {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      console.log("Login failed");
      return { success: false, message: data.message || "Login failed" };
    }

    return { success: true, message: data.message || "Login succeeded" };
  } catch (err) {
    return {
      success: false,
      message: "An error occurred during login. Please try again.",
    };
  }
};
