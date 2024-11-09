"use client";

import { usePathname, useRouter } from "next/navigation";
import React from "react";

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
    <div className="flex items-center justify-between w-full bg-secondary h-[5.4rem] xl:px-10 px-3">
      <h1
        className="xl:text-center flex-grow text-lg xl:text-4xl font-bold text-slate-400 tracking-widest font-sour_gummy"
        // style={{ fontFamily: "var(--font-geist)" }}
      >
        NEXT FASHION TEXTILE
      </h1>
      <button
        className="flex items-center gap-5 bg-primary cursor-pointer text-sm xl:text-xl  duration-200 px-6 py-2 hover:text-secondary font-medium rounded-full"
        onClick={logOutHandler}
      >
        Logout
      </button>
    </div>
  );
};

export default NavBar;
