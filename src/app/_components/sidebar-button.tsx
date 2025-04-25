"use client";

import { cn } from "@/lib/cn";
import { useContext } from "react";
import { LuMenu } from "react-icons/lu";
import { CertificateContext } from "./certificate";

export function SidebarButton() {
  const { isSidebarOpen, setIsSidebarOpen } = useContext(CertificateContext);

  return (
    <LuMenu
      className={cn(
        "absolute top-4 left-4 cursor-pointer text-2xl text-white",
        {
          hidden: isSidebarOpen,
        },
      )}
      onClick={() => setIsSidebarOpen(true)}
    >
      {isSidebarOpen ? "Close" : "Menu"}
    </LuMenu>
  );
}
