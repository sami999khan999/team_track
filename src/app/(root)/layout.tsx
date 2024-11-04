// layout.js
import React from "react";
import Sidebar from "../components/Sidebar";
import ModileNav from "../components/ModileNav";
import NavBar from "../components/NavBar";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main className="flex h-screen">
      <Sidebar />
      <ModileNav />
      <div className="overflow-y-auto w-full">
        <NavBar />

        <div className="p-3 xl:p-8 mt-4">{children}</div>
      </div>
    </main>
  );
};

export default Layout;
