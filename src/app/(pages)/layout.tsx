import Navbar from "@/components/NavBar";
import React from "react";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <React.Fragment>
      <Navbar />
      {children}
    </React.Fragment>
  );
}
