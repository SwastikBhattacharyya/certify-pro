import { cn } from "@/lib/cn";
import React from "react";

type ButtonProps = React.ComponentProps<"button">;
type LabelButtonProps = React.ComponentProps<"label">;

export function LabelButton({
  children,
  className,
  ...props
}: LabelButtonProps) {
  return (
    <label
      className={cn(
        "flex cursor-pointer items-center justify-center rounded-lg border border-gray-400 px-4 py-2 text-center text-xs text-white transition-colors duration-300 ease-in-out outline-none hover:border-white hover:bg-white hover:text-black lg:text-sm",
        className,
      )}
      {...props}
    >
      {children}
    </label>
  );
}

export function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "flex cursor-pointer items-center justify-center rounded-lg border border-gray-400 px-4 py-2 text-center text-xs text-white transition-colors duration-300 ease-in-out outline-none hover:border-white hover:bg-white hover:text-black lg:text-sm",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
