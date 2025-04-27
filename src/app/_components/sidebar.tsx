"use client";

import { cn } from "@/lib/cn";
import Image from "next/image";
import { useContext } from "react";
import { LuX } from "react-icons/lu";
import { CertificateContext } from "./certificate";

export function Sidebar() {
  const { backgroundImageRef, isSidebarOpen, setIsSidebarOpen } =
    useContext(CertificateContext);

  const images = [
    "template-1.jpg",
    "template-2.jpg",
    "template-3.jpg",
    "template-4.jpg",
    "template-5.jpg",
  ];

  const onImageClick = (image: string) => {
    backgroundImageRef.current?.setAttribute("href", `/${image}`);
  };

  return (
    <div className="pointer-events-none absolute top-0 left-0">
      <div className="h-dvh w-dvw overflow-hidden">
        <div
          className={cn(
            "relative z-50 flex h-full w-full flex-col items-center gap-y-8 bg-white px-4 py-8 backdrop-blur-2xl transition-transform duration-300 ease-in-out sm:w-[25vw] sm:bg-white/30",
            {
              "translate-x-0": isSidebarOpen,
              "-translate-x-full": !isSidebarOpen,
            },
          )}
        >
          <LuX
            className="pointer-events-auto absolute top-5.5 right-4 cursor-pointer text-2xl text-black"
            onClick={() => setIsSidebarOpen(false)}
          />
          <h1 className="text-2xl font-bold text-black">Templates</h1>
          <div className="pointer-events-auto flex h-full w-full flex-col items-center gap-y-8 overflow-y-scroll">
            {images.map((image, index) => (
              <div
                key={index}
                className="group relative aspect-[1.33] w-[80%] cursor-pointer border-2 border-black transition-colors duration-300"
                onClick={() => onImageClick(image)}
              >
                <div className="absolute top-0 left-0 z-10 flex h-full w-full items-center justify-center bg-black/40 text-xl font-bold text-white opacity-0 transition-opacity group-hover:opacity-100">
                  Template {index + 1}
                </div>
                <Image
                  className="object-cover"
                  src={`/${image}`}
                  alt={`Template ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
