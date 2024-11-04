"use client";

import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { FiLogOut } from "react-icons/fi";

const NavBar = () => {
  const path = useRouter();

  const pathname = usePathname();

  // Hide the sidebar on login or signup pages
  if (pathname === "/login" || pathname === "/signup") {
    return null;
  }

  const logOutHandler = () => {
    const cookieName = "userSession";
    document.cookie = `${cookieName}=; Max-Age=0; path=/`;

    const cookieDeleted = !document.cookie
      .split("; ")
      .find((cookie) => cookie.startsWith(`${cookieName}=`));

    if (cookieDeleted) {
      path.push("/login");
    }
  };

  return (
    <div className="flex items-center justify-between w-full bg-secondary shadow-md h-fit py-3 xl:py-5 xl:px-10 px-3">
      {/* This div will take the remaining space and center the title */}
      <h1 className="xl:text-center flex-grow text-xl xl:text-3xl font-semibold text-secondary-foreground tracking-wide">
        Site Name
      </h1>
      <button
        className="flex items-center gap-5 cursor-pointer text-base xl:text-xl hover:bg-primary  duration-200 border px-6 py-2 rounded hover:text-secondary font-medium"
        onClick={logOutHandler}
      >
        Logout
      </button>
    </div>
  );
};

export default NavBar;
