"use client"; // Indicates that this component is a client component in Next.js

import { usePathname, useRouter } from "next/navigation"; // Import necessary hooks for routing
import React, { useState } from "react"; // Import React and useState for state management
import { IoMdEye, IoMdEyeOff } from "react-icons/io"; // Import eye icons for password visibility toggle

const Form = () => {
  // State variables for password visibility
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] =
    useState(false);

  const pathname = usePathname(); // Get the current pathname (URL)
  const path = useRouter(); // Get the router instance for navigation

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="bg-white w-[80%] md:w-[30%] flex flex-col items-center p-6 rounded-lg transition ease-in-out duration-200">
        {/* Render form title based on the current pathname */}
        <h2>{pathname === "/login" ? "Login" : "Signup"}</h2>

        {/* Input fields */}
        <div className="flex flex-col w-full gap-4">
          {/* Show username input only on signup page */}
          {pathname === "/signup" && (
            <input type="text" name="userName" placeholder="Name" />
          )}

          {/* Email input field */}
          <input type="email" name="email" placeholder="Email" />
          <div className="relative">
            {/* Password input field with visibility toggle */}
            <input
              type={passwordVisibility ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="w-full"
            />

            {/* Password visibility toggle button */}
            <div
              className="absolute top-1/3 right-4 text-primary/90 cursor-pointer"
              onClick={() => setPasswordVisibility((prev) => !prev)}
            >
              {passwordVisibility ? <IoMdEye /> : <IoMdEyeOff />}
            </div>
          </div>

          {/* Show confirm password input only on signup page */}
          {pathname === "/signup" && (
            <div className="relative">
              <input
                type={confirmPasswordVisibility ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                className="w-full"
              />

              {/* Confirm password visibility toggle button */}
              <div
                className="absolute top-1/3 right-4 text-primary/90 cursor-pointer"
                onClick={() => setConfirmPasswordVisibility((prev) => !prev)}
              >
                {confirmPasswordVisibility ? <IoMdEye /> : <IoMdEyeOff />}
              </div>
            </div>
          )}
        </div>

        {/* Link to switch between login and signup pages */}
        <p className="text-sm mt-3">
          Don't have an account?{" "}
          <span
            className="text-primary cursor-pointer"
            onClick={() => {
              // Navigate to the opposite page (signup/login) based on current pathname
              pathname === "/login"
                ? path.push("/signup")
                : path.push("/login");
            }}
          >
            {pathname === "/login" ? "Signup" : "Login"}
          </span>
        </p>

        {/* Submit button */}
        <button className="bg-primary/90 w-full rounded-md py-2 mt-5 text-gray-100 hover:bg-primary duration-300">
          {pathname === "/login" ? "Login" : "Signup"}
        </button>
      </form>
    </div>
  );
};

export default Form;
