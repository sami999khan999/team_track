// layout.js
import React from "react";
import Sidebar from "../components/Sidebar";
import ModileNav from "../components/ModileNav";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main className="flex h-screen">
      <Sidebar />
      <ModileNav />
      <div className="overflow-y-auto px-2 xl:px-10 w-full">{children}</div>
    </main>
  );
};

export default Layout;
