"use client"; // Indicates that this component is a client component in Next.js

import { usePathname, useRouter } from "next/navigation"; // Import necessary hooks for routing
import React, { useState } from "react"; // Import React and useState for state management
import { IoMdEye, IoMdEyeOff } from "react-icons/io"; // Import eye icons for password visibility toggle

const Form = () => {
  // State variables to toggle visibility of password and confirm password
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] =
    useState(false);

  // State for form input values
  const [form, setForm] = useState<UserType>({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // State for error messages for each form field
  const [error, setError] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Handles form input changes, updating form state and clearing error messages
  const formHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError({ ...error, [e.target.name]: "" });
  };

  const pathname = usePathname(); // Hook to get the current page's pathname
  const path = useRouter(); // Hook to programmatically navigate between routes

  // Email validation function, checking email against regex pattern
  const emailValidator = (email: string) => {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailRegex.test(email);
  };

  // Handles form submission, validates inputs, and updates error messages if needed
  const submittHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (pathname === "/login") {
      // If login page, check email and password validity
      if (!emailValidator(form.email)) {
        setError({ ...error, email: "Email is not verified!" });
        return;
      }

      if (form.password.length < 8) {
        setError({
          ...error,
          password: "Password must be at least 8 characters",
        });
        return;
      }

      // Log user data for testing purposes (could be replaced by API call)
      const userData = {
        email: form.email,
        password: form.password,
      };
      console.log(userData);

      // Clear form after submission
      setForm({
        userName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } else {
      // If signup page, check all fields for validity
      if (!emailValidator(form.email)) {
        setError({ ...error, email: "Email is not verified!" });
        return;
      }
      if (form.password.length < 8) {
        setError({
          ...error,
          password: "Password must be at least 8 characters",
        });
        return;
      }
      if (form.password !== form.confirmPassword) {
        setError({ ...error, confirmPassword: "Passwords do not match!" });
        return;
      }

      // Log user data for testing purposes (could be replaced by API call)
      const userData = {
        name: form.userName,
        email: form.email,
        password: form.password,
      };

      console.log(JSON.stringify(userData));

      const response = await fetch("http://127.0.0.1:8000/api/register", {
        // API route for POST request
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData), // Convert payload to JSON string
      });

      if (!response.ok) {
        console.log("Registration failed");

        return;
      }

      console.log(userData);

      // Clear form after submission
      setForm({
        userName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {/* Form container with submission handler */}
      <form
        onSubmit={submittHandler}
        className="bg-card border w-[80%] xl:w-[33rem] flex flex-col items-center p-6 py-8 rounded transition ease-in-out duration-200 shadow-sm"
        noValidate
      >
        {/* Display title based on the page path */}
        <h2 className="text-gray-800 text-xl md:text-3xl font-semibold text-center mb-7">
          {pathname === "/login" ? "Login" : "Signup"}
        </h2>

        {/* Container for form input fields */}
        <div className="flex flex-col w-full gap-4">
          {/* Conditionally render username input on signup page */}
          {pathname === "/signup" && (
            <div>
              <input
                type="text"
                name="userName"
                placeholder="Name"
                value={form.userName}
                onChange={formHandler}
              />
              {/* Display error for username if any */}
              <p className="text-red-600 text-sm md:text-lg ml-2 tracking-wide mt-1">
                {error.userName}
              </p>
            </div>
          )}

          {/* Email input field */}
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={formHandler}
            />
            {/* Display error for email if any */}
            <p className="text-red-600 text-sm md:text-lg ml-2 tracking-wide mt-1">
              {error.email}
            </p>
          </div>

          {/* Password input field with toggleable visibility */}
          <div className="relative">
            <input
              type={passwordVisibility ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={formHandler}
            />
            {/* Toggle password visibility on icon click */}
            <div
              className="absolute top-1/3 right-4 text-primary/90 cursor-pointer xl:text-xl"
              onClick={() => setPasswordVisibility((prev) => !prev)}
            >
              {passwordVisibility ? <IoMdEye /> : <IoMdEyeOff />}
            </div>
            {/* Display error for password if any */}
            <p className="text-red-600 text-sm md:text-lg ml-2 tracking-wide mt-1">
              {error.password}
            </p>
          </div>

          {/* Conditionally render confirm password input on signup page */}
          {pathname === "/signup" && (
            <div className="relative">
              <input
                type={confirmPasswordVisibility ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                className="w-full"
                value={form.confirmPassword}
                onChange={formHandler}
              />
              {/* Toggle confirm password visibility on icon click */}
              <div
                className="absolute top-1/3 right-4 text-primary/90 cursor-pointer xl:text-xl"
                onClick={() => setConfirmPasswordVisibility((prev) => !prev)}
              >
                {confirmPasswordVisibility ? <IoMdEye /> : <IoMdEyeOff />}
              </div>
              {/* Display error for confirm password if any */}
              <p className="text-red-600 text-sm md:text-lg ml-2 tracking-wide mt-1">
                {error.confirmPassword}
              </p>
            </div>
          )}
        </div>

        {/* Toggle link between login and signup pages */}
        <p className="text-sm xl:text-xl mt-3">
          {`${"Don't have an account?"}`}
          <span
            className="text-primary cursor-pointer transform rounded"
            onClick={() => {
              // Switch page based on current path
              pathname === "/login"
                ? path.push("/signup")
                : path.push("/login");
            }}
          >
            {pathname === "/login" ? " Signup" : " Login"}
          </span>
        </p>

        {/* Submit button with dynamic text based on page path */}
        <button
          type="submit"
          className="bg-primary/90 w-full rounded py-2 xl:py-3 xl:text-xl font-medium tracking-wide mt-8 text-white/90 hover:bg-primary duration-300 "
        >
          {pathname === "/login" ? "Login" : "Signup"}
        </button>
      </form>
    </div>
  );
};

export default Form;
